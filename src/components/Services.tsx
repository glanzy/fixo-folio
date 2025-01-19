// Changed code this issssss


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
          <div className="text-center mb-8 md:mb-7">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-4">
              Our Services
            </h2>
          </div>
          
          {/* Using flexbox with wrapping and equal size for items */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-2 md:p-6 flex flex-col items-center justify-between rounded-xl bg-white border border-gray-400 hover:shadow-lg transition-shadow duration-300"
                style={{ flexBasis: "calc(20% - 24px)", height: "auto" }}
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
