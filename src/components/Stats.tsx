import { motion } from "framer-motion";
import { Users, Star } from "lucide-react";

export const Stats = () => {
  return (
    <section className="py-12 bg-primary/5">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Our Technician Partners' Impact</h2>
          <p className="text-gray-600">Delivering excellence in device repair services</p>
        </div>
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
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4].map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 opacity-80" style={{ clipPath: 'inset(0 20% 0 0)' }} />
            </div>
            <p className="text-gray-600 mt-2">Average Customer Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};