import { useState } from "react";
import { STORE_CONFIG } from "../config";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#fcfcfd]/60 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 font-medium">
            Got questions? We've got answers. Here are the most common things people ask about.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" id="faq-list">
          {STORE_CONFIG.FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs hover:border-slate-200 transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer select-none"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <span className="flex items-center space-x-3 text-sm font-bold text-slate-800">
                    <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-black text-white" : ""
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Animated content box */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-80 border-t border-slate-50 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="p-6 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
