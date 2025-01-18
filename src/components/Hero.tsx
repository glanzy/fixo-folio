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
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
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
          <h1 className="mb-6 text-4xl font-bold text-primary">
            We Care, We Repair
          </h1>
          
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
                  <div className="p-1">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-[200px] md:h-[400px] object-cover rounded-lg shadow-lg"
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
                  onClick={() => scrollTo(index)}
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
};