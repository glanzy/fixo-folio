import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Star, ShieldCheck } from "lucide-react";

export const Stats = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);

  const targetCustomerCount = 4000;
  const targetYearsCount = 10;
  const animationDuration = 2000; // Total duration in milliseconds (2 seconds)

  useEffect(() => {
    const handleCounter = (entries, observer, setCount, targetCount) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect(); // Stop observing after animation starts
          let current = 0;
          const increment = targetCount / (animationDuration / 20); // Increment based on duration and update interval
          const interval = setInterval(() => {
            current += increment;
            if (current >= targetCount) {
              setCount(Math.round(targetCount));
              clearInterval(interval);
            } else {
              setCount(Math.round(current));
            }
          }, 20); // Update every 20ms for smooth animation
        }
      });
    };

    const observeElement = (selector, setCount, targetCount) => {
      const element = document.querySelector(selector);
      if (element) {
        const observer = new IntersectionObserver((entries) =>
          handleCounter(entries, observer, setCount, targetCount),
          { threshold: 1.0 }
        );
        observer.observe(element);
      }
    };

    observeElement("#happy-customers-box", setCustomerCount, targetCustomerCount);
    observeElement("#years-experience-box", setYearsCount, targetYearsCount);

    return () => {
      // Cleanup observers
      const elements = ["#happy-customers-box", "#years-experience-box"];
      elements.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
          const observer = new IntersectionObserver(() => {});
          observer.disconnect();
        }
      });
    };
  }, [targetCustomerCount, targetYearsCount]);

  return (
    <section className="bg-white-200">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-6 sm:mt-9 mb-4 sm:mb-6">
          Our Technicians
        </h2>
      </div>

      <div className="container px-1 flex flex-col lg:flex-row items-center">
        {/* Left Side: Full Image */}
        <div className="flex-shrink-0 rounded ml-2 sm:ml-5 w-full lg:w-1/2 mb-4 sm:mb-5">
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
          className="w-full lg:w-1/2 flex flex-col items-center space-y-4 sm:space-y-6 px-2 sm:px-4 lg:px-8"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {/* Box 1: Happy Customers Served */}
            <div
              id="happy-customers-box"
              className="p-3 sm:p-4 w-full sm:w-64 h-auto sm:h-40 rounded-lg bg-white shadow-sm border border-gray-400 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-2 sm:mb-4">
                <Users className="h-5 w-5 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-primary mb-1 sm:mb-2 text-center">
                {customerCount.toLocaleString()}+
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-semibold text-center">
                Happy Customers Served
              </p>
            </div>

            {/* Box 2: Experienced Professionals */}
            <div
              id="years-experience-box"
              className="p-3 sm:p-4 w-full sm:w-64 h-auto sm:h-40 rounded-lg bg-white shadow-sm border border-gray-400 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-2 sm:mb-4">
                <ShieldCheck className="h-5 w-5 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-primary mb-1 sm:mb-2 text-center">
                {yearsCount}+ Years
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-semibold text-center">
                Experienced Technicians You Can Trust
              </p>
            </div>
          </div>

          {/* Box 3: Customer Rating */}
          <div className="p-3 sm:p-4 w-full sm:w-64 h-auto sm:h-40 rounded-lg bg-white shadow-sm border border-gray-400 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-1 mb-2 sm:mb-3">
              {[1, 2, 3, 4].map((_, index) => (
                <Star key={index} className="h-4 w-4 sm:h-6 sm:w-6 fill-yellow-400 text-blue-800" />
              ))}
              <Star
                className="h-4 w-4 sm:h-6 sm:w-6 fill-yellow-400 text-blue-800"
                style={{ clipPath: "inset(0 20% 0 0)" }}
              />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-primary text-center mb-1 sm:mb-2">
              4.8
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-semibold text-center">
              Loved by Our Customers
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
