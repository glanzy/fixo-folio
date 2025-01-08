import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Smartphone, Laptop, Tablet, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const devices = [
  {
    icon: Smartphone,
    title: "Android Phones",
    description: "Expert repair services for all major Android brands including Samsung, Google, OnePlus, and more.",
    services: [
      "Screen Replacement",
      "Battery Replacement",
      "Camera Repair",
      "Water Damage Treatment",
      "Software Issues"
    ]
  },
  {
    icon: Apple,
    title: "iPhone & iPad",
    description: "Certified technicians for all Apple mobile devices, from the latest models to older versions.",
    services: [
      "Screen & LCD Repair",
      "Battery Service",
      "Camera Module Replacement",
      "Charging Port Repair",
      "iOS Troubleshooting"
    ]
  },
  {
    icon: Laptop,
    title: "Windows Laptops",
    description: "Comprehensive repair solutions for all Windows laptop brands including Dell, HP, Lenovo, and ASUS.",
    services: [
      "Screen Replacement",
      "Keyboard Repair",
      "Hard Drive Upgrade",
      "RAM Upgrade",
      "Motherboard Repair"
    ]
  },
  {
    icon: Apple,
    title: "MacBook",
    description: "Professional MacBook repair services by Apple-certified technicians.",
    services: [
      "Display Repair",
      "Logic Board Repair",
      "Battery Replacement",
      "Keyboard Service",
      "macOS Issues"
    ]
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Our Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional repair services for all your devices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {devices.map((device, index) => (
            <motion.div
              key={device.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-lg border"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <device.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">{device.title}</h3>
              </div>
              <p className="text-muted-foreground mb-6">{device.description}</p>
              <ul className="space-y-2 mb-6">
                {device.services.map((service) => (
                  <li key={service} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate("/book-repair")}
                className="w-full"
              >
                Book Repair
              </Button>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;