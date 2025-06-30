
import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";
import WhyUs from "@/components/WhyUs";
import FirstTimeImporters from "@/components/FirstTimeImporters";
import Certifications from "@/components/Certifications";
import OtherProducts from "@/components/OtherProducts";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import PriceCalculator from "./PriceCalculator";

const Index = () => {
  return (
    <div className="min-h-screen font-poppins">
      <Hero />
      <ProductHighlights />
      <WhyUs />
      <FirstTimeImporters />
      <Certifications />
      <OtherProducts />
      <Testimonials />
      /* <div id="price-calculator" className="bg-gradient-to-br from-navy-50 via-white to-turquoise-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get <span className="text-navy-600">Today's EXW Price</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate instant pricing for premium red onions based on your specifications
            </p>
          </div>
          <PriceCalculator />
        </div>
      </div> */
      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default Index;
