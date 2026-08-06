import { useState, useEffect } from "react";
import { STORE_CONFIG } from "../config";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="store-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-2.5 group cursor-pointer"
            id="brand-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
              <div className="w-4 h-4 border-2 border-white rounded-xs"></div>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-black transition-colors">
              {STORE_CONFIG.STORE_NAME}
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-sm font-medium text-slate-500 hover:text-black transition-colors cursor-pointer"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("how-cod-works")}
              className="text-sm font-medium text-slate-500 hover:text-black transition-colors cursor-pointer"
            >
              How COD Works
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium text-slate-500 hover:text-black transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Call to Action Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection("order-form")}
              className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold rounded-xl bg-black text-white hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow-md active:scale-98 group cursor-pointer"
              id="header-cta"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
