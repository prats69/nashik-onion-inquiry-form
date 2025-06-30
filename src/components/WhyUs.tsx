
import { Card, CardContent } from "@/components/ui/card";
import { Video, Camera, FileText, Users } from "lucide-react";

const WhyUs = () => {
  const features = [
    {
      icon: Video,
      title: "Real-Time Order Tracking",
      description: "Get WhatsApp live link of your order showing real-time sorting, packing, and loading processes — available on demand.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Camera,
      title: "Camera-Verified Quality",
      description: "No mixed-size cheating. Every lot is camera-verified before dispatch to ensure consistent quality standards.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: FileText,
      title: "Lab-Certified Reports",
      description: "Consistent moisture and shelf-life reports from 3rd party labs available on demand for complete transparency.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Users,
      title: "Backup Supplier Network",
      description: "Fallback supplier network ensures continuity — if we can't supply, we activate backup exporters within 24 hours.",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why <span className="text-navy-600">Experienced Importers</span> Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand the challenges of international trade. That's why we've built systems that give you complete control and transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
