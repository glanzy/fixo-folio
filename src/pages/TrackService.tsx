//Service progress page


import { useState } from "react";
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

const TrackService = () => {
  
  
  // Mock data - in a real app, this would come from an API from database


  const [serviceData] = useState({
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
    },
    device: {
      type: "Laptop",
      brand: "Dell",
      model: "XPS 15",
      issue: "Screen flickering and battery drain",
    },
    service: {
      id: "SRV001",
      status: "diagnosis",
      startDate: "2024-03-15",
      estimatedCompletion: "2024-03-18",
    },
    billing: {
      subtotal: 149.99,
      tax: 15.00,
      total: 164.99,
      status: "Pending",
    },
    timeline: [
      { status: "pickup", completed: true, date: "2024-03-15 09:00 AM" },
      { status: "diagnosis", completed: true, date: "2024-03-15 02:00 PM" },
      { status: "repair", completed: false },
      { status: "out for delivery", completed: false },
      { status: "delivered", completed: false },
    ],
    repairImages: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
  });

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
                        step.status === serviceData.service.status 
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
                <p><span className="font-medium">Email:</span> {serviceData.customer.email}</p>
                <p><span className="font-medium">Phone:</span> {serviceData.customer.phone}</p>
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
                <div className="mt-4">
                  <Badge variant={serviceData.billing.status === "Paid" ? "secondary" : "default"}>
                    {serviceData.billing.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Repair Images */}
          <Card>
            <CardHeader>
              <CardTitle>Repair Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {serviceData.repairImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Repair progress ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
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
