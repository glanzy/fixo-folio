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
    src: "./Carousel/C33.png",
    alt: "Woman using laptop",
    src1 : "./Carousel/P1.png",
  },
  {
    src: "./Carousel/C11.png",
    alt: "Woman using laptop",
    src1 : "./Carousel/P2.png",

  },
  {
    src: "./Carousel/C22.png",
    alt: "Woman using laptop",
    src1 : "./Carousel/P3.png",
  },
];

export const Hero = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
    setActiveIndex(index);
  };

  return (
    <section className="relative min-h-[30vh] md:min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <br />
          
         
              {/* Desktop Carousel (md and above) */}
              <Carousel
                className="w-full max-w-[1400px] mx-auto mb-8 hidden md:block"
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                setApi={setApi}
              >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <a href="/book-repair" className="block w-full h-auto overflow-hidden rounded-xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto max-h-[400px] object-contain m-0 rounded-xl"
                    />
                  </a>
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
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          </Carousel>

          {/* Mobile Carousel (sm and below) */}
          <Carousel
            className="w-full mx-auto mb-6 md:hidden"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <a href="/book-repair" className="block w-full h-auto overflow-hidden rounded-xl">
                    <img
                      src={image.src1}
                      alt={image.alt}
                      className="w-full h-auto max-h-[250px] object-contain m-0 rounded-xl"
                    />
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        


          <br />


          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={() => (window.location.href = "/book-repair")}
              className="flex items-center justify-center animate-float text-white bg-gradient-to-r from-blue-800 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-6 py-3 text-center"
            >
              Book Repair <ArrowRight className="ml-2 h-6 w-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 