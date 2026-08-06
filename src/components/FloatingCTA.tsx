import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface FloatingCTAProps {
  onClick: () => void;
}

export default function FloatingCTA({ onClick }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll threshold to show the button
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show only if scrolled down past 400px
      if (scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isFormInView, setIsFormInView] = useState(false);

  useEffect(() => {
    const formElement = document.getElementById("order-form");
    if (!formElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the order form is visible in the viewport, hide the floating CTA
        setIsFormInView(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: "0px 0px -10% 0px", // adjust trigger slightly
        threshold: 0.1, // at least 10% visible
      }
    );

    observer.observe(formElement);
    return () => observer.disconnect();
  }, []);

  // Final condition: visible if scrolled down AND form is not in view
  const showButton = isVisible && !isFormInView;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm sm:hidden transition-all duration-300 transform ${
        showButton
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-sm tracking-wide shadow-2xl flex items-center justify-between active:scale-98 transition-all duration-200 cursor-pointer border border-white/10"
        id="mobile-floating-order-cta"
      >
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Claim 30% Off • Order COD</span>
        </span>
        <span className="flex items-center gap-1.5 font-black uppercase text-[11px] tracking-wider bg-white/15 px-2.5 py-1 rounded-md">
          <span>Order Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </button>
    </div>
  );
}
