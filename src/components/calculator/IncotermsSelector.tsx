
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IncotermsSelectorProps {
  incoterms: string;
  setIncoterms: (value: string) => void;
  t: any;
}

export const IncotermsSelector = ({ incoterms, setIncoterms, t }: IncotermsSelectorProps) => {
  const incotermsOptions = [
    { value: "exw", label: "EXW (Ex Works)" },
    { value: "fob", label: "FOB (Free on Board)" },
    { value: "cfr", label: "CFR (Cost and Freight)" },
    { value: "cif", label: "CIF (Cost, Insurance & Freight)" },
    { value: "dap", label: "DAP (Delivered at Place)" },
    { value: "ddp", label: "DDP (Delivered Duty Paid)" }
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="incoterms" className="text-base font-medium">
        {t.incoterms || "Incoterms"}
      </Label>
      <Select value={incoterms} onValueChange={setIncoterms}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectIncoterms || "Select incoterms"} />
        </SelectTrigger>
        <SelectContent>
          {incotermsOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
