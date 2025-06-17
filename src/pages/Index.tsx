
import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-poppins">
      <Hero />
      <ProductHighlights />
      <InquiryForm />
      <Footer />
    </div>
  );
};

export default Index;
