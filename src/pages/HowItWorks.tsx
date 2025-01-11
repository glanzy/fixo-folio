import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Book Online",
    description: "Schedule a repair service through our easy online booking system",
    image: "/lovable-uploads/2326e657-e820-47b8-887a-6b8cd44eba11.png"
  },
  {
    title: "Expert Diagnosis",
    description: "Our certified technicians perform a thorough assessment",
    image: "/lovable-uploads/329716e9-f580-49bf-96d5-c87088978422.png"
  },
  {
    title: "Quick Repair",
    description: "Professional repair with genuine parts and warranty",
    image: "/lovable-uploads/49355866-65d5-482e-a3b7-09a4693e3f9e.png"
  }
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Simple Repair Process
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your device fixed in three easy steps
          </p>
        </motion.div>

        <div className="space-y-24 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center gap-12 ${
                index % 2 === 1 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="inline-block bg-primary/10 px-4 py-2 rounded-full">
                  Step {index + 1}
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                <p className="text-xl text-gray-600">{step.description}</p>
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
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Book your repair appointment now and experience our professional service.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/book-repair")}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Book Repair
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;