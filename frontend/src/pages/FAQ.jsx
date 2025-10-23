import React, { useState } from "react";

const faqs = [
  {
    question: "What types of images are supported?",
    answer: "CaptionAI supports JPG, PNG, and GIF files up to 5MB in size."
  },
  {
    question: "How many languages can I generate captions in?",
    answer: "Our AI supports over 10 languages including English, Spanish, French, German, Chinese, and more."
  },
  {
    question: "Can I customize the tone of the captions?",
    answer: "Yes! Choose from 7 tone styles such as Formal, Casual, Creative, Humorous, and more."
  },
  {
    question: "Is my uploaded image data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and comply with SOC 2 data privacy standards."
  },
  {
    question: "Do I need an account to use CaptionAI?",
    answer: "You need to sign in to create and save captions in your personal gallery."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="max-w-5xl mx-auto p-6 md:p-12">
      <h1 className="text-4xl font-extrabold text-violet-700 dark:text-yellow-300 mb-12 text-center">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map(({ question, answer }, idx) => (
          <section
            key={idx}
            className="w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-6 cursor-pointer select-none"
            onClick={() => toggleFAQ(idx)}
            aria-expanded={openIndex === idx}
            aria-controls={`faq-panel-${idx}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleFAQ(idx); }}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-yellow-300 mb-2 flex justify-between items-center">
              {question}
              <span className={`transform transition-transform duration-300 ${openIndex === idx ? "rotate-180" : "rotate-0"}`}>
                ▼
              </span>
            </h2>
            {openIndex === idx && (
              <p
                id={`faq-panel-${idx}`}
                className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2"
              >
                {answer}
              </p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
