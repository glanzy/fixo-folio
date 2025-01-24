import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Book Online",
    description: "Schedule a repair service through our easy booking system.",
  },
  {
    title: "Free Diagnosis",
    description: "Get your device diagnosed & clear pricing afterwards.",
  },
  {
    title: "Quick Repair",
    description: "Fast and Professional repairs with high quality parts.",
  },
  {
    title: "Delivery",
    description: "Get back your device, as good as NEW! ",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <div className="container px-4 mx-auto">
        {/* Heading Div */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2 sm:mb-4">How It Works</h2>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative border-2 rounded-lg"
            >
              <div className="bg-white hover:bg-gray-100 transition-colors p-4 sm:p-6 rounded-xl shadow-sm relative z-10">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-primary">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-base text-gray-600">{step.description}</p>
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
