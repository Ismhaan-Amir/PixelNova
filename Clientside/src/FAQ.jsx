import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does Aether AI work?",
    answer:
      "Aether AI uses advanced artificial intelligence models to generate content, assist with automation, and improve productivity across multiple use cases.",
  },
  {
    question: "Can I create custom template?",
    answer:
      "Yes, with Aether AI’s advanced admin panel, you can create and manage custom templates for your customers.",
  },
  {
    question: "Can I create custom chatbots and custom prompts?",
    answer:
      "Absolutely. You can build custom chatbots, define prompts, and fine-tune workflows based on your specific needs.",
  },
  {
    question: "Can I use my language?",
    answer:
      "Yes, Aether AI supports multiple languages and continues to expand language coverage.",
  },
  {
    question: "Should I buy regular license or extended license?",
    answer:
      "Choose the regular license for single projects. The extended license is ideal if you plan to monetize or resell the product.",
  },
  {
    question: "Can I add Google Adsense?",
    answer:
      "Yes, Google AdSense can be integrated easily through the admin settings.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(1);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#020618] text-xs font-bold uppercase tracking-widest font-semibold">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-black">
            Any Questions? Answered
          </h2>
          <p className="text-gray-500">
            Here, we aim to provide you with answers to some of the most
            frequently asked questions about Aether AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-teal-600 transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
