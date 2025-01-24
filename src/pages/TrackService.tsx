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

enum ServiceStatus {
  PICKUP = 'pickup',
  DIAGNOSIS = 'diagnosis',
  REPAIR = 'repair',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered'
}

interface ServiceData {
  customer: {
    name: string;
    phone: string;
    address: string;
    preferred_date: string;
    preferred_time: string;
  };
  device: {
    type: string;
    brand: string;
    model: string;
    issue: string;
  };
  service: {
    id: string;
    status: ServiceStatus[];  // Changed to array
    startDate: string;
    estimatedCompletion: string;
  };
  billing: {
    subtotal: number;
    tax: number;
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

const TrackService = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceId = searchParams.get("id");
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!serviceId) {
        toast.error("No service ID provided");
        navigate("/track-service-entry");
        return;
      }

      try {
        // Fetch all required data
        const [
          { data: customerData, error: customerError },
          { data: deviceData, error: deviceError },
          { data: trackingData, error: trackingError },
          { data: billingData, error: billingError }
        ] = await Promise.all([
          supabase.from('customers').select('*').eq('service_id', serviceId).single(),
          supabase.from('devices').select('*').eq('service_id', serviceId).single(),
          supabase.from('service_tracking').select('*').eq('service_id', serviceId).order('created_at', { ascending: true }),
          supabase.from('billing').select('*').eq('service_id', serviceId).single()
        ]);

        if (customerError) throw customerError;
        if (deviceError) throw deviceError;
        if (trackingError) throw trackingError;
        if (billingError) throw billingError;

        // Transform the data into the required format
        const transformedData: ServiceData = {
          customer: {
            name: customerData.name,
            phone: customerData.mobile,
            address: customerData.address,
            preferred_date: customerData.preferred_date,
            preferred_time: customerData.preferred_time
          },
          device: {
            type: deviceData.device_type,
            brand: deviceData.device_name || 'N/A',
            model: deviceData.device_model,
            issue: deviceData.problem_description,
          },
          service: {
            id: serviceId,
            status: trackingData.map(t => t.status as ServiceStatus), // Transform to array
            startDate: customerData.preferred_date,
            estimatedCompletion: customerData.preferred_date,
          },
          billing: {
            subtotal: billingData?.subtotal || 0,
            tax: billingData?.tax || 0,
            total: billingData?.total || 0,
            status: billingData?.status || 'pending',
            payment_method: billingData?.payment_method,
            payment_date: billingData?.payment_date,
          },
          timeline: [
            { status: ServiceStatus.PICKUP, completed: false },
            { status: ServiceStatus.DIAGNOSIS, completed: false },
            { status: ServiceStatus.REPAIR, completed: false },
            { status: ServiceStatus.OUT_FOR_DELIVERY, completed: false },
            { status: ServiceStatus.DELIVERED, completed: false },
          ].map(step => ({
            ...step,
            completed: trackingData.some(t => t.status === step.status),
            date: trackingData.find(t => t.status === step.status)?.created_at,
            notes: trackingData.find(t => t.status === step.status)?.notes,
          })),
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
            <div className="space-y-2">
              {serviceData.timeline.map((step, index) => (
                <div key={step.status} className="flex items-start space-x-5">
                  <div className="flex flex-col items-center">
                    {step.completed ? (
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
                    {step.date && (
                      <p className="text-sm text-gray-500">{step.date}</p>
                    )}
                    {step.notes && (
                      <p className="text-sm text-gray-600">{step.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Customer Information */}
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

          {/* Device Information */}
          <Card>
            <CardHeader>
              <CardTitle>Device Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-medium">Type:</span> {serviceData.device.type}</p>
                <p><span className="font-medium">Brand:</span> {serviceData.device.brand}</p>
                <p><span className="font-medium">Model:</span> {serviceData.device.model}</p>
                <p><span className="font-medium">Issue:</span> {serviceData.device.issue}</p>
              </div>
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${serviceData.billing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${serviceData.billing.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${serviceData.billing.total.toFixed(2)}</span>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackService;