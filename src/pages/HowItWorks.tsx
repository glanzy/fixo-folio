import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Wrench, Shield, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: Wrench,
    title: "Expert Diagnosis",
    description: "Our certified technicians perform a thorough assessment of your device using state-of-the-art diagnostic tools.",
    highlight: "Free Initial Assessment"
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Most repairs are completed within 24-48 hours, getting you back to what matters most.",
    highlight: "Same-Day Service Available"
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "We use only genuine parts and provide a 90-day warranty on all repairs.",
    highlight: "90-Day Warranty"
  },
  {
    icon: Star,
    title: "Customer Satisfaction",
    description: "Join thousands of satisfied customers who trust us with their devices.",
    highlight: "4.9/5 Customer Rating"
  }
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Professional Device Repair Process
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience hassle-free repairs with our simple, transparent process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 text-lg">{step.description}</p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-primary font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    {step.highlight}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-primary/5 p-8 rounded-2xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Book your repair appointment now and experience our professional service firsthand.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/book-repair")}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Book Your Repair
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;