import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Book Online",
    description: "Schedule a repair service through our easy online booking system. Choose your device type and describe the issue you're experiencing.",
    image: "/lovable-uploads/Fixo_image.png"
  },
  {
    title: "Device Diagnosis",
    description: "Our expert technicians will thoroughly examine your device to identify the root cause of the problem and provide a detailed diagnosis.",
    image: "/lovable-uploads/Fixo_image1.png"
  },
  {
    title: "Professional Repair",
    description: "Using genuine parts and professional tools, our certified technicians will repair your device following industry best practices.",
    image: "/lovable-uploads/Fixoman.png"
  },
  {
    title: "Quality Check",
    description: "Before returning your device, we perform comprehensive testing to ensure everything works perfectly.",
    image: "/lovable-uploads/Fixo_image.png"
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">How It Works</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined repair process ensures your device gets fixed quickly and efficiently
          </p>
        </motion.div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8`}
            >
              <div className="flex-1">
                <div className="bg-primary/5 p-8 rounded-2xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
              <div className="flex-1">
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;