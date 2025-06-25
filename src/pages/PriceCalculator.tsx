
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calculator, MessageCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ExchangeRates {
  [key: string]: number;
}

const PriceCalculator = () => {
  const [onionSize, setOnionSize] = useState<string>("");
  const [packaging, setPackaging] = useState<string>("");
  const [currency, setCurrency] = useState<string>("INR");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState(false);

  // Base prices per kg in INR
  const basePrices = {
    "40-45mm": 14.5,
    "45mm+": 16.5,
    "50mm+": 17.5,
    "55mm+": 18.5,
  };

  // Packaging modifiers per kg in INR
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
    EUR: "€",
    AED: "د.إ",
    SAR: "﷼",
    OMR: "ر.ع.",
    BHD: ".د.ب",
    QAR: "ر.ق",
    KWD: "د.ك",
    MYR: "RM",
  };

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      try {
        // Using a free exchange rate API (you can replace with a more reliable one)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        // Fallback rates
        setExchangeRates({
          INR: 1,
          USD: 0.012,
          EUR: 0.011,
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
    if (!onionSize || !packaging) return { perTon: 0, perContainer: 0 };

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
    const perTon = convertedPricePerKg * 1000;
    const perContainer = convertedPricePerKg * 29000;
    
    return { perTon, perContainer };
  };

  const { perTon, perContainer } = calculatePrice();

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
              Onion Price <span className="text-navy-600">Calculator</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant pricing for premium red onions based on your specifications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-navy-600" />
                Calculate Your Price
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Onion Size */}
              <div className="space-y-2">
                <Label htmlFor="onion-size" className="text-base font-medium">
                  Onion Size
                </Label>
                <Select value={onionSize} onValueChange={setOnionSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select onion size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="40-45mm">40–45mm (Base: ₹14.5/kg)</SelectItem>
                    <SelectItem value="45mm+">45mm+ (Base: ₹16.5/kg)</SelectItem>
                    <SelectItem value="50mm+">50mm+ (Base: ₹17.5/kg)</SelectItem>
                    <SelectItem value="55mm+">55mm+ (Base: ₹18.5/kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Packaging Type */}
              <div className="space-y-2">
                <Label htmlFor="packaging" className="text-base font-medium">
                  Packaging Type
                </Label>
                <Select value={packaging} onValueChange={setPackaging}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select packaging type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5kg-red-mesh">5kg Red Mesh Bag (+₹1.00/kg)</SelectItem>
                    <SelectItem value="10kg-red-mesh">10kg Red Mesh Bag (Base price)</SelectItem>
                    <SelectItem value="18kg-red-mesh">18kg Red Mesh Bag (–₹0.25/kg)</SelectItem>
                    <SelectItem value="20kg-red-mesh">20kg Red Mesh Bag (–₹0.25/kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-base font-medium">
                  Currency
                </Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (₹) - Indian Rupee</SelectItem>
                    <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
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
                  Loading exchange rates...
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-lg bg-gradient-to-br from-navy-50 to-turquoise-50">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                Calculated Prices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {onionSize && packaging ? (
                <>
                  <div className="space-y-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Final Price per Ton
                      </h3>
                      <p className="text-3xl font-bold text-navy-600">
                        {formatCurrency(perTon, currency)}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Final Price per 29T Container
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
                    Send Quote on WhatsApp
                  </Button>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 text-sm text-gray-600 cursor-help">
                          <Info className="w-4 h-4" />
                          <span>Important pricing information</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Prices are FOB India and may change with freight, certification or destination port.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="text-xs text-gray-500">
                    Last updated: December 25, 2024
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Select onion size and packaging type to see calculated prices
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
              <Info className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
            <p className="text-gray-600">Clear breakdown of costs with no hidden charges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
