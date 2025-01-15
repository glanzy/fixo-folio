import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const teamMembers = [
  {
    name: "Harshit Lata",
    role: "CEO & Co-founder",
    image: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/in/harshitlata/",
    description: "-",
  },
  {
    name: "Pallav Jha",
    role: "CTO & Co-founder",
    image: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/in/pallavjha01/",
    description: "-",
  },
  {
    name: "Lakshay Sharma",
    role: "CBO & Co-founder",
    image: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/in/lakshaycom/",
    description: "-",
  },
  {
    name: "Bhaalu",
    role: "President & CMO",
    image: "/placeholder.svg",
    linkedin: "",
    description: "-",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the team behind FIXO, dedicated to providing the best device repair service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm mb-4">{member.description}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;