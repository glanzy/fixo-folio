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
    name: "Sarah Johnson",
    role: "iPhone User",
    content: "Exceptional service! They fixed my iPhone screen in just 2 hours. Very professional and reliable.",
    image: "/lovable-uploads/1.png"
  },
  {
    name: "Michael Chen",
    role: "MacBook Owner",
    content: "The team was incredibly knowledgeable. They diagnosed and fixed my MacBook issue quickly.",
    image: "/lovable-uploads/2.png"
  },
  {
    name: "Emily Rodriguez",
    role: "iPad User",
    content: "Great experience from start to finish. Fair pricing and excellent customer service.",
    image: "/lovable-uploads/3.png"
  },
  {
    name: "David Kim",
    role: "Laptop Owner",
    content: "Professional and efficient service. They saved my laptop when I thought it was beyond repair!",
    image: "/lovable-uploads/4.png"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F1F0FB]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4 relative inline-block">
            What Our Customers Say
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 rounded-full">
              <div className="w-1/2 h-full bg-primary rounded-full animate-pulse"></div>
            </div>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from our satisfied customers
          </p>
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
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-primary/20 mb-4" />
                      <p className="text-gray-600 mb-6 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-4">
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