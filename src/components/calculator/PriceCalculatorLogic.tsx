
import { useState, useEffect } from "react";

interface ExchangeRates {
  [key: string]: number;
}

export const usePriceCalculatorLogic = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState(false);

  const basePrices = {
    "40-45mm": 14.5,
    "45mm+": 16.5,
    "50mm+": 17.5,
    "55mm+": 18.5,
  };

  const packagingModifiers = {
    "5kg-red-mesh": 1.00,
    "10kg-red-mesh": 0.00,
    "18kg-red-mesh": -0.25,
    "20kg-red-mesh": -0.25,
    "25kg-jute": -0.25,
    "50kg-jute": -0.25,
  };

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
    IDR: "Rp",
    LKR: "₨",
    MVR: "ރ.",
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
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
          IDR: 0.18,
          LKR: 3.65,
          MVR: 0.18,
        });
      }
      setIsLoading(false);
    };

    fetchExchangeRates();
  }, []);

  const calculatePrice = (onionSize: string, packaging: string, currency: string) => {
    if (!onionSize || !packaging) return { perKg: 0, perTon: 0, perContainer: 0 };

    const basePrice = basePrices[onionSize as keyof typeof basePrices];
    const packagingModifier = packagingModifiers[packaging as keyof typeof packagingModifiers];
    
    const pricePerKg = basePrice + packagingModifier;
    const finalPricePerKg = pricePerKg * 1.15;
    
    const exchangeRate = exchangeRates[currency] || 1;
    const convertedPricePerKg = finalPricePerKg * exchangeRate;
    
    const perKg = convertedPricePerKg;
    const perTon = convertedPricePerKg * 1000;
    const perContainer = convertedPricePerKg * 29000;
    
    return { perKg, perTon, perContainer };
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    const symbol = currencySymbols[currencyCode as keyof typeof currencySymbols];
    return `${symbol}${amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  return {
    exchangeRates,
    isLoading,
    calculatePrice,
    formatCurrency,
    currencySymbols
  };
};
