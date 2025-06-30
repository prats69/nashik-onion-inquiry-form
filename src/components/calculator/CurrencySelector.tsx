
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurrencySelectorProps {
  currency: string;
  setCurrency: (value: string) => void;
  t: any;
}

export const CurrencySelector = ({ currency, setCurrency, t }: CurrencySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="currency" className="text-base font-medium">
        {t.currency} <span className="text-red-500">*</span>
      </Label>
      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectCurrency} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD ($)</SelectItem>
          <SelectItem value="INR">INR (₹)</SelectItem>
          <SelectItem value="AED">AED (د.إ)</SelectItem>
          <SelectItem value="SAR">SAR (﷼)</SelectItem>
          <SelectItem value="OMR">OMR (ر.ع.)</SelectItem>
          <SelectItem value="BHD">BHD (.د.ب)</SelectItem>
          <SelectItem value="QAR">QAR (ر.ق)</SelectItem>
          <SelectItem value="KWD">KWD (د.ك)</SelectItem>
          <SelectItem value="MYR">MYR (RM)</SelectItem>
          <SelectItem value="IDR">IDR (Rp)</SelectItem>
          <SelectItem value="LKR">LKR (₨)</SelectItem>
          <SelectItem value="MVR">MVR (ރ.)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
