
import { CheckCircle, MessageCircle, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-turquoise-50 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Inquiry!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We've received your inquiry and our team will get back to you within 24 hours with a detailed quote for premium Nashik Red Onions.
          </p>
          
          <div className="bg-gradient-to-r from-navy-50 to-turquoise-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-navy-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span>Our export team reviews your requirements</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-navy-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span>We prepare a competitive quote with pricing and logistics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-navy-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span>You receive our detailed proposal within 24 hours</span>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need immediate assistance?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://wa.me/919998694346', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </button>
              <button 
                onClick={() => window.location.href = 'tel:+919998694346'}
                className="bg-navy-600 hover:bg-navy-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 justify-center transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </button>
              <button 
                onClick={() => window.location.href = 'mailto:exports@zokogroups.com'}
                className="bg-turquoise-600 hover:bg-turquoise-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <a 
              href="/" 
              className="text-navy-600 hover:text-navy-700 font-medium underline"
            >
              ← Return to Home Page
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;
