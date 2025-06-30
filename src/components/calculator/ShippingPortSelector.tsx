
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";

interface ShippingPortSelectorProps {
  shippingPort: string;
  setShippingPort: (value: string) => void;
  t: any;
}

export const ShippingPortSelector = ({ shippingPort, setShippingPort, t }: ShippingPortSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="shippingPort" className="text-base font-medium">
        {t.shippingPort} <span className="text-red-500">*</span>
      </Label>
      <Select value={shippingPort} onValueChange={setShippingPort}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectPort} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>UAE</SelectLabel>
            <SelectItem value="jebel-ali">Jebel Ali Port (UAE)</SelectItem>
            <SelectItem value="abu-dhabi">Abu Dhabi Port (UAE)</SelectItem>
            <SelectItem value="sharjah">Sharjah Port (UAE)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Saudi Arabia</SelectLabel>
            <SelectItem value="dammam">Dammam Port (Saudi Arabia)</SelectItem>
            <SelectItem value="jeddah">Jeddah Port (Saudi Arabia)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Oman</SelectLabel>
            <SelectItem value="muscat">Muscat Port (Oman)</SelectItem>
            <SelectItem value="sohar">Sohar Port (Oman)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Bahrain</SelectLabel>
            <SelectItem value="khalifa-bin-salman">Khalifa Bin Salman Port (Bahrain)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Qatar</SelectLabel>
            <SelectItem value="hamad">Hamad Port (Qatar)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Kuwait</SelectLabel>
            <SelectItem value="shuwaikh">Shuwaikh Port (Kuwait)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Malaysia</SelectLabel>
            <SelectItem value="port-klang">Port Klang (Malaysia)</SelectItem>
            <SelectItem value="penang">Penang Port (Malaysia)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Indonesia</SelectLabel>
            <SelectItem value="tanjung-priok">Tanjung Priok Port (Indonesia)</SelectItem>
            <SelectItem value="surabaya">Surabaya Port (Indonesia)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Sri Lanka</SelectLabel>
            <SelectItem value="colombo">Colombo Port (Sri Lanka)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Maldives</SelectLabel>
            <SelectItem value="male">Male Port (Maldives)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
