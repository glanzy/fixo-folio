import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, StarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

enum ServiceStatus {
  PICKUP = 'pickup',
  DIAGNOSIS = 'diagnosis',
  REPAIR = 'repair',
  DELIVERED = 'delivered'
}

const getStatusNotes = (status: ServiceStatus): string => {
  switch (status) {
    case ServiceStatus.PICKUP:
      return "Service request created.";
    case ServiceStatus.DIAGNOSIS:
      return "Device is being diagnosed.";
    case ServiceStatus.REPAIR:
      return "Device is being repaired.";
    case ServiceStatus.DELIVERED:
      return "Device has been successfully delivered.";
    default:
      return "";
  }
};

interface ServiceData {
  customer: {
    name: string;
    phone: string;
    address: string;
    preferred_date: string;
    preferred_time: string;
    warranty_period: string;
  };
  device: {
    type: string;
    brand: string;
    model: string;
    issue: string;
  };
  devices?: {
    type: string;
    brand: string;
    model: string;
    issue: string;
  }[];
  service: {
    id: string;
    status: ServiceStatus[];
    startDate: string;
    estimatedCompletion: string;
    warrantyPeriod?: string;  // Now handles any text
    hasWarranty?: boolean;
  };
  billing: {
    subtotal: number;
    iitm: number;
    total: number;
    status: string;
    payment_method?: string;
    payment_date?: string;
  };
  timeline: {
    status: ServiceStatus;
    completed: boolean;
    date?: string;
    notes?: string;
  }[];
}

interface FeedbackData {
  rating: number;
  comment: string;
}

interface WarrantyClaimForm {
  description: string;
}

interface WarrantyClaim {
  id: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

const TrackService = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceId = searchParams.get("id");
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [userFeedback, setUserFeedback] = useState({ rating: 0, comment: '' });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [warrantyDialogOpen, setWarrantyDialogOpen] = useState(false);
  const [claimDescription, setClaimDescription] = useState("");
  const [submittingClaim, setSubmittingClaim] = useState(false);
  const [warrantyClaims, setWarrantyClaims] = useState<WarrantyClaim[]>([]);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!serviceId) {
        toast.error("No service ID provided");
        navigate("/track-service-entry");
        return;
      }

      try {
        const [
          { data: customerData, error: customerError },
          { data: devicesData, error: deviceError },
          { data: trackingData, error: trackingError },
          { data: billingData, error: billingError },
          { data: warrantyData, error: warrantyError }
        ] = await Promise.all([
          supabase.from('customers').select('*').eq('service_id', serviceId).single(),
          supabase.from('devices').select('*').eq('service_id', serviceId),
          supabase.from('service_tracking').select('*').eq('service_id', serviceId).order('created_at', { ascending: true }),
          supabase.from('billing').select('*').eq('service_id', serviceId).single(),
          supabase.from('warranties').select('*').eq('service_id', serviceId).single()
        ]);

        // Add warranty error check
        if (warrantyError && warrantyError.code !== 'PGRST116') {
          throw warrantyError;
        }
        if (customerError) throw customerError;
        if (deviceError) throw deviceError;
        if (trackingError) throw trackingError;
        if (billingError) throw billingError;

        if (!customerData || !devicesData || !trackingData || !billingData) {
          throw new Error("Service data not found");
        }

        const transformedData: ServiceData = {
          customer: {
            name: customerData.name,
            phone: customerData.mobile,
            address: customerData.address,
            preferred_date: customerData.preferred_date,
            preferred_time: customerData.preferred_time,
            warranty_period: customerData.warranty_period || 'TBA'
          },
          device: {
            type: devicesData[0].device_type,
            brand: devicesData[0].device_name || 'N/A',
            model: devicesData[0].device_model,
            issue: devicesData[0].problem_description,
          },
          devices: devicesData.map(device => ({
            type: device.device_type,
            brand: device.device_name || 'N/A',
            model: device.device_model,
            issue: device.problem_description,
          })),
          service: {
            id: serviceId,
            status: trackingData.map(t => t.status as ServiceStatus),
            startDate: customerData.preferred_date,
            estimatedCompletion: customerData.preferred_date,
            warrantyPeriod: warrantyData?.warranty_days,
            hasWarranty: !!warrantyData,
          },
          billing: {
            subtotal: billingData?.subtotal || 0,
            iitm: billingData?.iitm || 0,
            total: billingData?.total || 0,
            status: billingData?.status || 'pending',
            payment_method: billingData?.payment_method,
            payment_date: billingData?.payment_date,
          },
          timeline: [
            { status: ServiceStatus.PICKUP, completed: false },
            { status: ServiceStatus.DIAGNOSIS, completed: false },
            { status: ServiceStatus.REPAIR, completed: false },
            { status: ServiceStatus.DELIVERED, completed: false },
          ].map(step => {
            const trackingEntry = trackingData.find(t => t.status === step.status);
            const isCurrentStatus = step.status === trackingData[trackingData.length - 1]?.status;
            
            return {
              ...step,
              completed: trackingData.some(t => t.status === step.status),
              date: trackingEntry?.created_at,
              notes: isCurrentStatus ? getStatusNotes(step.status) : undefined
            };
          }),
        };

        setServiceData(transformedData);
      } catch (error) {
        console.error('Error fetching service data:', error);
        toast.error("Error loading service data");
        navigate("/track-service-entry");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceId, navigate]);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!serviceId) return;

      const { data, error } = await supabase
        .from('repair_feedback')
        .select('*')
        .eq('service_id', serviceId)
        .single();

      if (error) {
        console.error('Error fetching feedback:', error);
        return;
      }

      if (data) {
        setFeedback({
          rating: data.rating,
          comment: data.comment,
        });
      }
    };

    fetchFeedback();
  }, [serviceId]);

  useEffect(() => {
    const fetchWarrantyClaims = async () => {
      if (!serviceId) return;

      const { data, error } = await supabase
        .from('warranty_claims')
        .select('*')
        .eq('service_id', serviceId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching warranty claims:', error);
        return;
      }

      setWarrantyClaims(data || []);
    };

    fetchWarrantyClaims();
  }, [serviceId]);

  const submitFeedback = async () => {
    if (!serviceId || userFeedback.rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    setSubmittingFeedback(true);
    try {
      const { error } = await supabase
        .from('repair_feedback')
        .insert({
          service_id: serviceId,
          rating: userFeedback.rating,
          comment: userFeedback.comment,
        });

      if (error) throw error;

      setFeedback({
        rating: userFeedback.rating,
        comment: userFeedback.comment,
      });
      toast.success("Thank you for your feedback!");
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Failed to submit feedback");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const handleWarrantyClaim = async () => {
    if (!claimDescription.trim()) {
      toast.error("Please provide a description of the issue");
      return;
    }

    setSubmittingClaim(true);
    try {
      const { data, error } = await supabase
        .from('warranty_claims')
        .insert({
          service_id: serviceId,
          description: claimDescription,
        })
        .select()
        .single();

      if (error) throw error;

      setWarrantyClaims(prev => [data, ...prev]);
      toast.success("Warranty claim submitted successfully");
      setWarrantyDialogOpen(false);
      setClaimDescription("");
    } catch (error) {
      console.error('Error submitting warranty claim:', error);
      toast.error("Failed to submit warranty claim");
    } finally {
      setSubmittingClaim(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  if (!serviceData) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Service not found</h2>
        <p className="text-gray-600">Please check your service ID and try again</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Service</h1>
        
        {/* Service Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Service Progress</CardTitle>
            <CardDescription>Service ID: {serviceData.service.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="space-y-2 mb-6 md:mb-0">
                {serviceData.timeline.map((step, index) => {
                  const isLaterStepActive = serviceData.service.status.some(
                    activeStatus => {
                      const activeIndex = serviceData.timeline.findIndex(t => t.status === activeStatus);
                      return activeIndex > index;
                    }
                  );

                  const shouldShowCompleted = step.completed || isLaterStepActive;

                  return (
                    <div key={step.status} className="flex items-start space-x-5">
                      <div className="flex flex-col items-center">
                        {shouldShowCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        ) : (
                          <Circle className={`w-6 h-6 ${
                            serviceData.service.status.includes(step.status)
                              ? "text-primary animate-pulse"
                              : "text-gray-300"
                          }`} />
                        )}
                        {index < serviceData.timeline.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-200 my-1" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium capitalize">{step.status}</p>
                        {step.notes && (
                          <p className="text-sm mt-2 text-gray-800">{step.notes}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Warranty Column */}
              {serviceData.service.hasWarranty && (
                <div className="flex flex-col items-start md:items-end justify-end space-y-4 md:ml-8">
                  <div className="text-left md:text-right w-full">
                    <span className="text-sm text-gray-500">Warranty Period : </span>
                    <span className="font-medium">
                      {serviceData.service.warrantyPeriod}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full md:w-100%"
                    onClick={() => setWarrantyDialogOpen(true)}
                  >
                    Having an Issue? Claim Warranty
                  </Button>
                  {warrantyClaims.length > 0 && (
                    <div className="mt-2 space-y-4 bg-blue-100 border-2 border-dashed border-gray-200 rounded-lg p-4 w-full">
                      <h4 className="font-medium text-sm">Warranty Claim History</h4>
                      <div className="space-y-3">
                        {warrantyClaims.map((claim) => (
                          <div
                            key={claim.id}
                            className="p-1 bg-secondary/20 rounded-lg space-y-2"
                          >
                            <div className="flex justify-between items-start">
                              <p className="text-sm">{claim.description}</p>
                              <Badge
                                className={`ml-2 ${
                                  claim.status === "pending"
                                    ? "bg-blue-500"
                                    : claim.status === "rejected"
                                    ? "bg-red-500"
                                    : claim.status === "approved"
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                                } text-white hover:none pointer-events-none`}
                              >
                                {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(claim.created_at).toLocaleDateString()} at{' '}
                              {new Date(claim.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Customer Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {serviceData.customer.name}</p>
                <p><span className="font-medium">Phone:</span> {serviceData.customer.phone}</p>
                <p><span className="font-medium">Address:</span> {serviceData.customer.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Device Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Device Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceData.devices.map((device, index) => (
                  <div key={index} className="space-y-2">
                    {index > 0 && <Separator className="my-4" />}
                    <p><span className="font-medium">Device {index + 1}</span></p>
                    <p><span className="font-medium">Device Type:</span> {device.type}</p>
                    <p><span className="font-medium">Brand:</span> {device.brand}</p>
                    <p><span className="font-medium">Model:</span> {device.model}</p>
                    <p><span className="font-medium">Issue:</span> {device.issue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Billing Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Service Charge</span>
                  <span>₹ {serviceData.billing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Holi Month Discount (UPTO 10% OFF)</span>
                  <span>- ₹ {serviceData.billing.iitm.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>₹ 0.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>₹ {serviceData.billing.total.toFixed(2)}</span>
                </div>
                <div className="mt-4 space-y-2">
                  <Badge variant={serviceData.billing.status === "paid" ? "secondary" : "default"}>
                    {serviceData.billing.status.toUpperCase()}
                  </Badge>
                  {serviceData.billing.payment_method && (
                    <p><span className="font-medium">Payment Method:</span> {serviceData.billing.payment_method}</p>
                  )}
                  {serviceData.billing.payment_date && (
                    <p><span className="font-medium">Payment Date:</span> {new Date(serviceData.billing.payment_date).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Card */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>Share your experience with our service</CardDescription>
            </CardHeader>
            <CardContent>
              {feedback ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-6 h-6 ${
                          star <= feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  {feedback.comment && (
                    <p className="text-gray-700">{feedback.comment}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-6 h-6 cursor-pointer transition-colors ${
                          star <= (hoveredStar || userFeedback.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setUserFeedback(prev => ({ ...prev, rating: star }))}
                      />
                    ))}
                  </div>
                  <Textarea
                    placeholder="Share your experience with us"
                    value={userFeedback.comment}
                    onChange={(e) => setUserFeedback(prev => ({ ...prev, comment: e.target.value }))}
                    className="min-h-[100px]"
                  />
                  <Button
                    className="w-full"
                    disabled={submittingFeedback || userFeedback.rating === 0}
                    onClick={submitFeedback}
                  >
                    {submittingFeedback ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <Dialog open={warrantyDialogOpen} onOpenChange={setWarrantyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Warranty Claim</DialogTitle>
            <DialogDescription>
              Please describe the issue you're experiencing with your device.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Describe the issue in detail..."
              value={claimDescription}
              onChange={(e) => setClaimDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setWarrantyDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleWarrantyClaim}
              disabled={submittingClaim}
            >
              {submittingClaim ? "Submitting..." : "Submit Claim"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrackService;