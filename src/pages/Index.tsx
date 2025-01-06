import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <Services />
        <Stats />
        <HowItWorks />
        <FAQ />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;