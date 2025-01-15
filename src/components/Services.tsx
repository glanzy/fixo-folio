// Scroll bar wala code is down below


// import { Smartphone, Laptop, Clock, Shield, TabletIcon, Laptop2, ShieldPlus } from "lucide-react";
// import { motion } from "framer-motion";

// const services = [
//   {
//     icon: Smartphone,
//     title: "Android Services",
//     description: "Expert repairs for all phone",
//     src: "./public/lovable-uploads/Android_Services.png",
//   },
//   {
//     icon: Laptop,
//     title: "Laptop Services",
//     description: "Professional laptop repair",
//     src: "./public/lovable-uploads/laptop_services.png",
//   },
//   {
//     icon: Smartphone,123
//     title: "iPhone Services",
//     description: "Same-day repair for most",
//     src: "./public/lovable-uploads/iphone_services.png",
//   },
//   {
//     icon: TabletIcon,
//     title: "iPad Services",
//     description: "90-day warranty on all",
//     src: "./public/lovable-uploads/ipad_services.png",
//   },
//   {
//     icon: Laptop2,
//     title: "Macbook Services",
//     description: "90-day warranty on all",
//     src: "./public/lovable-uploads/macbook_services.png",
//   },
// ];

// export const Services = () => {
//   return (
//     <section className="py-6 md:py-10 bg-white">
//       <div className="container px-4 mx-auto">
//         <div className="text-center mb-8 md:mb-16">
//           <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-4">
//             Our Services
//           </h2>
//           <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
//             Professional repair services for all your devices
//           </p>
//         </div>
        
//         {/* Mobile view (under 768px): Horizontal scrolling */}
//         <div className="md:hidden w-full overflow-x-auto pb-6">
//           <div className="flex space-x-4 min-w-min px-2">
//             {services.map((service, index) => (
//               <motion.div
//                 key={service.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="flex-shrink-0 w-48 p-4 rounded-xl bg-white border border-gray-400 hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="bg-primary/10 rounded-lg flex items-center justify-center mb-3">
//                   <img
//                     src={service.src}
//                     alt={service.title}
//                     className="h-24 w-24 object-cover rounded-md"
//                   />
//                 </div>
//                 <h3 className="text-lg text-primary text-center">
//                   {service.title}
//                 </h3>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Desktop view (768px and above): Grid layout */}
//         <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="p-6 rounded-xl bg-white border border-gray-400 hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="bg-primary/10 rounded-lg flex items-center justify-center mb-4">
//                 <img
//                   src={service.src}
//                   alt={service.title}
//                   className="h-32 w-32 object-cover rounded-md"
//                 />
//               </div>
//               <h3 className="text-xl text-primary text-center">
//                 {service.title}
//               </h3>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;





// Smaller box in 5 format in mobile form code is down below

import { Smartphone, Laptop, TabletIcon, Laptop2  } from "lucide-react";
import { motion } from "framer-motion";

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
    src: "./public/lovable-uploads/laptop_services.png",
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
    src: "./public/lovable-uploads/macbook_services.png",
  },
];

export const Services = () => {
  return (
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
  );
};

export default Services;


// In a single line with small boxes


// import { Smartphone, Laptop, Clock, Shield, TabletIcon, Laptop2, ShieldPlus } from "lucide-react";
// import { motion } from "framer-motion";

// const services = [
//   {
//     icon: Smartphone,
//     title: "Android Services",
//     description: "Expert repairs for all phone",
//     src: "./public/lovable-uploads/Android_Services.png",
//   },
//   {
//     icon: Laptop,
//     title: "Laptop Services",
//     description: "Professional laptop repair",
//     src: "./public/lovable-uploads/laptop_services.png",
//   },
//   {
//     icon: Smartphone,
//     title: "iPhone Services",
//     description: "Same-day repair for most",
//     src: "./public/lovable-uploads/iphone_services.png",
//   },
//   {
//     icon: TabletIcon,
//     title: "iPad Services",
//     description: "90-day warranty on all",
//     src: "./public/lovable-uploads/ipad_services.png",
//   },
//   {
//     icon: Laptop2,
//     title: "Macbook Services",
//     description: "90-day warranty on all",
//     src: "./public/lovable-uploads/macbook_services.png",
//   },
// ];

// export const Services = () => {
//   return (
//     <section className="py-6 md:py-10 bg-white">
//       <div className="container px-4 mx-auto">
//         <div className="text-center mb-8 md:mb-16">
//           <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-4">
//             Our Services
//           </h2>
//           <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
//             Professional repair services for all your devices
//           </p>
//         </div>
        
//         {/* Mobile view: Single line scrollable */}
//         <div className="block md:hidden overflow-x-auto pb-4">
//           <div className="flex gap-2 min-w-max px-1">
//             {services.map((service, index) => (
//               <motion.div
//                 key={service.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="flex-shrink-0 w-16 p-1 rounded-lg bg-white border border-gray-400 hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="bg-primary/10 rounded-lg flex items-center justify-center mb-1">
//                   <img
//                     src={service.src}
//                     alt={service.title}
//                     className="h-12 w-12 object-cover rounded-md"
//                   />
//                 </div>
//                 <h3 className="text-xs text-primary text-center line-clamp-2">
//                   {service.title}
//                 </h3>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Desktop view: Grid layout */}
//         <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="p-6 rounded-xl bg-white border border-gray-400 hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="bg-primary/10 rounded-lg flex items-center justify-center mb-4">
//                 <img
//                   src={service.src}
//                   alt={service.title}
//                   className="h-32 w-32 object-cover rounded-md"
//                 />
//               </div>
//               <h3 className="text-xl text-primary text-center">
//                 {service.title}
//               </h3>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;