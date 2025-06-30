
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuantitySelectorProps {
  quantity: string;
  setQuantity: (value: string) => void;
  t: any;
}

export const QuantitySelector = ({ quantity, setQuantity, t }: QuantitySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="quantity" className="text-base font-medium">
        {t.quantity} <span className="text-red-500">*</span>
      </Label>
      <Select value={quantity} onValueChange={setQuantity}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectQuantity} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 Container (29 Tons)</SelectItem>
          <SelectItem value="2">2 Containers (58 Tons)</SelectItem>
          <SelectItem value="3">3 Containers (87 Tons)</SelectItem>
          <SelectItem value="4">4 Containers (116 Tons)</SelectItem>
          <SelectItem value="5">5 Containers (145 Tons)</SelectItem>
          <SelectItem value="10">10+ Containers</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
