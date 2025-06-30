
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ShippingPortSelectorProps {
  shippingPort: string;
  setShippingPort: (value: string) => void;
  t: any;
}

export const ShippingPortSelector = ({ shippingPort, setShippingPort, t }: ShippingPortSelectorProps) => {
  const portsByCountry = {
    "United Arab Emirates": [
      "Jebel Ali, Dubai",
      "Abu Dhabi Port",
      "Sharjah Port",
      "Fujairah Port"
    ],
    "Saudi Arabia": [
      "Jeddah Islamic Port",
      "King Abdulaziz Port, Dammam",
      "Yanbu Commercial Port",
      "Jizan Port"
    ],
    "Oman": [
      "Port Sultan Qaboos, Muscat",
      "Sohar Port",
      "Salalah Port"
    ],
    "Bahrain": [
      "Khalifa Bin Salman Port",
      "Mina Salman Port"
    ],
    "Qatar": [
      "Hamad Port, Doha",
      "Mesaieed Port",
      "Ras Laffan Port"
    ],
    "Kuwait": [
      "Shuwaikh Port",
      "Shuaiba Port",
      "Doha Port"
    ],
    "Malaysia": [
      "Port Klang",
      "Johor Port",
      "Penang Port",
      "Kuantan Port"
    ],
    "Indonesia": [
      "Tanjung Priok, Jakarta",
      "Tanjung Perak, Surabaya",
      "Belawan, Medan",
      "Makassar Port"
    ],
    "Sri Lanka": [
      "Colombo Port",
      "Hambantota Port"
    ],
    "Maldives": [
      "Male Port"
    ]
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="shipping-port" className="text-base font-medium">
        {t.shippingPort}
      </Label>
      <Select value={shippingPort} onValueChange={setShippingPort}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectPort} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(portsByCountry).map(([country, ports]) => (
            <div key={country}>
              <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50">
                {country}
              </div>
              {ports.map((port) => (
                <SelectItem key={port} value={port} className="pl-4">
                  {port} ({country})
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
