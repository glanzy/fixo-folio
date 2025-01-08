import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Shield, Clock, Wrench, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Book Online",
    description: "Schedule your repair in just 2 minutes through our simple booking system. Choose a time that works for you.",
    icon: CheckCircle2,
    highlight: "Quick & Easy Process"
  },
  {
    title: "Expert Diagnosis",
    description: "Our certified technicians will thoroughly examine your device and provide a detailed diagnosis report.",
    icon: Wrench,
    highlight: "Professional Assessment"
  },
  {
    title: "Swift Repair",
    description: "Using genuine parts, we'll fix your device with precision and care, typically within 24-48 hours.",
    icon: Clock,
    highlight: "Fast Turnaround"
  },
  {
    title: "Quality Guarantee",
    description: "Every repair comes with our 90-day warranty. We ensure your device works perfectly before return.",
    icon: Shield,
    highlight: "100% Satisfaction"
  },
];

const features = [
  {
    title: "Certified Experts",
    description: "Our technicians are certified professionals with years of experience"
  },
  {
    title: "Genuine Parts",
    description: "We only use authentic parts for all repairs"
  },
  {
    title: "90-Day Warranty",
    description: "All repairs are backed by our comprehensive warranty"
  }
];

export const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">How We Fix Your Devices</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Professional repair service with a simple, transparent process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg relative z-10 h-full border border-gray-100 hover:border-primary/20 transition-colors">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary/80 mb-2 block">
                  {step.highlight}
                </span>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-primary/10 transform translate-x-1/2">
                  <ArrowRight className="absolute right-0 top-1/2 text-primary/30 transform -translate-y-1/2" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Star className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button 
            size="lg"
            onClick={() => navigate("/book-repair")}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          >
            Book Your Repair Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};