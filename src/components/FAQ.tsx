import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of devices do you repair?",
    answer:
      "We repair a wide range of electronic devices including smartphones (all major brands), laptops, tablets, and desktop computers.",
  },
  {
    question: "How long does a typical repair take?",
    answer:
      "Most repairs are completed within 24-48 hours. Simple repairs like screen replacements can often be done on the same day.",
  },
  {
    question: "Do you offer any warranty on repairs?",
    answer:
      "Yes, we provide a 90-day warranty on all our repairs, covering both parts and labor.",
  },
  {
    question: "What are your service areas?",
    answer:
      "We currently service all major metropolitan areas. Enter your location on our booking page to check if we're available in your area.",
  },
  {
    question: "Q1",
    answer: "A1",
  },
  {
    question: "Q2",
    answer: "A2",
  },
  {
    question: "Q3",
    answer: "A3",
  },
];

export const FAQ = () => {
  const [visibleFaqs, setVisibleFaqs] = useState(3);

  const toggleFaqs = () => {
    setVisibleFaqs((prevVisible) =>
      prevVisible === faqs.length ? 3 : faqs.length
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
          {faqs.length > 3 && (
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
