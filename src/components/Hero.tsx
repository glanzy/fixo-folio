import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Professional Device Repair Service
          </span>
          <h1 className="mb-6 text-4xl md:text-6xl font-bold text-primary">
            Expert Repairs for Your
            <br />
            Digital Life
          </h1>
          <p className="mb-8 text-lg text-gray-600 max-w-2xl mx-auto">
            Fast, reliable repairs for your smartphones and laptops. 
            Professional technicians, genuine parts, and service guarantee.
          </p>
          <Button size="lg" className="animate-float">
            Book a Repair <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};