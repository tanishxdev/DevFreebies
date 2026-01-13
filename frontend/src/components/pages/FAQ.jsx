import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is DevFreebies?",
      answer:
        "DevFreebies is an open-source directory of high-quality free developer tools, APIs, and learning resources.",
    },
    {
      question: "Is everything really free?",
      answer:
        "Yes. Every listed resource is free or provides a meaningful free tier.",
    },
    {
      question: "How do I submit a tool?",
      answer:
        "Create an account and click “Submit”. All tools are reviewed before being published.",
    },
    {
      question: "What does verified mean?",
      answer:
        "Verified tools have been reviewed to ensure they are safe, real, and useful.",
    },
    {
      question: "Can I save tools?",
      answer:
        "Yes. Logged-in users can bookmark tools and access them from their dashboard.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-semibold mb-10">
          Frequently asked questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
                  <FiChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-text-soft"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
