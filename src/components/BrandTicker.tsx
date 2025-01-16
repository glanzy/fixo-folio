import { motion } from "framer-motion";

const brands = [
  { name: "Apple", logo: "/lovable-uploads/11.png" },
  { name: "Samsung", logo: "/lovable-uploads/22.png" },
  { name: "Google", logo: "/lovable-uploads/33.png" },
  { name: "OnePlus", logo: "/lovable-uploads/44.png" },
  { name: "Dell", logo: "/lovable-uploads/55.png" },
  { name: "HP", logo: "/lovable-uploads/4.png" },
  { name: "Lenovo", logo: "/lovable-uploads/5.png" },
  { name: "Asus", logo: "/lovable-uploads/3.png" },
];

export const BrandTicker = () => {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-blue-50 via-white to-blue-50 py-12">
      <div className="relative">
        <div className="flex space-x-16 animate-scroll">
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
                className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 filter hover:drop-shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};