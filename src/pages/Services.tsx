import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Smartphone, Laptop, Tablet, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Smartphone,
    title: "Smartphone Repair",
    description: "Expert repairs for all major brands including iPhone, Samsung, Google, and more.",
    image: "/lovable-uploads/Fixo_image.png",
    price: "Starting from $49"
  },
  {
    icon: Laptop,
    title: "Laptop Service",
    description: "Professional laptop repair and maintenance for all brands.",
    image: "/lovable-uploads/Fixo_image1.png",
    price: "Starting from $79"
  },
  {
    icon: Tablet,
    title: "Tablet Repair",
    description: "Comprehensive repair solutions for iPads and Android tablets.",
    image: "/lovable-uploads/892623dc-d3e2-4046-8574-4c38fe8876c1.png",
    price: "Starting from $59"
  },
  {
    icon: Apple,
    title: "Apple Device Specialist",
    description: "Certified technicians for all Apple products.",
    image: "/lovable-uploads/69101519-e492-4415-bf5e-f64c759a0f5c.png",
    price: "Starting from $69"
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Expert Device Repair Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional repairs with guaranteed satisfaction
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <service.icon className="h-6 w-6 text-white" />
                    <h3 className="text-2xl font-semibold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-white/90 mb-4">{service.description}</p>
                  <p className="text-white font-medium">{service.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Book your repair appointment now and experience our professional service.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/book-repair")}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Book Repair
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;