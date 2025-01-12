// Left side of the book-repair section

import { User, Phone, FileText } from "lucide-react";
import { FormSection } from "./FormSection";
import { motion } from "framer-motion";

export const BookRepairInfo = () => {
  return (
    <div className="relative md:w-1/2 bg-primary p-8 text-white">
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
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="h-64 mt-8 hidden md:block"
      >
        <img
          src="/lovable-uploads/Fixoman.png"
          alt="FIXO Technician"
          className="absolute bottom-0 left-0 h-128 object-contain"
        />
      </motion.div>
    </div>
  );
};