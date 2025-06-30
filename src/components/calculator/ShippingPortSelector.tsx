
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ShippingPortSelectorProps {
  shippingPort: string;
  setShippingPort: (value: string) => void;
  t: any;
}

export const ShippingPortSelector = ({ shippingPort, setShippingPort, t }: ShippingPortSelectorProps) => {
  const allShippingPorts = [
    "Jebel Ali, Dubai",
    "Abu Dhabi Port",
    "Sharjah Port",
    "Fujairah Port",
    "Jeddah Islamic Port",
    "King Abdulaziz Port, Dammam",
    "Yanbu Commercial Port",
    "Jizan Port",
    "Port Sultan Qaboos, Muscat",
    "Sohar Port",
    "Salalah Port",
    "Khalifa Bin Salman Port",
    "Mina Salman Port",
    "Hamad Port, Doha",
    "Mesaieed Port",
    "Ras Laffan Port",
    "Shuwaikh Port",
    "Shuaiba Port",
    "Doha Port",
    "Port Klang",
    "Johor Port",
    "Penang Port",
    "Kuantan Port",
    "Tanjung Priok, Jakarta",
    "Tanjung Perak, Surabaya",
    "Belawan, Medan",
    "Makassar Port",
    "Colombo Port",
    "Hambantota Port",
    "Male Port"
  ];

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
          {allShippingPorts.map((port) => (
            <SelectItem key={port} value={port}>
              {port}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
