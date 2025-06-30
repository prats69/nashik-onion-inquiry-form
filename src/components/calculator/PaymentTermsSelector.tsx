
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentTermsSelectorProps {
  paymentTerms: string;
  setPaymentTerms: (value: string) => void;
  t: any;
}

export const PaymentTermsSelector = ({ paymentTerms, setPaymentTerms, t }: PaymentTermsSelectorProps) => {
  const paymentTermsOptions = [
    { value: "100-advance", label: "100% Advance Payment" },
    { value: "50-50", label: "50% Advance / 50% Before Shipment" },
    { value: "lc-sight", label: "LC at Sight" },
    { value: "cad", label: "CAD (Cash Against Documents)" },
    { value: "credit", label: "Payment after Delivery (Credit)" }
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="payment-terms" className="text-base font-medium">
        {t.paymentTerms || "Payment Terms"}
      </Label>
      <Select value={paymentTerms} onValueChange={setPaymentTerms}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectPaymentTerms || "Select payment terms"} />
        </SelectTrigger>
        <SelectContent>
          {paymentTermsOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
