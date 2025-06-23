
import { Card, CardContent } from "@/components/ui/card";

const OtherProducts = () => {
  const products = [
    {
      name: "Fresh Garlic",
      description: "Premium quality garlic with strong aroma and long shelf life",
      image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-4.0.3"
    },
    {
      name: "Cavendish Banana",
      description: "Export quality bananas with perfect ripeness and sweetness",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3"
    },
    {
      name: "G4 Green Chilly",
      description: "Spicy and fresh green chillies perfect for international markets",
      image: "https://images.unsplash.com/photo-1583158775393-b0b71b7e6a7c?ixlib=rb-4.0.3"
    },
    {
      name: "Fresh Tomatoes",
      description: "Juicy, red tomatoes harvested at peak ripeness",
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b0b?ixlib=rb-4.0.3"
    },
    {
      name: "Mango Pulp",
      description: "100% natural mango pulp processed with international standards",
      image: "https://images.unsplash.com/photo-1553279027-83d2b48116f8?ixlib=rb-4.0.3"
    },
    {
      name: "Makhana (Plain & Flavoured)",
      description: "Premium fox nuts available in plain and various flavors",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Premium <span className="text-navy-600">Product Range</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From fresh vegetables to processed foods, we export a wide variety of premium agricultural products from India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProducts;
