
import { CheckCircle, Leaf, Shield, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProductHighlights = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Farm Fresh Quality",
      description: "Directly sourced from certified farms in Nashik region with strict quality control measures."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Export Standards",
      description: "All products meet international export standards and food safety regulations."
    },
    {
      icon: <Globe className="w-8 h-8 text-navy-600" />,
      title: "Global Reach",
      description: "Supplying to 25+ countries worldwide with reliable logistics partnerships."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-turquoise-600" />,
      title: "Quality Assurance",
      description: "Every batch is tested for quality, size consistency, and shelf life before export."
    }
  ];

  const specifications = [
    { label: "Variety", value: "Nashik Red Onion" },
    { label: "Size", value: "25-40mm, 45mm+, 55mm+, 70mm+" },
    { label: "Packaging", value: "9, 10, 18, 20 kg red mesh bags | 25, 26, 50 kg jute bags" },
    { label: "Shelf Life", value: "4-6 months" },
    { label: "Moisture Content", value: "Max 12%" },
    { label: "Loading Capacity", value: "29 MT per reefer container" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our <span className="text-navy-600">Nashik Red Onions</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our red onions from Nashik are renowned for their superior quality, rich flavor, and excellent storage life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Product Specifications</h3>
            <div className="grid grid-cols-1 gap-4">
              {specifications.map((spec, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                  <p className="text-sm font-medium text-gray-500">{spec.label}</p>
                  <p className="text-lg font-semibold text-gray-900">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img 
              src="/onions2.jpg" 
              alt="Onion farming in Nashik"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="text-2xl font-bold mb-2">Nashik Region</h4>
              <p className="text-lg">India's Premium Onion Growing Belt</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
