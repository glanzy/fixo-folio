import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Book Online",
    description: "Schedule your repair in just a few clicks",
    image: "/lovable-uploads/book-online.png"
  },
  {
    title: "Expert Diagnosis",
    description: "Our certified technicians assess your device",
    image: "/lovable-uploads/diagnosis.png"
  },
  {
    title: "Quick Repair",
    description: "Same-day repair with genuine parts",
    image: "/lovable-uploads/repair.png"
  },
  {
    title: "Ready to Go",
    description: "Get your device back in perfect condition",
    image: "/lovable-uploads/ready.png"
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Get your device repaired in 4 simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="mb-6 relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};