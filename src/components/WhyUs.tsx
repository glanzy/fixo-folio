import { motion } from "framer-motion";
import { Shield, Clock, Wrench, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Genuine Parts",
    description: "We only usend longevity",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Most repairs cowithin 24-48 ho",
  },
  {
    icon: Wrench,
    title: "Expert Technicians",
    description: "Our certified ence with",
  },
  {
    icon: Wrench,
    title: "Expert Technicians",
    description: "Our certified ence with",
  },
  {
    icon: Award,
    title: "Warranty Assured",
    description: "90-day warranty on all  mind",
  },
  {
    icon: Award,
    title: "Warranty Assured",
    description: "90-day warranty on all remind",
  },
];

export const WhyUs = () => {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-6 sm:mb-10">
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
              className="p-3 sm:p-5 rounded-xl hover:bg-primary/10 transition-colors duration-400 "
            >
              <div className="flex items-center justify-center ">              
                <div className="w-8 h-8 sm:w-20 sm:h-20 bg-primary/10 flex items-center justify-center rounded-2xl mb-2 sm:mb-4">
                  <feature.icon className="h-6 w-6 sm:h-10 sm:w-10 text-primary " />
                </div>
              </div>
              <h3 className="text-sm sm:text-base lg:text-xl font-semibold mb-1 text-primary text-center">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};