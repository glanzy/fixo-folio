import { Smartphone, Laptop, TabletIcon, Laptop2 } from "lucide-react";
import { motion } from "framer-motion";
import { BrandTicker } from "./BrandTicker";

const services = [
  {
    icon: Laptop,
    title: "Laptop Services",
    description: "Professional laptop repair",
    src: "./Services/Laptop_rep.png",
  },
  {
    icon: Smartphone,
    title: "iPhone Services",
    description: "Same-day repair for most",
    src: "./Services/iPhone_rep.png",
  },
  {
    icon: Smartphone,
    title: "Android Services",
    description: "Expert repairs for all phone",
    src: "./Services/Android_rep.png",
  },
  {
    icon: Laptop2,
    title: "Macbook Services",
    description: "90-day warranty on all",
    src: "./Services/mac.png",
  },
  {
    icon: TabletIcon,
    title: "iPad Services",
    description: "90-day warranty on all",
    src: "./Services/iPad_rep.png",
  },
];

export const Services = () => {
  return (
    <>
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
            >
              Our Premium Services
            </motion.h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={service.src}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg md:text-xl font-semibold text-primary text-center group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <BrandTicker />
    </>
  );
};

export default Services;