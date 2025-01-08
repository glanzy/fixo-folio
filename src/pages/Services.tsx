import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Smartphone, Laptop, Tablet, Apple, Shield, Clock, Wrench, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Smartphone,
    title: "Smartphone Repair",
    description: "Expert repairs for all major brands including iPhone, Samsung, Google, and more.",
    features: [
      "Screen Replacement",
      "Battery Service",
      "Water Damage Treatment",
      "Camera Repairs",
      "Charging Port Fix"
    ],
    price: "Starting from $49"
  },
  {
    icon: Laptop,
    title: "Laptop Service",
    description: "Professional laptop repair and maintenance for all brands.",
    features: [
      "Screen Replacement",
      "Keyboard Repair",
      "Battery Replacement",
      "Data Recovery",
      "Hardware Upgrades"
    ],
    price: "Starting from $79"
  },
  {
    icon: Tablet,
    title: "Tablet Repair",
    description: "Comprehensive repair solutions for iPads and Android tablets.",
    features: [
      "Screen Repairs",
      "Battery Service",
      "Port Replacement",
      "Software Issues",
      "Performance Upgrades"
    ],
    price: "Starting from $59"
  },
  {
    icon: Apple,
    title: "Apple Device Specialist",
    description: "Certified technicians for all Apple products.",
    features: [
      "iPhone Repairs",
      "MacBook Service",
      "iPad Solutions",
      "Apple Watch Fixes",
      "iOS Support"
    ],
    price: "Starting from $69"
  }
];

const features = [
  {
    icon: Shield,
    title: "90-Day Warranty",
    description: "All repairs backed by our satisfaction guarantee"
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Most repairs completed same-day"
  },
  {
    icon: Wrench,
    title: "Genuine Parts",
    description: "Only authentic components used"
  },
  {
    icon: Star,
    title: "Expert Team",
    description: "Certified technicians with years of experience"
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Professional Repair Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert device repair services with guaranteed satisfaction
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-primary">{service.title}</h3>
                  <p className="text-primary/80 font-medium">{service.price}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate("/book-repair")}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Book Now
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-primary/5 p-8 rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Need Help Choosing a Service?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact our expert team for a free consultation and get the best solution for your device.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/book-repair")}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Get Started
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;