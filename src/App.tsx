import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import HowItWorks from "./components/HowItWorks";
import OrderForm from "./components/OrderForm";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import { ToastProvider } from "./context/ToastContext";

function AppContent() {
  const handleScrollToCheckout = () => {
    const element = document.getElementById("order-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white antialiased font-sans">
      {/* Premium Header */}
      <Header />

      {/* Main Content Layout */}
      <main>
        {/* Hero Banner Section */}
        <Hero onOrderNowClick={handleScrollToCheckout} />

        {/* 3 Core Trust Benefits */}
        <Benefits />

        {/* Step-by-step Process of COD */}
        <HowItWorks />

        {/* Dynamic Order Checkout Form with Supabase Integration */}
        <OrderForm />

        {/* Accordion FAQ Block */}
        <FAQ />
      </main>

      {/* Mobile persistent floating action button */}
      <FloatingCTA onClick={handleScrollToCheckout} />

      {/* Minimalist Footnotes & Links */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

