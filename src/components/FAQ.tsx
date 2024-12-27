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
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};