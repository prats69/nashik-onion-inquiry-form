
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PackagingSelectorProps {
  packaging: string;
  setPackaging: (value: string) => void;
  t: any;
}

export const PackagingSelector = ({ packaging, setPackaging, t }: PackagingSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="packaging" className="text-base font-medium">
        {t.packagingType} <span className="text-red-500">*</span>
      </Label>
      <Select value={packaging} onValueChange={setPackaging}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectPackaging} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5kg-red-mesh">5kg Red Mesh Bag</SelectItem>
          <SelectItem value="10kg-red-mesh">10kg Red Mesh Bag</SelectItem>
          <SelectItem value="18kg-red-mesh">18kg Red Mesh Bag</SelectItem>
          <SelectItem value="20kg-red-mesh">20kg Red Mesh Bag</SelectItem>
          <SelectItem value="25kg-jute">25kg Jute Bag</SelectItem>
          <SelectItem value="50kg-jute">50kg Jute Bag</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
