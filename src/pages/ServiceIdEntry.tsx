import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/supabaseClient";

const ServiceIdEntry = () => {
  const [serviceId, setServiceId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceId.trim()) {
      toast.error("Please enter a service ID");
      return;
    }

    setLoading(true);

    try {
      // Verify if the service ID exists
      const { data, error } = await supabase
        .from('customers')
        .select('service_id')
        .eq('service_id', serviceId)
        .single();

      if (error || !data) {
        toast.error("Invalid service ID. Please check and try again.");
        return;
      }

      // Navigate to track-service page with the verified service ID
      navigate(`/track-service?id=${serviceId}`);
    } catch (error) {
      console.error('Error verifying service ID:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Track Service"}
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