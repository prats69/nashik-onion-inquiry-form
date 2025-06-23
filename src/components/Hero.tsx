
import { Button } from "@/components/ui/button";
import { MapPin, Award, Truck, MessageCircle } from "lucide-react";

const Hero = () => {
  const scrollToInquiry = () => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919998694346', '_blank');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-navy-50 via-white to-turquoise-50 flex flex-col">
      {/* Company Logo */}
      <div className="w-full bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <img 
              src="/zoko-logo.png" 
              alt="Zoko Group of Companies" 
              className="h-16 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-navy-600 font-medium">
                  <MapPin className="w-5 h-5" />
                  <span>From Surat, Gujarat, India</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Premium <span className="text-navy-600">Red Onions</span> for Global Markets
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Export quality red onions directly from India's finest agricultural regions. 
                  We guarantee freshness, competitive pricing, and reliable supply chain for international buyers.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-navy-100 rounded-full mx-auto mb-3">
                    <Award className="w-8 h-8 text-navy-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Premium Quality</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-turquoise-100 rounded-full mx-auto mb-3">
                    <Truck className="w-8 h-8 text-turquoise-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Global Shipping</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Direct from Farms</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToInquiry}
                  className="bg-navy-600 hover:bg-navy-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-300"
                >
                  Get Quote Now
                </Button>
                <Button 
                  onClick={openWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </Button>
              </div>
              <p className="text-sm text-gray-500">Minimum order quantity: 29 MT (1 container)</p>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-navy-100 to-turquoise-100 rounded-3xl p-8 shadow-2xl">
                <img 
                  src="/onions.png" 
                  alt="Fresh Agricultural Produce"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border">
                <div className="text-center">
                  <p className="text-3xl font-bold text-navy-600">15+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
