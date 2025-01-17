import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    alt: "Woman using laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    alt: "Laptop repair",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    alt: "Circuit board",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    alt: "Programming screen",
  },
];

export const Hero = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  if (isMobile) {
    return (
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-6 text-4xl font-bold text-primary">
              We Care, We Repair
            </h1>
            
            <Carousel 
              className="w-full max-w-lg mx-auto mb-8"
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              onSlideChange={(index) => setActiveIndex(index)}
            >
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-48 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
              <div className="flex justify-center gap-2 mt-4">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === index ? "bg-primary w-4" : "bg-gray-300"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </Carousel>

            <Button 
              size="lg" 
              className="animate-float"
              onClick={() => window.location.href = "/book-repair"}
            >
              Book a Repair <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">

        
      {/* IMAGE 1 */}
      <motion.img
          src="/lovable-uploads/49355866-65d5-482e-a3b7-09a4693e3f9e.png"
          alt="Error Message Phone"
          className="absolute w-32 h-32 opacity-40 top-10 left-[25%] animate-float delay-400 hidden lg:block"
          animate={{ y: [-8, 8] }}
        />
        {/* FOR LAPTOP*/}
        
      <motion.img
          src="/lovable-uploads/49355866-65d5-482e-a3b7-09a4693e3f9e.png"
          alt="Error Message Phone"
          className="absolute w-32 h-32 opacity-40 top-2 left-[3%] animate-float delay-400 lg:hidden"
          animate={{ y: [-8, 8] }}
        />
        {/* FOR MOBILE AND TAB*/}

        


        {/* IMAGE 2 */}
        <motion.img
          src="/lovable-uploads/329716e9-f580-49bf-96d5-c87088978422.png"
          alt="Mobile with open screen"
          className="absolute w-40 h-40 opacity-40 bottom-[58%] right-[2%] animate-float delay-650 lg:hidden"
          animate={{ y: [-10, 10] }}
        />
        {/* FOR MOBILE AND TAB */}

        <motion.img
          src="/lovable-uploads/329716e9-f580-49bf-96d5-c87088978422.png"
          alt="Mobile with open screen"
          className="absolute w-40 h-40 opacity-40 bottom-[38%] right-[18%] animate-float delay-650 hidden xl:block"
          animate={{ y: [-10, 10] }}
        />
        {/* FOR LAPTOP*/}
        
        

        {/* IMAGE 3 */}        
        <motion.img
          src="/lovable-uploads/69101519-e492-4415-bf5e-f64c759a0f5c.png"
          alt="Broken Screen iphone"
          className="absolute w-40 h-40 opacity-40 top-[5%] right-[25%] animate-float delay-300 lg:hidden"
          animate={{ y: [-12, 12] }}
        />
        {/* FOR MOBILE AND TAB */}
        
        <motion.img
          src="/lovable-uploads/69101519-e492-4415-bf5e-f64c759a0f5c.png"
          alt="Broken Screen iphone"
          className="absolute w-40 h-40 opacity-40 top-[3%] right-[25%] animate-float delay-300 hidden lg:block"
          animate={{ y: [-12, 12] }}
        />
        {/* FOR LAPTOP */}



        {/* IMAGE 4 */}

        <motion.img
          src="/lovable-uploads/Fixo_image.png"
          alt="Laptop multiple screens"
          className="absolute w-40 h-40 opacity-40 top-[60%] left-[10%] animate-float delay-550 lg:hidden"
          animate={{ y: [-10, 10] }}
        />
        {/* FOR MOBILE AND TAB */}
        
        <motion.img
        src="/lovable-uploads/Fixo_image.png"
        alt="Laptop multiple screens"
        className="absolute w-40 h-40 opacity-40 top-[41%] left-[15%] animate-float delay-550 hidden xl:block"
        animate={{ y: [-10, 10] }}
      />
        {/* FOR LAPTOP */}




        {/* IMAGE 5 */}
        <motion.img
          src="/lovable-uploads/2326e657-e820-47b8-887a-6b8cd44eba11.png"
          alt="Error Laptop"
          className="absolute w-40 h-40 opacity-40 bottom-[5%] left-[25%] animate-float delay-250 lg:hidden"
          animate={{ y: [-12, 12] }}
        />
          {/* FOR MOBILE AND TAB */}

        <motion.img
          src="/lovable-uploads/2326e657-e820-47b8-887a-6b8cd44eba11.png"
          alt="Error Laptop"
          className="absolute w-40 h-40 opacity-40 bottom-10 left-10 animate-float delay-250 hidden lg:block"
          animate={{ y: [-12, 12] }}
        />
        {/* FOR LAPTOP */}




        {/* IMAGE 6 */}
        <motion.img
          src="/lovable-uploads/892623dc-d3e2-4046-8574-4c38fe8876c1.png"
          alt="Broken Laptop"
          className="absolute w-40 h-43 opacity-40 bottom-[1%] right-[6%] animate-float delay-500 lg:hidden"
          animate={{ y: [-15, 15] }}
        />
          {/* FOR MOBILE AND TAB */}

        <motion.img
          src="/lovable-uploads/892623dc-d3e2-4046-8574-4c38fe8876c1.png"
          alt="Broken Laptop"
          className="absolute w-40 h-43 opacity-40 bottom-[1%] right-[6%] animate-float delay-500 hidden lg:block"
          animate={{ y: [-15, 15] }}
        />
         {/* FOR LAPTOP */}




      
        <motion.img
          src="/lovable-uploads/2b8cdbb7-dd7a-4c36-89ca-7e91b3e38d41.png"
          alt="Memory Card"
          className="absolute w-40 h-40 opacity-40 top-[75%] left-[65%] animate-float delay-450 hidden lg:block"
          animate={{ y: [-10, 10] }}
        />

        <motion.img
          src="/lovable-uploads/329716e9-f580-49bf-96d5-c87088978422.png"
          alt="Mobile with open screen"
          className="absolute w-40 h-40 opacity-40 top-[70%] left-[25%] animate-float delay-500 hidden lg:block"
          animate={{ y: [-10, 10] }}
        />

        <motion.img
          src="/lovable-uploads/b268cdb2-2a68-4246-b015-ac0b58fc46b2.png"
          alt="Broken Phone Samsung button"
          className="absolute w-40 h-40 opacity-40 top-[10%] right-[7%] animate-float delay-450 hidden lg:block"
          animate={{ y: [-15, 15] }}
        />
        
        <motion.img
        src="/lovable-uploads/Fixo_image1.png"
        alt="CPU Image"
        className="absolute w-40 h-43 opacity-40 top-10 left-10 animate-float delay-600 hidden lg:block"
        animate={{ y: [-15, 15] }}
        />
        
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="mb-6 text-4xl md:text-6xl font-bold text-primary">
            We Care, We Repair
          </h1>

          <p className="mb-8 text-lg text-gray-700 md:text-gray-600 max-w-2xl mx-auto hidden md:block">
            Fast, reliable repairs for your smartphones and laptops. 
            Professional technicians, genuine parts, and service guarantee.
          </p>
          
          <Button 
            size="lg" 
            className="animate-float"
            onClick={() => window.location.href = "/book-repair"}
          >
            Book a Repair <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};