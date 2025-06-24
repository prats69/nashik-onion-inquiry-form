
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      country: "UAE",
      rating: 5,
      date: "2 days ago",
      image: "/1.png"
    },
    {
      
      country: "UK",

      rating: 5,
      date: "1 week ago",
      image: "/2.png"
    },
    {
      
      country: "Qatar",

      rating: 5,
      date: "3 days ago",
      image: "/3.png"
    },
    {
      country: "Singapore",

      rating: 5,
      date: "5 days ago",
      image: "/4.png"
    },
    {
      country: "Australia",
      rating: 5,
      date: "1 week ago",
      image: "/6.png"
    },
    {
      country: "Bahrain",

      rating: 5,
      date: "4 days ago",
      image: "/7.png"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-navy-600">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real feedback from our valued customers across the globe via WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-6">
                {/* Mobile Screenshot Image - Much Larger */}
                <div className="mb-6">
                  <div className="w-full max-w-sm mx-auto bg-gray-100 rounded-xl overflow-hidden shadow-md">
                    <img 
                      src={testimonial.image} 
                      alt="WhatsApp conversation screenshot"
                      className="w-full h-96 object-cover"
                    />
                  </div>
                </div>
                
                {/* Customer Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.country}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 italic">"{testimonial.message}"</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>WhatsApp Message</span>
                  <span>{testimonial.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-100 to-turquoise-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Happy Customers</h3>
            <p className="text-lg text-gray-600 mb-6">
              Experience the same quality and service that has earned us customers in 25+ countries.
            </p>
            <button 
              onClick={() => window.open('https://wa.me/919998694346', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Start Your Success Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
