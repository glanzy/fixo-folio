import { motion } from "framer-motion";

const features = [
  {
    image: "./Services/EE.png",
    title: "Affordable Repairs",
    description: "We  longevity",
  },
  {
    image: "./Services/AA.png",
    title: "Warranty Assured",
    description: "90-day wapeace of mind",
  },
  {
    image: "./Services/FF.png",
    title: "Genuine Parts",
    description: "We only vity",
  },
  {
    image: "./Services/BB.png",
    title: "Quick Repairs",
    description: "Most repai8 hours",
  },
  {
    image: "./Services/CC.png",
    title: "Expert Technicians",
    description: "Our cperience",
  },
  {
    image: "./Services/DD.png",
    title: "Free Pick & Drop",
    description: "Convenient ",
  },
];

export const WhyUs = () => {
  return (
    <section className="py-6 sm:py-10 bg-blue-100">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-4 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1">Why Us</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-3 sm:p-5 rounded-xl hover:bg-primary/10 transition-colors duration-400"
            >
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center rounded-2xl mb-2 sm:mb-4 overflow-hidden">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
              <h3 className="text-sm sm:text-base lg:text-xl font-semibold mb-1 text-primary text-center">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 text-center">
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