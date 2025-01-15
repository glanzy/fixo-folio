// Technician imact page
import { motion } from "framer-motion";
import { Users, Star, BriefcaseBusiness, UserRoundCheck, ShieldCheck } from "lucide-react";

export const Stats = () => {
  return (
    <section className="bg-white-200"> 
      {/*  Add  above */}
      <div className="text-center ">
        <h2 className="text-3xl font-bold text-primary mt-9 mb-6">Our Technician Partners' Impact</h2>
      </div>

      <div className="container px-1 flex flex-col lg:flex-row items-center">
               
        {/* Left Side: Full Image */}
        <div className="flex-shrink-0 rounded ml-5 w-full lg:w-1/2 mb-5">
          <img
            src="./lovable-uploads/Technicians_Impact.png"
            alt="Technician Working"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>

        {/* Right Side: Stats Boxes */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col items-center space-y-6 px-4 lg:px-8"
        >
  <div className="grid grid-cols-2 flex flex-wrap justify-center gap-6">
    {/* Box 1 */}
    <div className="p-4 w-45 sm:w-64 sm:h-40 rounded-lg bg-white shadow-sm border border-gray-400">
      <div className="flex items-center justify-center mb-4">
        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 text-center">4000+</h3>
      <p className="text-gray-600 font-semibold text-center text-sm">Satisfied Customers Served</p>
    </div>

    {/* Box 2 */}
    <div className="p-4 w-45 sm:w-64 sm:h-40 rounded-lg bg-white shadow-sm border border-gray-400">
      <div className="flex items-center justify-center mb-4">
        <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 text-center">10+ Years</h3>
      <p className="text-gray-600 font-semibold text-center text-sm">Experience of technicians</p>
    </div>
  </div>

  {/* Box 3 */}
  <div className="p-4 w-45 sm:w-64 sm:h-40 rounded-lg bg-white shadow-sm border border-gray-400 mt-6">
    <div className="flex items-center justify-center gap-1 mb-3">
      {[1, 2, 3, 4].map((_, index) => (
        <Star key={index} className="h-5 w-5 sm:h-9 sm:w-6 fill-yellow-400 text-blue-800" />
      ))}
      <Star
        className="h-5 w-5 sm:h-9 sm:w-6 fill-yellow-400 text-blue-800"
        style={{ clipPath: "inset(0 20% 0 0)" }}
      />
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-primary text-center mb-2">4.8</h3>
    <p className="text-gray-600 font-semibold text-center text-sm ">Average Customer Rating</p>
  </div>
</motion.div>

      </div>
    </section>
  );
};
