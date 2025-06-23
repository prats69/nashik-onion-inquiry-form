
import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";
import FirstTimeImporters from "@/components/FirstTimeImporters";
import Certifications from "@/components/Certifications";
import OtherProducts from "@/components/OtherProducts";
import Testimonials from "@/components/Testimonials";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const Index = () => {
  return (
    <div className="min-h-screen font-poppins">
      <Hero />
      <ProductHighlights />
      <FirstTimeImporters />
      <Certifications />
      <OtherProducts />
      <Testimonials />
      <InquiryForm />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default Index;
