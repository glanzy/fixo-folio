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
    src: "./Carousel/EFGH.png",
    alt: "Woman using laptop",
  },{
    src: "./Carousel/ABCD.png",
    alt: "Woman using laptop",
  },{
    src: "./Carousel/HIJK.png",
    alt: "Woman using laptop",
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
          
         <Carousel
            className="w-full max-w-[1400px] mx-auto mb-8"
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

          <br />
          <Button
            size="lg"
            className="animate-float px-8 py-4 text-lg"
            onClick={() => (window.location.href = "/book-repair")}
          >
            Book a Repair <ArrowRight className="ml-2 h-6 w-6" />
          </Button>

        </motion.div>
      </div>
    </section>
  );
};