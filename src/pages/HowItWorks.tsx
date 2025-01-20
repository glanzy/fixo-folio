import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Book Online",
    description: "Schedule a repair service through our easy online booking system",
    images: [
      "/lovable-uploads/2326e657-e820-47b8-887a-6b8cd44eba11.png",
      "/lovable-uploads/892623dc-d3e2-4046-8574-4c38fe8876c1.png",
      "/lovable-uploads/69101519-e492-4415-bf5e-f64c759a0f5c.png"
    ]
  },
  {
    title: "Expert Diagnosis",
    description: "Our certified technicians perform a thorough assessment",
    images: [
      "/lovable-uploads/329716e9-f580-49bf-96d5-c87088978422.png",
      "/lovable-uploads/2b8cdbb7-dd7a-4c36-89ca-7e91b3e38d41.png",
      "/lovable-uploads/2326e657-e820-47b8-887a-6b8cd44eba11.png"
    ]
  },
  {
    title: "Quick Repair",
    description: "Professional repair with genuine parts and warranty",
    images: [
      "/lovable-uploads/49355866-65d5-482e-a3b7-09a4693e3f9e.png",
      "/lovable-uploads/Fixo_image.png",
      "/lovable-uploads/Fixo_image1.png"
    ]
  }
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="space-y-16 md:space-y-24 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row gap-8 md:gap-12 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {step.images.map((image, imgIndex) => (
                    <motion.div
                      key={image}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + imgIndex * 0.1 }}
                      className={`relative overflow-hidden rounded-lg md:rounded-2xl ${
                        imgIndex === 2 ? "col-span-2" : ""
                      }`}
                    >
                      <motion.img
                        src={image}
                        alt={`${step.title} - Image ${imgIndex + 1}`}
                        className={`w-full object-contain ${
                          imgIndex === 2 ? "h-32 md:h-40" : "h-40 md:h-48"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div 
                className="flex-1 space-y-3 md:space-y-4"
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.4 }}
                  className="inline-block bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base"
                >
                  Step {index + 1}
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-gray-900"
                >
                  {step.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.6 }}
                  className="text-lg md:text-xl text-gray-600"
                >
                  {step.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </main>
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 pb-16 pt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">What are you waiting for?</h2>
            <button
              onClick={() => navigate("/book-repair")}
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg hover:bg-primary/90 transition-colors"
            >
              Book Now
            </button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HowItWorks;