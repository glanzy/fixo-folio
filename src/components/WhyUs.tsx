import { motion } from "framer-motion";
import { Shield, Clock, Wrench, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Genuine Parts",
    description: "We only use authentic parts for repairs, ensuring quality and longevity",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Most repairs completed within 24-48 hours, getting you back up and running fast",
  },
  {
    icon: Wrench,
    title: "Expert Technicians",
    description: "Our certified technicians have years of experience with all major brands",
  },
  {
    icon: Award,
    title: "Warranty Assured",
    description: "90-day warranty on all repairs, giving you peace of mind",
  },
];

export const WhyUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best device repair service with unmatched quality and customer satisfaction
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};