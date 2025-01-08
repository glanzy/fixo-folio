//Summarising the book repair page
import { motion } from "framer-motion";
import { BookRepairInfo } from "@/components/book-repair/BookRepairInfo";
import { BookRepairForm } from "@/components/book-repair/BookRepairForm";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from "lucide-react";

const BookRepair = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <Button 
          variant="ghost" 
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 border"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </div>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="md:flex">   
            <BookRepairInfo />
            <BookRepairForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookRepair;