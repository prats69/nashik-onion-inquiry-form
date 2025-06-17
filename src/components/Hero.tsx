
import { Button } from "@/components/ui/button";
import { MapPin, Award, Truck } from "lucide-react";

const Hero = () => {
  const scrollToInquiry = () => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-navy-50 via-white to-turquoise-50 flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-navy-600 font-medium">
                <MapPin className="w-5 h-5" />
                <span>From Nashik, Maharashtra, India</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Premium <span className="text-navy-600">Red Onions</span> for Global Markets
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Export quality Nashik Red Onions directly from India's finest agricultural region. 
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
                <p className="text-sm font-medium text-gray-700">Nashik Origin</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={scrollToInquiry}
                className="bg-navy-600 hover:bg-navy-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-300"
              >
                Get Quote Now
              </Button>
              <p className="text-sm text-gray-500">Minimum order quantity: 20 MT</p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-navy-100 to-turquoise-100 rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3" 
                alt="Fresh Nashik Red Onions"
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
    </section>
  );
};

export default Hero;
