import { STORE_CONFIG } from "../config";
import { Truck, Banknote, ShieldCheck, LucideIcon } from "lucide-react";

// Mapping string icons to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  Truck,
  Banknote,
  ShieldCheck,
};

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Why Shop With Us?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 font-medium">
            We prioritize quality and customer satisfaction above everything else. Experience shopping redesigned.
          </p>
        </div>

        {/* 3-Column Grid with geometric card layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORE_CONFIG.BENEFITS.map((benefit) => {
            const IconComponent = iconMap[benefit.icon] || ShieldCheck;
            return (
              <div
                key={benefit.id}
                className="group relative p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-300"
                id={benefit.id}
              >
                {/* Icon Wrapper */}
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-6 transition-transform group-hover:scale-105 border border-slate-200/50">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-slate-900 mb-2 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
