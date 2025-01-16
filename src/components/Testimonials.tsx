import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    content: "The team was incredibly knowledgeable. They diagnosed and fixed my MacBook issue quickly. Highly recommended!",
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          What Our Customers Say
        </h2>
        <div className="max-w-5xl mx-auto">
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
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};