import { motion } from "framer-motion";
import { Smartphone, Laptop, Tablet, Apple } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Repair",
    description: "Expert repairs for all smartphone brands",
    image: "/lovable-uploads/mobile-repair.png"
  },
  {
    icon: Laptop,
    title: "Laptop Service",
    description: "Professional laptop repair and maintenance",
    image: "/lovable-uploads/laptop-repair.png"
  },
  {
    icon: Tablet,
    title: "Tablet Repair",
    description: "Specialized tablet and iPad repairs",
    image: "/lovable-uploads/tablet-repair.png"
  },
  {
    icon: Apple,
    title: "Apple Devices",
    description: "Certified Apple device repair service",
    image: "/lovable-uploads/apple-repair.png"
  }
];

export const Services = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Professional repair services for all your devices
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};