
import { TrackedWhatsAppButton } from "@/components/TrackedWhatsAppButton";
import { CheckCircle, Users, FileText, Truck, Award, MessageCircle } from "lucide-react";

const FirstTimeImporters = () => {
  const benefits = [
    "Complete documentation assistance",
    "Quality certification guidance", 
    "Shipping and logistics support",
    "Competitive pricing for small orders",
    "24/7 customer support",
    "Risk-free trial orders"
  ];

  const steps = [
    {
      icon: MessageCircle,
      title: "Contact Us",
      description: "Reach out via WhatsApp with your requirements"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "We'll help you prepare all necessary import documents"
    },
    {
      icon: Truck,
      title: "Shipping",
      description: "We handle logistics and ensure safe delivery"
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Receive premium quality produce with certifications"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-turquoise-50 to-navy-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            First Time <span className="text-turquoise-600">Importing?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make international trade simple for new importers with complete guidance and support
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Us for Your First Import?</h3>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <TrackedWhatsAppButton 
              eventName="Contact"
              customData={{ content_name: "Get Expert Guidance" }}
              className="bg-turquoise-600 hover:bg-turquoise-700 text-white px-6 py-3"
            >
              Get Expert Guidance
            </TrackedWhatsAppButton>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Simple 4-Step Process</h3>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-turquoise-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-lg">
          <Users className="w-16 h-16 text-turquoise-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Join 500+ Successful Importers</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            From small businesses to large enterprises, we've helped importers worldwide establish reliable supply chains
          </p>
          
          <TrackedWhatsAppButton 
            eventName="Success Story Inquiry"
            customData={{ content_name: "Start Your Success Story" }}
            className="bg-navy-600 hover:bg-navy-700 text-white px-8 py-3"
          >
            Start Your Success Story
          </TrackedWhatsAppButton>
        </div>
      </div>
    </section>
  );
};

export default FirstTimeImporters;
