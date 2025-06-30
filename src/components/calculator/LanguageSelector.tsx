
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (value: string) => void;
  t: any;
}

export const LanguageSelector = ({ language, setLanguage, t }: LanguageSelectorProps) => {
  const languageOptions = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
    { code: "ms", name: "Malay", nativeName: "Bahasa Melayu" },
    { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
    { code: "si", name: "Sinhala", nativeName: "සිංහල" },
    { code: "dv", name: "Dhivehi", nativeName: "ދިވެހިބަސް" },
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="language" className="text-base font-medium flex items-center gap-2">
        <Globe className="w-4 h-4" />
        {t.language}
      </Label>
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectLanguage} />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.nativeName} ({lang.name})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
