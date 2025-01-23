import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ServiceIdEntry = () => {
  const [serviceId, setServiceId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceId.trim()) {
      toast.error("Please enter a service ID");
      return;
    }

    // Navigate to track-service page with the service ID
    navigate(`/track-service?id=${serviceId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Track Your Service</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="serviceId" className="text-sm font-medium text-gray-700">
                  Enter your Service ID
                </label>
                <Input
                  id="serviceId"
                  type="text"
                  placeholder="e.g., SRV001"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Track Service
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceIdEntry;