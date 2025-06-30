
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OnionSizeSelectorProps {
  onionSize: string;
  setOnionSize: (value: string) => void;
  t: any;
}

export const OnionSizeSelector = ({ onionSize, setOnionSize, t }: OnionSizeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="onion-size" className="text-base font-medium">
        {t.onionSize}
      </Label>
      <Select value={onionSize} onValueChange={setOnionSize}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectSize} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="40-45mm">40–45mm</SelectItem>
          <SelectItem value="45mm+">45mm+</SelectItem>
          <SelectItem value="50mm+">50mm+</SelectItem>
          <SelectItem value="55mm+">55mm+</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
