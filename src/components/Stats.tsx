import { motion } from "framer-motion";
import { Users, Star } from "lucide-react";

export const Stats = () => {
  return (
    <section className="py-12 bg-primary/5">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center text-center"
        >
          <div className="p-6 rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-4xl font-bold text-primary mb-2">2000+</h3>
            <p className="text-gray-600">Satisfied Customers Served</p>
          </div>

          <div className="p-6 rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-4xl font-bold text-primary mb-2">4.8</h3>
            <p className="text-gray-600">Average Customer Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};