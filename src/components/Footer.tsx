import {
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  MessageCircle,

} from "lucide-react";
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
import { supabase } from "@/supabaseClient"; 

export const Footer = () => {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please enter some feedback before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("feedback").insert([
        {
          message: feedback,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate your input and will review it carefully.",
        duration: 3000,
      });
      setFeedback("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
        duration: 3000, // Automatically hides after 3 seconds
      });
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-5xl font-bold">FIXO</h3>
            </div>
            <p className="italic text-gray-300 text-lg">
              We can't fix your broken heart, but we can fix your broken devices
            </p>

            {/* Nirmaan Logo */}
            <div className="mt-5 flex flex items-center space-x-4">
              <img
                src="./lovable-uploads/Nirmaan_logofooter.png"
                alt="IIT Madras Logo"
                className="h-20 rounded-lg w-auto"
              />
              <p className="text-base text-white tracking-wide">
                SUPPORTED BY NIRMAAN, IIT MADRAS
              </p>
            </div>
          </div>

          {/* Quick Links */}
           {/* <div>
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
                <Link to="/careers" className="text-gray-300 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>  */}

          {/* Our Services - Seen only in laptop mode rest gone*/}
          {/* <div className="hidden md:block">
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Mobile Repair</li>
              <li className="text-gray-300">Laptop Service</li>
              <li className="text-gray-300">iPad Repair</li>
            </ul>
          </div> */}

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">CONTACT US</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6" />
                <div className="flex-col">
                  <div className="text-gray-300">+91 8005539249</div>
                  <div className="text-gray-300">+91 7462080762</div>
                  <div className="text-gray-300">+91 9582568064</div>
                </div>
              </div>

              {/*  */}
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <span
                  className="text-gray-300"
                  onClick={() =>
                    (window.location.href = "mailto:contact@fixonow.com")
                  }
                >
                  contact@fixonow.com
                </span>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-3">
                <MapPin className="h-7 w-7" />
                <span
                  className="text-gray-300"
                  onClick={() =>
                    (window.location.href =
                      "https://www.google.com/maps/place/Sudha+%26+Shankar+Innovation+Hub/@12.9919745,80.2283012,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267b1fb87ef8d:0xa03b5a54521f8c14!8m2!3d12.9919693!4d80.2308761!16s%2Fg%2F11k584pcw8?entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D")
                  }
                >
                  Sudha Shankar Innovation Hub, IIT Madras, Chennai, Tamil Nadu
                  - 600036
                </span>
              </div>

              {/* Socials */}

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <a
                    href="https://chat.whatsapp.com/B5fTANfsQZQ5apGqjZTOQ9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="./socials/WL.png"
                      alt="Message Circle"
                      className="w-8 h-8 transition-colors"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/fixorepairs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="./socials/LL.png"
                      alt="Linkedin"
                      className="w-8 h-8 transition-colors"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/fixo.repairs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="./socials/IL.png"
                      alt="Instagram"
                      className="w-8 h-8 transition-colors"
                    />
                  </a>
                  <a
                    href="https://x.com/fixorepairs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="./socials/TL.png"
                      alt="Twitter"
                      className="w-8 h-8 transition-colors"
                    />
                  </a>
                </div>
              </div>

              {/* 
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
              </Dialog> */}
            </div>
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px] text-black"
            />
            <Button
              onClick={handleFeedbackSubmit}
              className="bg-gray-300 text-black hover:bg-gray-100"
            >
              Submit Feedback
            </Button>
          </div>
        </div>
        
        {/* Copyright part in the bottom */}
        <div className="pt-3 text-center text-gray-200">
          <p>&copy; {new Date().getFullYear()} FIXO. All rights reserved.</p>
      </div>
      </div>
    </footer>
  );
};
