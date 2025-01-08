import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";


export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
      {/* Background Doodles */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.img
          src="/lovable-uploads/329716e9-f580-49bf-96d5-c87088978422.png"
          alt="Device Parts"
          className="absolute w-40 h-40 opacity-40 bottom-[30%] right-[15%] animate-float delay-450 hidden md:block"
          animate={{ y: [-10, 10] }}
        />
        <motion.img
          src="/lovable-uploads/329716e9-f580-49bf-96d5-c87088978422.png"
          alt="Device Parts"
          className="absolute w-40 h-40 opacity-40 top-[70%] left-[25%] animate-float delay-500 hidden md:block"
          animate={{ y: [-10, 10] }}
        />
        <motion.img
          src="/lovable-uploads/Fixo_image.png"
          alt="Device Parts"
          className="absolute w-40 h-40 opacity-40 top-[41%] left-[15%] animate-float delay-550 hidden md:block"
          animate={{ y: [-10, 10] }}
        />
        <motion.img
          src="/lovable-uploads/b268cdb2-2a68-4246-b015-ac0b58fc46b2.png"
          alt="Broken Phone"
          className="absolute w-40 h-40 opacity-40 top-[10%] right-[7%] animate-float delay-450 hidden md:block"
          animate={{ y: [-15, 15] }}
        />
        <motion.img
          src="/lovable-uploads/2326e657-e820-47b8-887a-6b8cd44eba11.png"
          alt="Error Laptop"
          className="absolute w-40 h-40 opacity-40 bottom-10 left-10 animate-float delay-250 hidden md:block"
          animate={{ y: [-12, 12] }}
        />
        <motion.img
          src="/lovable-uploads/49355866-65d5-482e-a3b7-09a4693e3f9e.png"
          alt="Error Message"
          className="absolute w-32 h-32 opacity-40 top-10 left-[25%] animate-float delay-400 hidden md:block"
          animate={{ y: [-8, 8] }}
        />
        <motion.img
          src="/lovable-uploads/2b8cdbb7-dd7a-4c36-89ca-7e91b3e38d41.png"
          alt="Memory Card"
          className="absolute w-40 h-40 opacity-40 top-[75%] left-[65%] animate-float delay-450 hidden md:block"
          animate={{ y: [-10, 10] }}
        />
        <motion.img
          src="/lovable-uploads/69101519-e492-4415-bf5e-f64c759a0f5c.png"
          alt="Broken Screen"
          className="absolute w-40 h-40 opacity-40 top-3 right-[25%] animate-float delay-300 hidden md:block"
          animate={{ y: [-12, 12] }}
        />
        <motion.img
          src="/lovable-uploads/892623dc-d3e2-4046-8574-4c38fe8876c1.png"
          alt="Broken Laptop"
          className="absolute w-40 h-43 opacity-40 bottom-[1%] right-[6%] animate-float delay-500 hidden md:block"
          animate={{ y: [-15, 15] }}
        />
        <motion.img
        src="/lovable-uploads/Fixo_image1.png"
        alt="Broken Laptop"
        className="absolute w-40 h-43 opacity-40 top-10 left-10 animate-float delay-600 hidden md:block"
        animate={{ y: [-15, 15] }}
        />
      </div>

      <div className="container px-4 mx-auto relative z-10">
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
          <Button size="lg" className="animate-float" onClick={() => window.location.href = "/book-repair"}>
            Book a Repair <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};