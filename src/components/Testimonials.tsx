import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

// Updated testimonials array with dynamic ratings
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "iPhone User",
    content: "Exceptional service! They fixed my iPhone screen in just 2 hours. Very professional and reliable.",
    image: "/lovable-uploads/1.png",
    rating: 5.0 // Dynamic rating
  },
  {
    name: "Michael Chen",
    role: "MacBook Owner",
    content: "The team was incredibly knowledgeable. They diagnosed and fixed my MacBook issue quickly.",
    image: "/lovable-uploads/2.png",
    rating: 4.3 // Dynamic rating
  },
  {
    name: "Emily Rodriguez",
    role: "iPad User",
    content: "Great experience from start to finish. Fair pricing and excellent customer service.",
    image: "/lovable-uploads/3.png",
    rating: 4.9 // Dynamic rating
  },
  {
    name: "David Kim",
    role: "Laptop Owner",
    content: "Professional and efficient service. They saved my laptop when I thought it was beyond repair!",
    image: "/lovable-uploads/4.png",
    rating: 1.0 // Dynamic rating
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-[#152252]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl text-white font-bold text-primary mb-4 relative inline-block">
            What Our Customers Say
          </h2>
        </div>
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm h-80 flex flex-col justify-between">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Quote className="w-8 h-8 text-primary/20 mb-4" />
                      <p className="text-gray-600 mb-6 italic flex-grow">
                        "{testimonial.content}"
                      </p>
                      {/* Displaying dynamic rating with full and half stars */}
                      <div className="flex mb-4">
                        {Array.from({ length: 5 }, (_, i) => {
                          const starIndex = i + 1;
                          if (starIndex <= Math.floor(testimonial.rating)) {
                            // Full star
                            return (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#FFD700"
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                              >
                                <path d="M12 17.27l5.18 3.09-1.64-6.91L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.21-1.64 6.91L12 17.27z" />
                              </svg>
                            );
                          }
                          if (starIndex - 0.5 === testimonial.rating) {
                            // Half star
                            return (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#FFD700"
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                              >
                                <path d="M12 17.27l5.18 3.09-1.64-6.91L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.21-1.64 6.91L12 17.27z" />
                              </svg>
                            );
                          }
                          // Empty stars
                          return (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#e4e5e9"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                            >
                              <path d="M12 17.27l5.18 3.09-1.64-6.91L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.21-1.64 6.91L12 17.27z" />
                            </svg>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-4 mt-auto">
                        <Avatar className="w-12 h-12 border-2 border-primary/20">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback className="bg-primary/5 text-primary">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white/80 hover:bg-white" />
            <CarouselNext className="hidden md:flex -right-12 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
