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
  devices?: {
    type: string;
    brand: string;
    model: string;
    issue: string;
  }[];
  service: {
    id: string;
    status: ServiceStatus[];  // Changed to array
    startDate: string;
    estimatedCompletion: string;
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
          { data: devicesData, error: deviceError }, // Changed to get all devices
          { data: trackingData, error: trackingError },
          { data: billingData, error: billingError }
        ] = await Promise.all([
          supabase.from('customers').select('*').eq('service_id', serviceId).single(),
          supabase.from('devices').select('*').eq('service_id', serviceId), // Removed .single()
          supabase.from('service_tracking').select('*').eq('service_id', serviceId).order('created_at', { ascending: true }),
          supabase.from('billing').select('*').eq('service_id', serviceId).single()
        ]);

        if (customerError) throw customerError;
        if (deviceError) throw deviceError;
        if (trackingError) throw trackingError;
        if (billingError) throw billingError;

        // Handle case where no data is found
        if (!customerData || !devicesData || !trackingData || !billingData) {
          throw new Error("Service data not found");
        }

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
            // Take the first device's details for backward compatibility
            type: devicesData[0].device_type,
            brand: devicesData[0].device_name || 'N/A',
            model: devicesData[0].device_model,
            issue: devicesData[0].problem_description,
          },
          // Add a new field for all devices if needed
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
                    {/* {step.date && (
                      <p className="text-sm text-gray-500">{step.date}</p>
                    )} */}
                    {step.notes && (
                      <p className="text-sm mt-2 text-gray-800">{step.notes}</p>
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

          {/* Billing Information */}
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
                  <span>Valentine Month Discount (10% OFF)</span>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackService;