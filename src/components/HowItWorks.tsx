import { STORE_CONFIG } from "../config";
import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-cod-works" className="py-16 md:py-24 bg-[#fcfcfd]/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How Cash on Delivery Works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 font-medium">
            No upfront payment required! Shop online with confidence using our effortless 3-step COD process.
          </p>
        </div>

        {/* Geometric steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORE_CONFIG.HOW_IT_WORKS.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 hover:border-slate-200 hover:shadow-xs transition-all duration-300"
            >
              <div className="text-xs font-bold text-slate-400 mb-3 tracking-wider">{item.step}</div>
              <h4 className="text-sm font-bold uppercase mb-2 tracking-wide text-slate-800">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
