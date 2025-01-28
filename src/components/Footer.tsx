import { Mail, MapPin, Phone, MessageSquare, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

export const Footer = () => {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleFeedbackSubmit = () => {
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedback);
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your input and will review it carefully.",
    });
    setFeedback("");
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">FIXO</h3>
            <p className="text-gray-300">
              "We can't fix your broken heart, but we can fix your broken devices"
            </p>
            {/* Nirmaan Logo */}
            <div className="mt-6 flex flex-col items-center space-y-2">
              <img
                src=""
                alt="IIT Madras Logo"
                className="h-18 rounded-lg w-auto"
              />
              <p className="text-md text-gray-300 tracking-wide">
                Incubated in Nirmaan, IIT Madras
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <a href="/track-service" className="text-gray-300 hover:text-white">
                  Track Service
                </a>
              </li>
              <li>
                <a href="/about-us" className="text-gray-300 hover:text-white">
                  About us
                </a>
              </li>
              <li>
                <Link to="/#faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Mobile Repair</li>
              <li className="text-gray-300">Laptop Service</li>
              <li className="text-gray-300">iPad Repair</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <span className="text-gray-300">+91 8005539249 | +91 7462080762 | +91 9582568064</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <span
                  className="text-gray-300"
                  onClick={() => window.location.href = "mailto:contact@fixonow.com"}
                >
                  contact@fixonow.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" />
                <span
                  className="text-gray-300"
                  onClick={() => window.location.href = "https://www.google.com/maps/place/Sudha+%26+Shankar+Innovation+Hub/@12.9919745,80.2283012,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267b1fb87ef8d:0xa03b5a54521f8c14!8m2!3d12.9919693!4d80.2308761!16s%2Fg%2F11k584pcw8?entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D"}
                >
                  Nirmaan The Pre-Incubator, Sudha Shankar Innovation Hub, IIT Madras, Chennai, Tamil Nadu - 600036
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5" />
                <a
                  href="https://chat.whatsapp.com/B5fTANfsQZQ5apGqjZTOQ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Join our WhatsApp Community
                </a>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Give Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Your Feedback</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Tell us what you think..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Copyright part in the bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} FIXO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
