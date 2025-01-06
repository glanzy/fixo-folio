import { motion } from "framer-motion";
import { BookRepairInfo } from "@/components/book-repair/BookRepairInfo";
import { BookRepairForm } from "@/components/book-repair/BookRepairForm";

const BookRepair = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
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