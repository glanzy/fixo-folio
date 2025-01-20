import { motion } from "framer-motion";
import { Wallet, Shield, BadgeCheck, Timer, Award, Truck } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Affordable Repairs",
    description: "Quality repairs at competitive prices, ensuring value for your investment",
  },
  {
    icon: Shield,
    title: "Warranty Assured",
    description: "90-day warranty on all repairs for your complete peace of mind",
  },
  {
    icon: BadgeCheck,
    title: "Genuine Parts",
    description: "Only authentic parts used to ensure optimal device performance",
  },
  {
    icon: Timer,
    title: "Quick Repairs",
    description: "Most repairs completed within 48 hours",
  },
  {
    icon: Award,
    title: "Expert Technicians",
    description: "Certified professionals with years of experience",
  },
  {
    icon: Truck,
    title: "Free Pick & Drop",
    description: "Convenient doorstep service for your devices",
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
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-3 sm:p-5 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <feature.icon 
                  className="w-12 h-12 text-primary" 
                  strokeWidth={1.5}
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