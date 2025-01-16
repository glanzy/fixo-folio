import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Book Online",
    description: "Schedule a repair service through our easy online booking system",
  },
  {
    title: "Diagnosis",
    description: "Our experts will diagnose the issue with your device",
  },
  {
    title: "Quick Repair",
    description: "Professional repair with genuine parts genuine parts",
  },
  {
    title: "Ready to Go",
    description: "Get your device back in perfect working condition",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-10  bg-primary/5">
      <div className="container px-4 mx-auto">
        {/* Heading Div */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple steps to get your device repaired
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm relative z-10 bg-primary/5">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary ">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-primary/20 transform translate-x-1/2">
                  <div className="absolute right-0 top-1/2 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};