
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, FileCheck, Globe, Building, CreditCard } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "GST Registration",
      description: "Goods & Services Tax registered for transparent business operations",
      code: "GST Compliant"
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "APEDA Registration",
      description: "Agricultural & Processed Food Products Export Development Authority",
      code: "Export Certified"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "FSSAI License",
      description: "Food Safety and Standards Authority of India certification",
      code: "Food Safety Certified"
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600" />,
      title: "SGCCI Membership",
      description: "Surat Gujarat Chamber of Commerce & Industry member",
      code: "Industry Member"
    },
    {
      icon: <FileCheck className="w-8 h-8 text-navy-600" />,
      title: "IEC Code",
      description: "Import Export Code for authorized international trade",
      code: "Trade Authorized"
    },
    {
      icon: <Award className="w-8 h-8 text-turquoise-600" />,
      title: "Quality Certifications",
      description: "ISO standards and quality management systems",
      code: "Quality Assured"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-navy-600">Credentials</span> & Certifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are fully licensed, certified, and registered to ensure the highest standards 
            of quality and compliance in international trade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{cert.title}</h3>
                <p className="text-gray-600 mb-4">{cert.description}</p>
                <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {cert.code}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-navy-100 to-turquoise-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trust & Compliance First</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              All our certifications are up-to-date and regularly renewed. We believe in 
              transparent business practices and full regulatory compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
