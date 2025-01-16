import { motion } from "framer-motion";

const brands = [
  { name: "Apple", logo: "./brands/Apple-Logosu.png" },
  { name: "Samsung", logo: "./brands/pngimg.com - samsung_logo_PNG8.png" },
  { name: "Google", logo: "./brands/310aefe54a220bfe97dae0cc54d56c13-removebg-preview.png" },
  { name: "OnePlus", logo: "./brands/OnePlus-Logo.png" },
  { name: "Dell", logo: "./brands/Dell_Logo.png" },
  { name: "HP", logo: "./brands/HP_logo.png" },
  { name: "Lenovo", logo: "./brands/Lenovo_Global_Corporate_Logo.png" },
  { name: "Asus", logo: "./brands/Asus-Logo-1995-present.png" },
];

export const BrandTicker = () => {
  return (
    <div className="w-full overflow-hidden py-12">
      <div className="relative">
        <div className="flex space-x-10 animate-scroll">
          {[...brands, ...brands].map((brand, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center min-w-[120px]"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 300
              }}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-12 w-auto object-contain  hover:grayscale-0 transition-all duration-300 filter hover:drop-shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};