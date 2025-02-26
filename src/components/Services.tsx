import { Smartphone, Laptop, TabletIcon, Laptop2 } from "lucide-react";
import { motion } from "framer-motion";
import { BrandTicker } from "./BrandTicker";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Laptop,
    title: "Laptop Services",
    description: "Professional laptop repair",
    src: "./Services/CCC.png",
    deviceType: "laptop"
  },
  {
    icon: Smartphone,
    title: "iPhone Services",
    description: "Same-day repair for most",
    src: "./Services/DDD.png",
    deviceType: "iphone"
  },
  {
    icon: Smartphone,
    title: "Android Services",
    description: "Expert repairs for all phone",
    src: "./Services/EEE.png",
    deviceType: "mobile"
  },
  {
    icon: Laptop2,
    title: "Macbook Services",
    description: "90-day warranty on all",
    src: "./Services/BBB.png",
    deviceType: "macbook"
  },
  {
    icon: TabletIcon,
    title: "iPad Services",
    description: "90-day warranty on all",
    src: "./Services/AAA.png",
    deviceType: "ipad"
  },
  {
    icon: TabletIcon,
    title: "Cleaning & Upgradation",
    description: "90-day warranty on all",
    src: "./Services/Cleaning3.png",
    deviceType: "laptop"
  },
];

export const Services = () => {
  const navigate = useNavigate();

  const handleRedirect = (deviceType: string) => {
    navigate('/book-repair', { state: { selectedDeviceType: deviceType } });
  };

  return (
    <>
      <section className="py-6 md:py-10 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-8 md:mb-7">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-4">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-2 md:p-6 rounded-xl bg-white border border-gray-400 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleRedirect(service.deviceType)}
              >
                <div className="rounded-lg flex items-center justify-center mb-2 md:mb-4 bg-gray-100">
                  <img
                    src={service.src}
                    alt={service.title}
                    className="h-20 w-20 md:h-32 md:w-36 object-cover rounded-md"
                  />
                </div>
                <h3 className="text-sm md:text-lg text-primary text-center">
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
