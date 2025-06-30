
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrderTimingSelectorProps {
  orderTiming: string;
  setOrderTiming: (value: string) => void;
  t: any;
}

export const OrderTimingSelector = ({ orderTiming, setOrderTiming, t }: OrderTimingSelectorProps) => {
  const orderTimingOptions = [
    { value: "immediate", label: "Immediate (Within 1 week)" },
    { value: "2weeks", label: "Within 2 weeks" },
    { value: "1month", label: "Within 1 month" },
    { value: "2months", label: "Within 2 months" },
    { value: "3months", label: "Within 3 months" },
    { value: "flexible", label: "Flexible timing" }
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="order-timing" className="text-base font-medium">
        {t.orderTiming}
      </Label>
      <Select value={orderTiming} onValueChange={setOrderTiming}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectTiming} />
        </SelectTrigger>
        <SelectContent>
          {orderTimingOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
