
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuantitySelectorProps {
  quantity: string;
  setQuantity: (value: string) => void;
  t: any;
}

export const QuantitySelector = ({ quantity, setQuantity, t }: QuantitySelectorProps) => {
  const quantityOptions = [
    { value: "1", label: "1 Container (29 MT)" },
    { value: "2", label: "2 Containers (58 MT)" },
    { value: "3", label: "3 Containers (87 MT)" },
    { value: "4", label: "4 Containers (116 MT)" },
    { value: "5", label: "5 Containers (145 MT)" },
    { value: "10", label: "10 Containers (290 MT)" },
    { value: "20", label: "20 Containers (580 MT)" },
    { value: "custom", label: "Custom Quantity" }
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="quantity" className="text-base font-medium">
        {t.quantity}
      </Label>
      <Select value={quantity} onValueChange={setQuantity}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectQuantity} />
        </SelectTrigger>
        <SelectContent>
          {quantityOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
