
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Ship, FileText, Home, MessageCircle, CreditCard } from "lucide-react";

const FirstTimeImporters = () => {
  const scrollToInquiry = () => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919998694346', '_blank');
  };

  const incoterms = [
    {
      term: "FOB",
      name: "Free On Board",
      description: "We deliver goods to the port, you handle shipping & import"
    },
    {
      term: "CIF",
      name: "Cost, Insurance & Freight",
      description: "We handle shipping & insurance, you handle import clearance"
    },
    {
      term: "C&F",
      name: "Cost & Freight",
      description: "We handle shipping, you handle insurance & import clearance"
    },
    {
      term: "DAP",
      name: "Delivered At Place",
      description: "We deliver to your doorstep, you only handle import duties"
    }
  ];

  const paymentTerms = [
    {
      term: "100% Advance",
      description: "Full payment before shipment - ideal for first-time importers wanting complete peace of mind"
    },
    {
      term: "30% Advance + 70% LC at Sight",
      description: "Pay 30% upfront, remaining 70% through Letter of Credit. LC at Sight means payment is made immediately when documents are presented to your bank, ensuring secure transaction for both parties."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-turquoise-50 to-navy-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            New to <span className="text-navy-600">Importing</span>? We've Got You Covered!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't let paperwork and logistics stop you from accessing premium Indian produce. 
            We handle everything so you can focus on your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-turquoise-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 text-turquoise-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Door-to-Door Delivery</h3>
                <p className="text-gray-600">From our farms to your warehouse - we handle the entire journey with complete transparency.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-navy-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Documentation</h3>
                <p className="text-gray-600">Export permits, certificates, shipping documents - we prepare everything for smooth customs clearance.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Hassle-Free Process</h3>
                <p className="text-gray-600">24/7 support, real-time tracking, and dedicated account managers to guide you every step of the way.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={scrollToInquiry}
                className="bg-navy-600 hover:bg-navy-700 text-white px-6 py-3 rounded-lg"
              >
                Start Your First Import
              </Button>
              <Button 
                onClick={openWhatsApp}
                variant="outline"
                className="border-turquoise-600 text-turquoise-600 hover:bg-turquoise-50 px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Get Expert Guidance
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Preferred Shipping Terms</h3>
              <div className="space-y-4">
                {incoterms.map((incoterm, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Ship className="w-5 h-5 text-navy-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-navy-600 text-lg">{incoterm.term}</span>
                            <span className="text-gray-500">•</span>
                            <span className="font-medium text-gray-700">{incoterm.name}</span>
                          </div>
                          <p className="text-gray-600">{incoterm.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Flexible Payment Terms</h3>
              <div className="space-y-4">
                {paymentTerms.map((payment, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-green-600 text-lg mb-2">{payment.term}</h4>
                          <p className="text-gray-600">{payment.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstTimeImporters;
