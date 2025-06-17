
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-onion-400">Nashik Fresh Exports</h3>
            <p className="text-gray-300">
              Premium exporter of fresh fruits and vegetables from India, specializing in Nashik Red Onions for global markets.
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <Globe className="w-4 h-4" />
              <span>Serving 25+ countries worldwide</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Red Onions</li>
              <li>White Onions</li>
              <li>Shallots</li>
              <li>Garlic</li>
              <li>Ginger</li>
              <li>Potatoes</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Export Markets</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Middle East</li>
              <li>Southeast Asia</li>
              <li>Europe</li>
              <li>Africa</li>
              <li>Americas</li>
              <li>Oceania</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Nashik, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+91 9876543210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">export@nashikfresh.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div className="text-gray-400 text-sm">
              © 2024 Nashik Fresh Exports. All rights reserved.
            </div>
            <div className="space-x-4 text-sm">
              <span className="text-gray-400">Export License: IEC123456789</span>
            </div>
            <div className="space-x-4 text-sm">
              <span className="text-gray-400">ISO 22000:2018 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
