
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { OnionSizeSelector } from "./OnionSizeSelector";  
import { PackagingSelector } from "./PackagingSelector";
import { CurrencySelector } from "./CurrencySelector";
import { ShippingPortSelector } from "./ShippingPortSelector";
import { QuantitySelector } from "./QuantitySelector";
import { OrderTimingSelector } from "./OrderTimingSelector";
import { IncotermsSelector } from "./IncotermsSelector";
import { PaymentTermsSelector } from "./PaymentTermsSelector";

interface PriceCalculatorFormProps {
  onionSize: string;
  setOnionSize: (value: string) => void;
  packaging: string;
  setPackaging: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  shippingPort: string;
  setShippingPort: (value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  orderTiming: string;
  setOrderTiming: (value: string) => void;
  incoterms: string;
  setIncoterms: (value: string) => void;
  paymentTerms: string;
  setPaymentTerms: (value: string) => void;
  isLoading: boolean;
  translations: any;
}

export const PriceCalculatorForm = ({
  onionSize,
  setOnionSize,
  packaging,
  setPackaging,
  currency,
  setCurrency,
  language,
  setLanguage,
  shippingPort,
  setShippingPort,
  quantity,
  setQuantity,
  orderTiming,
  setOrderTiming,
  incoterms,
  setIncoterms,
  paymentTerms,
  setPaymentTerms,
  isLoading,
  translations
}: PriceCalculatorFormProps) => {
  const t = translations;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-navy-600" />
          {t.calculatePrice}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <LanguageSelector language={language} setLanguage={setLanguage} t={t} />
        <OnionSizeSelector onionSize={onionSize} setOnionSize={setOnionSize} t={t} />
        <PackagingSelector packaging={packaging} setPackaging={setPackaging} t={t} />
        <CurrencySelector currency={currency} setCurrency={setCurrency} t={t} />
        <ShippingPortSelector shippingPort={shippingPort} setShippingPort={setShippingPort} t={t} />
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} t={t} />
        <OrderTimingSelector orderTiming={orderTiming} setOrderTiming={setOrderTiming} t={t} />
        <IncotermsSelector incoterms={incoterms} setIncoterms={setIncoterms} t={t} />
        <PaymentTermsSelector paymentTerms={paymentTerms} setPaymentTerms={setPaymentTerms} t={t} />

        {isLoading && (
          <div className="text-center text-gray-500">
            {t.loadingRates}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
