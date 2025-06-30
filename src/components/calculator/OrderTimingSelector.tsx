
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrderTimingSelectorProps {
  orderTiming: string;
  setOrderTiming: (value: string) => void;
  t: any;
}

export const OrderTimingSelector = ({ orderTiming, setOrderTiming, t }: OrderTimingSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="orderTiming" className="text-base font-medium">
        {t.orderTiming} <span className="text-red-500">*</span>
      </Label>
      <Select value={orderTiming} onValueChange={setOrderTiming}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectTiming} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="immediate">Immediate (Within 15 days)</SelectItem>
          <SelectItem value="1-month">Within 1 Month</SelectItem>
          <SelectItem value="2-months">Within 2 Months</SelectItem>
          <SelectItem value="3-months">Within 3 Months</SelectItem>
          <SelectItem value="flexible">Flexible</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
