import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { STORE_CONFIG } from "../config";
import { supabase } from "../lib/supabase";
import {
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  ReceiptText
} from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function OrderForm() {
  const { toast } = useToast();
  // Form Field States
  const [variant, setVariant] = useState(STORE_CONFIG.VARIANTS[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState(STORE_CONFIG.DEFAULT_COUNTRY);
  const [notes, setNotes] = useState("");

  // Validation & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Price calculation
  const subtotal = STORE_CONFIG.PRICE_PER_UNIT * quantity;
  const total = subtotal; // Free Shipping!

  // Input Field Validation
  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "customerName":
        if (!value.trim()) {
          newErrors.customerName = "Full name is required";
        } else if (value.trim().length < 2) {
          newErrors.customerName = "Name must be at least 2 characters long";
        } else {
          delete newErrors.customerName;
        }
        break;
      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^[+]?[0-9\s\-()]{7,20}$/.test(value.trim())) {
          newErrors.phone = "Please enter a valid phone number";
        } else {
          delete newErrors.phone;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "city":
        if (!value.trim()) {
          newErrors.city = "City is required";
        } else {
          delete newErrors.city;
        }
        break;
      case "address":
        if (!value.trim()) {
          newErrors.address = "Complete physical address is required";
        } else if (value.trim().length < 5) {
          newErrors.address = "Please provide a more detailed address";
        } else {
          delete newErrors.address;
        }
        break;
      case "country":
        if (!value) {
          newErrors.country = "Country selection is required";
        } else {
          delete newErrors.country;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (
    name: string,
    value: string,
    setter: Dispatch<SetStateAction<string>>
  ) => {
    setter(value);
    validateField(name, value);
  };

  // Submit Order to Supabase
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Final Validation check
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.customerName = "Full name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!email.trim()) newErrors.email = "Email address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!address.trim()) newErrors.address = "Complete physical address is required";
    if (!country) newErrors.country = "Country selection is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast("Please correct the errors in the form.", "error");
      // Scroll to the first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Direct INSERT query on the Supabase orders table
      const { error } = await supabase.from("orders").insert([
        {
          customer_name: customerName,
          phone: phone,
          email: email,
          city: city,
          address: address,
          country: country,
          product_name: STORE_CONFIG.PRODUCT_NAME,
          product_variant: variant,
          quantity: quantity,
          notes: notes,
          status: "pending",
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
      toast("Order Placed Successfully! Your receipt is ready below.", "success");
      // Scroll to checkout top
      document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
    } catch (err: any) {
      console.error("Supabase Order Submission Error:", err);
      toast(
        "Could not place your order. Please check your internet connection and try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick reset for testing or placing another order
  const handleReset = () => {
    setCustomerName("");
    setPhone("");
    setEmail("");
    setCity("");
    setAddress("");
    setNotes("");
    setQuantity(1);
    setVariant(STORE_CONFIG.VARIANTS[0] || "");
    setErrors({});
    setSuccess(false);
    setErrorMessage(null);
  };

  return (
    <section id="order-form" className="py-16 md:py-24 bg-white border-t border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success State */}
        {success ? (
          <div className="max-w-2xl mx-auto text-center bg-slate-50 p-8 sm:p-12 rounded-[2rem] border border-slate-100 shadow-sm animate-fade-in" id="success-banner">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Order Placed Successfully!
            </h2>
            <p className="mt-4 text-sm text-slate-500 font-medium">
              Thank you for shopping with us, <span className="font-bold text-slate-950">{customerName}</span>! 
              We have received your Cash-on-Delivery order for the <span className="font-bold text-slate-950">{STORE_CONFIG.PRODUCT_NAME}</span>.
            </p>

            {/* Receipt Summary Details */}
            <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-100 text-left space-y-4 shadow-2xs">
              <h3 className="font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100 text-sm">
                <ReceiptText className="w-4 h-4 text-slate-400" />
                <span>Order Confirmation Details</span>
              </h3>
              <div className="grid grid-cols-2 gap-y-3 text-xs font-semibold">
                <div className="text-slate-400">Product</div>
                <div className="text-slate-900 text-right">{STORE_CONFIG.PRODUCT_NAME}</div>

                <div className="text-slate-400">Variant</div>
                <div className="text-slate-900 text-right">{variant}</div>

                <div className="text-slate-400">Quantity</div>
                <div className="text-slate-900 text-right">{quantity} units</div>

                <div className="text-slate-400">Payment Mode</div>
                <div className="text-emerald-600 font-semibold text-right">Cash on Delivery (COD)</div>

                <div className="text-slate-400 pt-3 border-t border-slate-100">Total Amount</div>
                <div className="text-base font-black text-slate-900 pt-2 border-t border-slate-100 text-right">
                  {STORE_CONFIG.CURRENCY_SYMBOL}{total}.00
                </div>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-slate-400 font-medium leading-relaxed">
              Our fulfillment team is already preparing your shipment. We will call you at <span className="font-semibold text-slate-600">{phone}</span> shortly to confirm your dispatch.
            </p>

            <button
              onClick={handleReset}
              className="mt-8 inline-flex items-center justify-center px-6 py-3 text-xs font-bold text-slate-700 hover:text-black border border-slate-200 hover:border-slate-350 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
            >
              Order Another Product
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Complete Your Order
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-500 font-medium">
                No credit cards. No online hassle. Just fill in your details below and pay when the postman arrives.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Checkout Form - Left Side */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8" id="checkout-form">
                {/* Section 1: Product Customization Options */}
                <div className="bg-slate-50/50 p-6 sm:p-8 rounded-[2rem] border border-slate-100 space-y-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2.5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-black text-white text-[10px] font-black">1</span>
                    <span>Select Product Options</span>
                  </h3>

                  {/* Variant Selection */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Choose Color / Style Variant *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {STORE_CONFIG.VARIANTS.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setVariant(v)}
                          className={`px-4 py-3.5 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                            variant === v
                              ? "bg-black text-white border-black shadow-xs"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Incrementor */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Quantity</label>
                      <p className="text-[11px] text-slate-400 font-medium">How many units do you need?</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-12 text-center text-sm font-black text-slate-900 select-none">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section 2: Shipping Contact Info */}
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 space-y-6 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2.5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-black text-white text-[10px] font-black">2</span>
                    <span>Shipping & Delivery Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label htmlFor="customerName" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) =>
                          handleInputChange("customerName", e.target.value, setCustomerName)
                        }
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-black/5 transition-all ${
                          errors.customerName ? "border-red-300 focus:ring-red-400/10" : "border-slate-200"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.customerName && (
                        <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {errors.customerName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => handleInputChange("phone", e.target.value, setPhone)}
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-black/5 transition-all ${
                          errors.phone ? "border-red-300 focus:ring-red-400/10" : "border-slate-200"
                        }`}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => handleInputChange("email", e.target.value, setEmail)}
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-black/5 transition-all ${
                          errors.email ? "border-red-300 focus:ring-red-400/10" : "border-slate-200"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Country Selector */}
                    <div>
                      <label htmlFor="country" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Country *
                      </label>
                      <select
                        id="country"
                        value={country}
                        onChange={(e) => handleInputChange("country", e.target.value, setCountry)}
                        className={`w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-black/5 appearance-none ${
                          errors.country ? "border-red-300 focus:ring-red-400/10" : ""
                        }`}
                      >
                        {STORE_CONFIG.COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {errors.country}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label htmlFor="city" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => handleInputChange("city", e.target.value, setCity)}
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-black/5 transition-all ${
                          errors.city ? "border-red-300 focus:ring-red-400/10" : "border-slate-200"
                        }`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    {/* Physical Delivery Address */}
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Complete Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => handleInputChange("address", e.target.value, setAddress)}
                        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-black/5 transition-all ${
                          errors.address ? "border-red-300 focus:ring-red-400/10" : "border-slate-200"
                        }`}
                        placeholder="Apt 4B, 123 Luxury Avenue"
                      />
                      {errors.address && (
                        <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Delivery Notes / Requests */}
                    <div className="sm:col-span-2">
                      <label htmlFor="notes" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Delivery Notes / Requests (Optional)
                      </label>
                      <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-black/5 resize-none transition-all"
                        placeholder="E.g., Please deliver after 5 PM, ring bell of side door, etc."
                      />
                    </div>
                  </div>
                </div>
              </form>

              {/* Order Summary & Pricing Cards - Right Side */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                {/* Main Order Card with geometric slate widget layout */}
                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[2rem] shadow-lg space-y-6 border border-slate-800">
                  <h3 className="text-xs font-bold tracking-widest uppercase border-b border-white/5 pb-4 flex items-center justify-between text-slate-400">
                    <span>Order Summary</span>
                    <span className="px-2 py-0.5 bg-white/10 rounded-md text-[10px] font-bold tracking-widest uppercase">COD Only</span>
                  </h3>

                  {/* Core product preview item */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={STORE_CONFIG.PRODUCT_IMAGE_URL}
                      alt={STORE_CONFIG.PRODUCT_NAME}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 bg-white"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm truncate">
                        {STORE_CONFIG.PRODUCT_NAME}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate uppercase tracking-wider">
                        Variant: {variant}
                      </p>
                      <p className="text-xs text-slate-400 font-bold mt-1">
                        {quantity} × {STORE_CONFIG.CURRENCY_SYMBOL}{STORE_CONFIG.PRICE_PER_UNIT}.00
                      </p>
                    </div>
                  </div>

                  {/* Pricing Tally Block */}
                  <div className="space-y-3.5 pt-4 border-t border-white/5 font-semibold text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Subtotal</span>
                      <span className="text-white">
                        {STORE_CONFIG.CURRENCY_SYMBOL}
                        {subtotal}.00
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Standard Shipping</span>
                      <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold rounded-md bg-white/10 text-white border border-white/5">
                        FREE
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-400">
                      <span>COD Payment Surcharge</span>
                      <span className="text-emerald-400 font-black">FREE</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-white/5 text-white">
                      <span className="font-bold text-xs">Total due at door</span>
                      <span className="text-2xl font-black tracking-tight">
                        {STORE_CONFIG.CURRENCY_SYMBOL}
                        {total}.00
                      </span>
                    </div>
                  </div>

                  {/* Submit checkout button */}
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center py-4 px-6 rounded-xl bg-white text-black font-bold text-sm hover:bg-slate-100 transition-all duration-200 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl cursor-pointer"
                    id="submit-order-button"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin text-black" />
                        <span>Creating Your Shipment...</span>
                      </>
                    ) : (
                      <span>Confirm Order - Pay {STORE_CONFIG.CURRENCY_SYMBOL}{total} at Door</span>
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-widest">
                      🔒 Secured via Supabase Real-time Cloud API
                    </span>
                  </div>
                </div>

                {/* Secure trust indicators */}
                <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                  <div className="flex items-start space-x-3 text-xs">
                    <Truck className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900">Tracked Express Delivery</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                        We ship immediately. You will receive an SMS shipping tracking number to view real-time transit.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-xs">
                    <ShieldCheck className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900">Pay Only When Satisfied</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                        Zero risk. If you are not satisfied with the product upon inspection, you do not pay.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
