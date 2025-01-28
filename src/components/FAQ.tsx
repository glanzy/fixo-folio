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
      "We repair a wide range of electronic devices including smartphones (all major brands), laptops and iPads.",
  },
  {
    question: "How long does a typical repair take?",
    answer:
      "Most repairs are completed within 24-48 hours. Simple repairs like screen replacements can often be done on the same day.",
  },
  {
    question: "Do you offer any warranty on repairs?",
    answer:
      "Yes, we offer 3-6 months of warranty on all our repairs, covering both parts and labor.",
  },
  {
    question: "What are your service areas?",
    answer:
      "We are currently serving in IIT MADRAS. Soon we will expand to other locations.",
  },
  {
    question: "How can I find out the cost of my repair?",
    answer: "You can get the pricing by filling out the \"Book Repair\" form on our website. Once submitted, our team will contact you with the pricing details. We assure you that we offer the best prices in the market.",
  },
  {
    question: "What kind of Parts do you use?",
    answer: "We use only genuine parts for all our repairs. We source our parts from trusted OEM suppliers to ensure the highest quality.",
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
