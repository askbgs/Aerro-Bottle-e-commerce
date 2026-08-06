import { STORE_CONFIG } from "../config";
import { ArrowUp, ShoppingBag, ShieldCheck } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="store-footer" className="bg-white border-t border-slate-100 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-100">
          
          {/* Logo & Info */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-black flex items-center justify-center">
              <ShoppingBag className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-800">
              {STORE_CONFIG.STORE_NAME}
            </span>
          </div>

          {/* Quick legal/trust copy */}
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Guaranteed Secure Cash-on-Delivery Checkout</span>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-black hover:border-slate-300 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.STORE_NAME}. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#order-form" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#order-form" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="#order-form" className="hover:text-black transition-colors">Shipping Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
