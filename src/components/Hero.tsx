import { STORE_CONFIG } from "../config";
import { ArrowDown, Star, ShieldCheck, Sparkles } from "lucide-react";

interface HeroProps {
  onOrderNowClick: () => void;
}

export default function Hero({ onOrderNowClick }: HeroProps) {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-cod-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-linear-to-b from-[#fcfcfd] via-white to-[#fcfcfd]"
    >
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-slate-100/30 rounded-full blur-3xl -z-10 animate-pulse duration-10000" />
      <div className="absolute -top-10 left-10 w-[400px] h-[400px] bg-indigo-50/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Promo Tag */}
            <div className="inline-flex items-center justify-center lg:justify-start">
              <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-[10px] font-bold uppercase tracking-widest rounded-full w-fit text-slate-500 space-x-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                <span>Best Seller</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] sm:leading-tight">
                Experience Pure Hydration, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-black via-slate-900 to-slate-700">
                  {STORE_CONFIG.PRODUCT_NAME}
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                {STORE_CONFIG.PRODUCT_DESCRIPTION}
              </p>
            </div>

            {/* Price & Variant swatches info */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-3xl font-black text-black">
                  {STORE_CONFIG.CURRENCY_SYMBOL}{STORE_CONFIG.PRICE_PER_UNIT}.00
                </span>
                <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                  Cash on Delivery Available
                </span>
              </div>
              <div className="hidden sm:block h-10 w-[1px] bg-slate-100" />
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Premium Colors</span>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#D9D9D9] shadow-xs" title="White" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#4A4A4A] shadow-xs" title="Charcoal" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#B5C2B7] shadow-xs" title="Sage" />
                </div>
              </div>
            </div>

            {/* Stars Review Indicator */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-600">
                4.9/5 Rating (843 Real Reviews)
              </span>
              <span className="hidden sm:inline text-slate-200">|</span>
              <div className="flex items-center space-x-1.5 text-emerald-600 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Purchase</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOrderNowClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl bg-black text-white hover:bg-slate-800 transition-all duration-200 shadow-xl shadow-black/10 active:scale-98 cursor-pointer"
                id="hero-order-cta"
              >
                Order COD • Pay at Door
              </button>
              <button
                onClick={scrollToHowItWorks}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl bg-white text-slate-600 hover:text-black border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-all duration-200 shadow-sm active:scale-98 cursor-pointer"
                id="hero-learn-cta"
              >
                <span>How COD Works</span>
                <ArrowDown className="w-4 h-4 ml-2 animate-bounce" />
              </button>
            </div>

            {/* Highlight Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 sm:pt-6 border-t border-slate-100">
              <div className="text-center lg:text-left space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Delivery</p>
                <p className="text-sm font-bold text-slate-800">Free Home Delivery</p>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payment</p>
                <p className="text-sm font-bold text-slate-800">Cash on Delivery</p>
              </div>
              <div className="col-span-2 sm:col-span-1 text-center lg:text-left space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Warranty</p>
                <p className="text-sm font-bold text-slate-800">30-Day Guarantee</p>
              </div>
            </div>
          </div>

          {/* Hero Right Media Section */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual glow backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/50 rounded-[2.5rem] rotate-3 scale-102 -z-10" />
            
            {/* Main Product Card Container */}
            <div className="relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm max-w-md w-full transition-transform hover:-translate-y-1 duration-300">
              {/* Image element with required referrerPolicy */}
              <img
                src={STORE_CONFIG.PRODUCT_IMAGE_URL}
                alt={STORE_CONFIG.PRODUCT_NAME}
                className="w-full h-auto aspect-4/3 object-cover rounded-2xl border border-slate-100/50"
                referrerPolicy="no-referrer"
                id="product-main-image"
              />
              
              {/* Floating Sale Tag */}
              <div className="absolute top-10 left-10 bg-black text-white font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-widest shadow-md">
                30% OFF
              </div>

              {/* Mini Info Card Overlay */}
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{STORE_CONFIG.PRODUCT_NAME}</h3>
                  <p className="text-xs font-bold text-slate-400">Exclusive Luxury Edition</p>
                </div>
                <div className="text-right">
                  <span className="text-xs line-through text-slate-400 font-bold block">
                    {STORE_CONFIG.CURRENCY_SYMBOL}70.00
                  </span>
                  <span className="text-lg font-black text-slate-900">
                    {STORE_CONFIG.CURRENCY_SYMBOL}{STORE_CONFIG.PRICE_PER_UNIT}.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
