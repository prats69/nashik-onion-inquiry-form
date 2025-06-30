
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentTermsSelectorProps {
  paymentTerms: string;
  setPaymentTerms: (value: string) => void;
  t: any;
}

export const PaymentTermsSelector = ({ paymentTerms, setPaymentTerms, t }: PaymentTermsSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="paymentTerms" className="text-base font-medium">
        {t.paymentTerms || "Payment Terms"} <span className="text-red-500">*</span>
      </Label>
      <Select value={paymentTerms} onValueChange={setPaymentTerms}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectPaymentTerms || "Select payment terms"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="100-advance">100% Advance Payment</SelectItem>
          <SelectItem value="50-50">50% Advance / 50% Before Shipment</SelectItem>
          <SelectItem value="lc-sight">LC at Sight</SelectItem>
          <SelectItem value="cad">CAD (Cash Against Documents)</SelectItem>
          <SelectItem value="credit">Payment after Delivery (Credit)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
