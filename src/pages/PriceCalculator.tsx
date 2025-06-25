
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calculator, MessageCircle, Info, Globe } from "lucide-react";

interface ExchangeRates {
  [key: string]: number;
}

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

const PriceCalculator = () => {
  const [onionSize, setOnionSize] = useState<string>("");
  const [packaging, setPackaging] = useState<string>("");
  const [currency, setCurrency] = useState<string>("INR");
  const [language, setLanguage] = useState<string>("en");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState(false);

  // Base prices per kg in INR (hidden from UI)
  const basePrices = {
    "40-45mm": 14.5,
    "45mm+": 16.5,
    "50mm+": 17.5,
    "55mm+": 18.5,
  };

  // Packaging modifiers per kg in INR (hidden from UI)
  const packagingModifiers = {
    "5kg-red-mesh": 1.00,
    "10kg-red-mesh": 0.00,
    "18kg-red-mesh": -0.25,
    "20kg-red-mesh": -0.25,
  };

  // Currency symbols and formatting
  const currencySymbols = {
    INR: "₹",
    USD: "$",
    AED: "د.إ",
    SAR: "﷼",
    OMR: "ر.ع.",
    BHD: ".د.ب",
    QAR: "ر.ق",
    KWD: "د.ك",
    MYR: "RM",
  };

  // Language options based on currencies offered (removed Hindi and German)
  const languageOptions: LanguageOption[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
    { code: "ms", name: "Malay", nativeName: "Bahasa Melayu" },
  ];

  // Translations object (removed Hindi and German translations)
  const translations = {
    en: {
      title: "Onion Price Calculator",
      subtitle: "Get instant pricing for premium red onions based on your specifications",
      calculatePrice: "Calculate Your Price",
      onionSize: "Onion Size",
      packagingType: "Packaging Type",
      currency: "Currency",
      language: "Language",
      calculatedPrices: "Calculated Prices",
      pricePerKg: "Final Price per KG",
      pricePerTon: "Final Price per Ton",
      pricePerContainer: "Final Price per 29T Container",
      sendQuote: "Send Configuration to Zoko Group",
      selectSize: "Select onion size",
      selectPackaging: "Select packaging type",
      selectCurrency: "Select currency",
      selectLanguage: "Select language",
      loadingRates: "Loading exchange rates...",
      selectToCalculate: "Select onion size and packaging type to see calculated prices",
      lastUpdated: "Last updated: June 25, 2025",
      fobNote: "Note: Prices are FOB India and may change with freight, certification or destination port.",
      approximateNote: "Note: These are approximate rates, a variation of 5-10% should be considered. Actual prices will depend on realtime bank exchange rates."
    },
    ar: {
      title: "حاسبة أسعار البصل",
      subtitle: "احصل على تسعير فوري للبصل الأحمر المميز بناءً على مواصفاتك",
      calculatePrice: "احسب سعرك",
      onionSize: "حجم البصل",
      packagingType: "نوع التغليف",
      currency: "العملة",
      language: "اللغة",
      calculatedPrices: "الأسعار المحسوبة",
      pricePerKg: "السعر النهائي لكل كيلوغرام",
      pricePerTon: "السعر النهائي لكل طن",
      pricePerContainer: "السعر النهائي لحاوية 29 طن",
      sendQuote: "إرسال التكوين إلى مجموعة زوكو",
      selectSize: "اختر حجم البصل",
      selectPackaging: "اختر نوع التغليف",
      selectCurrency: "اختر العملة",
      selectLanguage: "اختر اللغة",
      loadingRates: "تحميل أسعار الصرف...",
      selectToCalculate: "اختر حجم البصل ونوع التغليف لرؤية الأسعار المحسوبة",
      lastUpdated: "آخر تحديث: 25 يونيو 2025",
      fobNote: "ملاحظة: الأسعار FOB الهند وقد تتغير مع الشحن أو الشهادات أو ميناء الوجهة.",
      approximateNote: "ملاحظة: هذه أسعار تقريبية، يجب النظر في تباين 5-10%. ستعتمد الأسعار الفعلية على أسعار صرف البنوك في الوقت الفعلي."
    },
    ms: {
      title: "Kalkulator Harga Bawang",
      subtitle: "Dapatkan harga segera untuk bawang merah premium berdasarkan spesifikasi anda",
      calculatePrice: "Kira Harga Anda",
      onionSize: "Saiz Bawang",
      packagingType: "Jenis Pembungkusan",
      currency: "Mata Wang",
      language: "Bahasa",
      calculatedPrices: "Harga Dikira",
      pricePerKg: "Harga Akhir Setiap KG",
      pricePerTon: "Harga Akhir Setiap Tan",
      pricePerContainer: "Harga Akhir Setiap Kontena 29T",
      sendQuote: "Hantar Konfigurasi kepada Kumpulan Zoko",
      selectSize: "Pilih saiz bawang",
      selectPackaging: "Pilih jenis pembungkusan",
      selectCurrency: "Pilih mata wang",
      selectLanguage: "Pilih bahasa",
      loadingRates: "Memuatkan kadar pertukaran...",
      selectToCalculate: "Pilih saiz bawang dan jenis pembungkusan untuk melihat harga dikira",
      lastUpdated: "Kemaskini terakhir: 25 Jun 2025",
      fobNote: "Nota: Harga adalah FOB India dan mungkin berubah dengan pengangkutan, pensijilan atau pelabuhan destinasi.",
      approximateNote: "Nota: Ini adalah kadar anggaran, variasi 5-10% harus dipertimbangkan. Harga sebenar bergantung pada kadar pertukaran bank masa nyata."
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        // Fallback rates (removed EUR)
        setExchangeRates({
          INR: 1,
          USD: 0.012,
          AED: 0.044,
          SAR: 0.045,
          OMR: 0.0046,
          BHD: 0.0045,
          QAR: 0.044,
          KWD: 0.0037,
          MYR: 0.053,
        });
      }
      setIsLoading(false);
    };

    fetchExchangeRates();
  }, []);

  const calculatePrice = () => {
    if (!onionSize || !packaging) return { perKg: 0, perTon: 0, perContainer: 0 };

    const basePrice = basePrices[onionSize as keyof typeof basePrices];
    const packagingModifier = packagingModifiers[packaging as keyof typeof packagingModifiers];
    
    // Calculate price per kg with packaging modifier
    const pricePerKg = basePrice + packagingModifier;
    
    // Add 15% margin
    const finalPricePerKg = pricePerKg * 1.15;
    
    // Convert to selected currency
    const exchangeRate = exchangeRates[currency] || 1;
    const convertedPricePerKg = finalPricePerKg * exchangeRate;
    
    // Calculate per ton (1000 kg) and per container (29 tons)
    const perKg = convertedPricePerKg;
    const perTon = convertedPricePerKg * 1000;
    const perContainer = convertedPricePerKg * 29000;
    
    return { perKg, perTon, perContainer };
  };

  const { perKg, perTon, perContainer } = calculatePrice();

  const formatCurrency = (amount: number, currencyCode: string) => {
    const symbol = currencySymbols[currencyCode as keyof typeof currencySymbols];
    return `${symbol}${amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  const generateWhatsAppMessage = () => {
    const sizeLabel = onionSize.replace('-', '–');
    const packagingLabel = packaging.replace('-', ' ').replace('kg', 'kg ').replace('mesh', 'Mesh Bag');
    
    const message = `Hi! I'm interested in getting a quote for red onions with the following specifications:

🧅 Onion Size: ${sizeLabel}
📦 Packaging: ${packagingLabel}
💰 Estimated Price: ${formatCurrency(perTon, currency)} per ton
📊 Container Price (29T): ${formatCurrency(perContainer, currency)}

Please provide me with a detailed quote including freight costs and delivery terms.

Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/919998694346?text=${encodedMessage}`;
  };

  const openWhatsApp = () => {
    if (onionSize && packaging) {
      window.open(generateWhatsAppMessage(), '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-turquoise-50">
      {/* Header */}
      <div className="w-full bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <img 
              src="/zoko-logo.png" 
              alt="Zoko Group of Companies" 
              className="h-16 w-auto"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-navy-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              {t.title.split(' ').slice(0, 2).join(' ')} <span className="text-navy-600">{t.title.split(' ').slice(2).join(' ')}</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-navy-600" />
                {t.calculatePrice}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Selection */}
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

              {/* Onion Size */}
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

              {/* Packaging Type */}
              <div className="space-y-2">
                <Label htmlFor="packaging" className="text-base font-medium">
                  {t.packagingType}
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
                  </SelectContent>
                </Select>
              </div>

              {/* Currency (removed EUR) */}
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-base font-medium">
                  {t.currency}
                </Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectCurrency} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (₹) - Indian Rupee</SelectItem>
                    <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
                    <SelectItem value="AED">AED (د.إ) - UAE Dirham</SelectItem>
                    <SelectItem value="SAR">SAR (﷼) - Saudi Riyal</SelectItem>
                    <SelectItem value="OMR">OMR (ر.ع.) - Omani Rial</SelectItem>
                    <SelectItem value="BHD">BHD (.د.ب) - Bahraini Dinar</SelectItem>
                    <SelectItem value="QAR">QAR (ر.ق) - Qatari Riyal</SelectItem>
                    <SelectItem value="KWD">KWD (د.ك) - Kuwaiti Dinar</SelectItem>
                    <SelectItem value="MYR">MYR (RM) - Malaysian Ringgit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isLoading && (
                <div className="text-center text-gray-500">
                  {t.loadingRates}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-lg bg-gradient-to-br from-navy-50 to-turquoise-50">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                {t.calculatedPrices}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {onionSize && packaging ? (
                <>
                  <div className="space-y-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t.pricePerKg}
                      </h3>
                      <p className="text-3xl font-bold text-green-600">
                        {formatCurrency(perKg, currency)}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t.pricePerTon}
                      </h3>
                      <p className="text-3xl font-bold text-navy-600">
                        {formatCurrency(perTon, currency)}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t.pricePerContainer}
                      </h3>
                      <p className="text-3xl font-bold text-turquoise-600">
                        {formatCurrency(perContainer, currency)}
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={openWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.sendQuote}
                  </Button>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p>{t.fobNote}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p>{t.approximateNote}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    {t.lastUpdated}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    {t.selectToCalculate}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-navy-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Pricing</h3>
            <p className="text-gray-600">Get instant price calculations based on current market rates</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-turquoise-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct Quote</h3>
            <p className="text-gray-600">Send your requirements directly via WhatsApp for quick response</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-language Support</h3>
            <p className="text-gray-600">Available in multiple languages for global accessibility</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
