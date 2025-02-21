import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How can I find out the cost of my repair?",
    answer: "We will provide you a reasonable cost post diagnosis after you submit your repair request.",
  },
  {
    question: "What types of devices do you repair?",
    answer:"We provide repair services for smartphones and laptops(charger included), across all brands, and iPads.",
  },
  {
    question: "How long does a typical repair take?",
    answer: "Most of the repairs are completed within 24 hours, faster than the industry average of 3-7 days."
  },
  {
    question: "What are your service areas?",
    answer:"We are serving in the IIT Madras campus as of now.",
  },
  {
    "question": "How do I claim warranty?",
    "answer": "You can claim your warranty directly from the Track Service page on our website. Simply enter your Service ID, mention the issue faced, and submit your request for a hassle-free process."
  },  
  {
    question: "What kind of Parts do you use?",
    answer: "We use high-quality spare parts and OEMs to ensure the longevity and performance of your devices.",
  },
  {
  question: "How can I track the status of my repair?",
  answer: "You can track your device repair status in real-time on our website under the \"Track Service\" section.",
  },
  {  question: "Is my data safe during the repair?",
  answer: "Absolutely! 100% customer data safety is guaranteed and We ensure there is no risk of data loss or theft.",
  },
];

export const FAQ = () => {
  const [visibleFaqs, setVisibleFaqs] = useState(4);

  const toggleFaqs = () => {
    setVisibleFaqs((prevVisible) =>
      prevVisible === faqs.length ? 4 : faqs.length
    );
  };

  return (
    <section id="faq" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-7">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.slice(0, visibleFaqs).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {faqs.length > 4 && (
            <div className="text-center mt-8">
              <a
                onClick={toggleFaqs}
                className="text-primary hover:text-primary-dark cursor-pointer transition-colors"
              >
                {visibleFaqs === faqs.length ? "Show Less" : "Show More"}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
