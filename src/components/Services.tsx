import { Smartphone, Laptop, TabletIcon, Laptop2 } from "lucide-react";
import { motion } from "framer-motion";
import { BrandTicker } from "./BrandTicker";

const services = [
  {
    icon: Smartphone,
    title: "Android Services",
    description: "Expert repairs for all phone",
    src: "./lovable-uploads/Android_Services.png",
  },
  {
    icon: Laptop,
    title: "Laptop Services",
    description: "Professional laptop repair",
    src: "./lovable-uploads/Laptop_services.png",
  },
  {
    icon: Smartphone,
    title: "iPhone Services",
    description: "Same-day repair for most",
    src: "./lovable-uploads/iphone_services.png",
  },
  {
    icon: TabletIcon,
    title: "iPad Services",
    description: "90-day warranty on all",
    src: "./lovable-uploads/ipad_services.png",
  },
  {
    icon: Laptop2,
    title: "Macbook Services",
    description: "90-day warranty on all",
    src: "./lovable-uploads/Macbook_services.png",
  },
];

export const Services = () => {
  return (
    <>
      <section className="py-6 md:py-10 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Professional repair services for all your devices
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-2 md:p-6 rounded-xl bg-white border border-gray-400 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-primary/10 rounded-lg flex items-center justify-center mb-2 md:mb-4">
                  <img
                    src={service.src}
                    alt={service.title}
                    className="h-16 w-16 md:h-32 md:w-32 object-cover rounded-md"
                  />
                </div>
                <h3 className="text-sm md:text-xl text-primary text-center">
                  {service.title}
                </h3>
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
