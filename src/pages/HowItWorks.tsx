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
      "/lovable-uploads/ce3f0a31-cf1e-4abc-9413-57e93c1719b1.png"
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
      <main className="container mx-auto px-4 py-16">
        <div className="space-y-16 md:space-y-24 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className={`flex flex-col md:flex-row gap-8 md:gap-12 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {step.images.map((image, imgIndex) => (
                    <div
                      key={image}
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
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-3 md:space-y-4">
                <div className="inline-block bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base">
                  Step {index + 1}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h2>
                <p className="text-lg md:text-xl text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;