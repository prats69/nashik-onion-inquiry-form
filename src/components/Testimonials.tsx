
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ahmed Al-Rashid",
      country: "UAE",
      message: "Excellent quality onions! Very fresh and well-packaged. Zoko Group delivers exactly what they promise.",
      rating: 5,
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&w=300&h=600"
    },
    {
      name: "Sarah Johnson",
      country: "UK",
      message: "First time importing from India and Zoko Group made it so easy! Great support throughout the process.",
      rating: 5,
      date: "1 week ago",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&w=300&h=600"
    },
    {
      name: "Mohammad Hassan",
      country: "Qatar",
      message: "Been working with them for 3 years. Consistent quality and reliable delivery. Highly recommended!",
      rating: 5,
      date: "3 days ago",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&w=300&h=600"
    },
    {
      name: "Lisa Chen",
      country: "Singapore",
      message: "The mango pulp quality is outstanding! Perfect for our food processing business.",
      rating: 5,
      date: "5 days ago",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&w=300&h=600"
    },
    {
      name: "David Miller",
      country: "Australia",
      message: "Competitive prices and excellent customer service. They handle all documentation perfectly.",
      rating: 5,
      date: "1 week ago",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&w=300&h=600"
    },
    {
      name: "Fatima Al-Zahra",
      country: "Bahrain",
      message: "Fresh garlic arrived in perfect condition. Fast shipping and great communication.",
      rating: 5,
      date: "4 days ago",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&w=300&h=600"
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
