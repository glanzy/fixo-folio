import { motion } from "framer-motion";
import { Smartphone, Laptop, TabletSmartphone, Apple, Shield, Wrench, Clock, BadgeCheck } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Smartphone,
    title: "Android Phones",
    description: "Expert repairs for Samsung, Google, OnePlus & more",
    services: [
      "Screen Replacement",
      "Battery Service",
      "Camera Repair",
      "Water Damage",
      "Software Issues"
    ]
  },
  {
    icon: Apple,
    title: "iPhone & iPad",
    description: "Certified repairs for all Apple mobile devices",
    services: [
      "Screen & LCD Repair",
      "Battery Replacement",
      "Camera Module",
      "Charging Port",
      "iOS Problems"
    ]
  },
  {
    icon: Laptop,
    title: "Windows Laptops",
    description: "Solutions for Dell, HP, Lenovo & ASUS",
    services: [
      "Screen Replacement",
      "Keyboard Repair",
      "Hard Drive Upgrade",
      "RAM Upgrade",
      "Motherboard Fix"
    ]
  },
  {
    icon: Apple,
    title: "MacBook",
    description: "Apple-certified MacBook repair service",
    services: [
      "Display Repair",
      "Logic Board Fix",
      "Battery Service",
      "Keyboard Issues",
      "macOS Support"
    ]
  }
];

const benefits = [
  {
    icon: Shield,
    title: "90-Day Warranty",
    description: "All repairs backed by our comprehensive warranty"
  },
  {
    icon: Wrench,
    title: "Genuine Parts",
    description: "Only authentic parts used in all repairs"
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Most repairs completed within 24-48 hours"
  },
  {
    icon: BadgeCheck,
    title: "Certified Experts",
    description: "Highly trained and certified technicians"
  }
];

export const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">Professional Device Repair</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Expert repair services for all your devices with guaranteed satisfaction
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.services.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Fix Your Device?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Book your repair appointment now and get your device fixed by our expert technicians
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/book-repair")}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          >
            Book a Repair
          </Button>
        </motion.div>
      </div>
    </section>
  );
};