
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, MessageCircle, Info } from "lucide-react";

interface PriceResultsProps {
  onionSize: string;
  packaging: string;
  paymentTerms: string;
  perKg: number;
  perTon: number;
  perContainer: number;
  currency: string;
  formatCurrency: (amount: number, currencyCode: string) => string;
  openWhatsApp: () => void;
  translations: any;
}

export const PriceResults = ({
  onionSize,
  packaging,
  paymentTerms,
  perKg,
  perTon,
  perContainer,
  currency,
  formatCurrency,
  openWhatsApp,
  translations
}: PriceResultsProps) => {
  const t = translations;

  return (
    <Card className="shadow-lg bg-gradient-to-br from-navy-50 to-turquoise-50">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900">
          {t.calculatedPrices}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {paymentTerms === "credit" ? (
          <div className="text-center py-12">
            <Info className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-600 text-lg font-semibold mb-2">
              Payment After Delivery Not Accepted
            </p>
            <p className="text-gray-600">
              We do not accept payment after delivery terms. Please select a different payment option to view pricing.
            </p>
          </div>
        ) : onionSize && packaging && paymentTerms ? (
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
  );
};
