import { motion } from "framer-motion";

const brands = [
  { name: "Apple", logo: "./brands/Apple-Logosu.png" },
  { name: "Acer", logo: "./brands/Acer_2011.png" },
  { name: "Samsung", logo: "./brands/pngimg.com - samsung_logo_PNG8.png" },
  { name: "Google", logo: "./brands/310aefe54a220bfe97dae0cc54d56c13-removebg-preview.png" },
  { name: "OnePlus", logo: "./brands/OnePlus-Logo.png" },
  { name: "Dell", logo: "./brands/Dell_Logo.png" },
  { name: "Lenovo", logo: "./brands/Lenovo_Global_Corporate_Logo.png" },
  { name: "HP", logo: "./brands/HP_logo.png" },
  { name: "Asus", logo: "./brands/Asus-Logo-1995-present.png" },
  { name: "Motorola", logo: "./brands/Motorola-Logo.png" },
  { name: "Nothing", logo: "./brands/Nothing_Logo.png" },
  { name: "Huawei", logo: "./brands/Huawei-Logo-2006.png" },
  { name: "Oppo", logo: "./brands/Oppo-Logo.png" },
  { name: "Vivo", logo: "./brands/Vivo-Logo.png" },
  { name: "Msi", logo: "./brands/MSI-Logo-2019-present.png" },
  { name: "Xaomi", logo: "./brands/Xiaomi_logo_(2021-).svg.png" },
  { name: "Infinix", logo: "./brands/infinix_logo.png" },
  { name: "CMF", logo: "./brands/CMF_by_Nothing_Social_Logo.jpg" }
];

export const BrandTicker = () => {
  return (
    <div className="w-full overflow-hidden py-5">
      <div className="relative inline-flex flex-nowrap">
        <div className="animate-infinite-scroll flex items-center space-x-4 whitespace-nowrap">
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center min-w-[120px]"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-12 w-auto object-contain "
              />
            </motion.div>
          ))}
        </div>
        <div className="absolute top-0 animate-infinite-scroll2 flex items-center space-x-4 whitespace-nowrap">
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center min-w-[120px]"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-12 w-auto object-contain transition-all duration-300 filter"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};