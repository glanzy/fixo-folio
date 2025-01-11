import { Smartphone, Laptop, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Repair",
    description: "Expert repairs for all smartphone brands",
  },
  {
    icon: Laptop,
    title: "Laptop Service",
    description: "Professional laptop repair and maintenance",
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Same-day repair for most issues",
  },
  {
    icon: Shield,
    title: "Warranty",
    description: "90-day warranty on all repairs",
  },
  {
    icon: Shield,
    title: "Warranty",
    description: "90-day warranty on all repairs",
  },
  {
    icon: Shield,
    title: "Warranty",
    description: "90-day warranty on all repairs",
  },
];

export const Services = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional repair services for all your devices
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};