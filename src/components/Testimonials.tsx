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
const testimonials = [
  {
    name: "Mahadarshini C V",
    role: "Apple User",
    content: "Excellent service - gave my IPAD for scrren change - very reasonable price. And Xr have changed battery - worth for the money spent Very good end to end service. I changed display they didn't charge for screws and temp glass. And returned the phone in short time.",
    image: "/lovable-uploads/1.png",
    rating: 5.0 // Dynamic rating
  },
  {
    name: "Aravind Anand",
    role: "Android User",
    content: "I had a great experience at this service center. The staff was professional, knowledgeable, and quick to address my concerns. The service was efficient, and they kept me updated throughout the process. I'm very satisfied with the quality of work and would definitely recommend them to others.",
    image: "/lovable-uploads/2.png",
    rating: 4.4 // Dynamic rating
  },
  {
    name: "Ankit",
    role: "Laptop User",
    content: "I am very satisfied with the service provided for my laptop. The team was professional, and the repair was completed quickly. I appreciated the regular updates on the progress, and the communication was clear throughout the process. Great support!",
    image: "/lovable-uploads/3.png",
    rating: 4.5 // Dynamic rating
  },
  {
    name: "Aaliya",
    role: "Macbook User",
    content: "The technician was kind and explained details. Swift servicing and good customer experience. Service cost was half of what was quoted in Apple authorised. Overall good and will recommend to others for Macbook servicing.",
    image: "/lovable-uploads/4.png",
    rating: 5.0 // Dynamic rating
  }
];

export const Testimonials = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-black to-[#152252] flex flex-col justify-between">
      <div className="container mx-auto px-4 flex-grow">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl text-white font-bold text-primary mb-4 relative inline-block">
            Customers Feedback
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
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300  backdrop-blur-sm h-[400px] flex flex-col justify-between">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Quote className="w-8 h-8 text-primary/20 mb-4" />
                      <p className="text-gray-900 mb-6 italic flex-grow">
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
                                width="30" // Increased star size
                                height="30" // Increased star size
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
                                width="30" // Increased star size
                                height="30" // Increased star size
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
                              width="30" // Increased star size
                              height="30" // Increased star size
                            >
                              <path d="M12 17.27l5.18 3.09-1.64-6.91L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.21-1.64 6.91L12 17.27z" />
                            </svg>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-4 mt-auto">
                        {/* <Avatar className="w-12 h-12 border-2 border-primary/20">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback className="bg-primary/5 text-primary">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar> */}
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
      <h1 className="text-center font-bold text-white mb-0 mt-5 text-2xl">"Your Device's Best Friend for Repairs"</h1>

{/* Remove the gap below this */}


    </section>
  );
};
