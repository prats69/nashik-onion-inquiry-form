
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
        {t.currency}
      </Label>
      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectCurrency} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
          <SelectItem value="INR">INR (₹) - Indian Rupee</SelectItem>
          <SelectItem value="AED">AED (د.إ) - UAE Dirham</SelectItem>
          <SelectItem value="SAR">SAR (﷼) - Saudi Riyal</SelectItem>
          <SelectItem value="OMR">OMR (ر.ع.) - Omani Rial</SelectItem>
          <SelectItem value="BHD">BHD (.د.ب) - Bahraini Dinar</SelectItem>
          <SelectItem value="QAR">QAR (ر.ق) - Qatari Riyal</SelectItem>
          <SelectItem value="KWD">KWD (د.ك) - Kuwaiti Dinar</SelectItem>
          <SelectItem value="MYR">MYR (RM) - Malaysian Ringgit</SelectItem>
          <SelectItem value="IDR">IDR (Rp) - Indonesian Rupiah</SelectItem>
          <SelectItem value="LKR">LKR (₨) - Sri Lankan Rupee</SelectItem>
          <SelectItem value="MVR">MVR (ރ.) - Maldivian Rufiyaa</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
