import { motion } from "framer-motion";

const features = [
  {
    image: "./Services/EE.png",
    title: "Premium Repairs",
    description: "Expert service with guaranteed satisfaction",
  },
  {
    image: "./Services/AA.png",
    title: "90-Day Warranty",
    description: "Complete peace of mind with our service guarantee",
  },
  {
    image: "./Services/FF.png",
    title: "Genuine Parts",
    description: "Only authentic components for lasting quality",
  },
  {
    image: "./Services/BB.png",
    title: "Express Service",
    description: "Swift repairs without compromising quality",
  },
  {
    image: "./Services/CC.png",
    title: "Certified Experts",
    description: "Highly trained professionals at your service",
  },
  {
    image: "./Services/DD.png",
    title: "Doorstep Service",
    description: "Convenient pickup and delivery",
  },
];

export const WhyUs = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
          >
            Why Choose Us
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience excellence in electronic device repair with our premium service offerings
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-105">
                  <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center overflow-hidden">
                    <img 
                      src={feature.image}
                      alt={feature.title}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-primary text-center group-hover:text-blue-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;