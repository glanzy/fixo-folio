import { User, Phone, FileText } from "lucide-react";
import { FormSection } from "./FormSection";
import { motion } from "framer-motion";

export const BookRepairInfo = () => {
  return (
    <div className="md:w-1/2 bg-primary p-8 text-white">
      <h2 className="text-3xl font-bold mb-6">Book Your Repair</h2>
      <p className="mb-8">Get your device fixed by our expert technicians</p>
      
      <div className="space-y-6 mb-8">
        <FormSection
          icon={<User className="w-6 h-6" />}
          title="Personal Details"
          description="We'll keep your information secure"
        />

        <FormSection
          icon={<Phone className="w-6 h-6" />}
          title="Contact Information"
          description="To keep you updated about repairs"
        />

        <FormSection
          icon={<FileText className="w-6 h-6" />}
          title="Device Details"
          description="Tell us about your device"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative h-64 mt-8"
      >
        <img
          src="/lovable-uploads/ce3f0a31-cf1e-4abc-9413-57e93c1719b1.png"
          alt="FIXO Technician"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full object-contain"
        />
      </motion.div>
    </div>
  );
};