import { motion } from "framer-motion";

const features = [
  {
    image: "./Services/E.png", 
    title: "Affordable Repairs",
    description: "Reasonable Pricing",
  },
  
  {
    image: "./Services/F.png",
    title: "Genuine Parts",
    description: "High Quality Spare Parts",
  },
  {
    image: "./Services/B.png",
    title: "Quick Repairs",
    description: "Most Repair within 24 hours",
  },
  {
    image: "./Services/C.png",
    title: "Expert Technicians",
    description: "Certified Technicians",
  },
  {
    image: "./Services/A.png",
    title: "Warranty Assured",
    description: "3-6 Months Warranty",
  },
  {
    image: "./Services/D.png",
    title: "Free Pickup & Drop",
    description: "Doorstep Services",
  },
];

export const WhyUs = () => {
  return (
    <section className="py-6 sm:py-10 bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-4 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1">Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              viewport={{ once: true }}
              className="p-3 sm:p-5 rounded-xl bg-white shadow-sm "
            >
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-primary text-center">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
