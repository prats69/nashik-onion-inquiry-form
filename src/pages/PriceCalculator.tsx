
import { useState, useEffect } from "react";
import { Calculator, MessageCircle, Info, Globe } from "lucide-react";
import { PriceCalculatorForm } from "@/components/calculator/PriceCalculatorForm";
import { PriceResults } from "@/components/calculator/PriceResults";

interface ExchangeRates {
  [key: string]: number;
}

const PriceCalculator = () => {
  const [onionSize, setOnionSize] = useState<string>("");
  const [packaging, setPackaging] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [language, setLanguage] = useState<string>("en");
  const [shippingPort, setShippingPort] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [orderTiming, setOrderTiming] = useState<string>("");
  const [incoterms, setIncoterms] = useState<string>("");
  const [paymentTerms, setPaymentTerms] = useState<string>("");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Base prices per kg in INR (hidden from UI)
  const basePrices = {
    "40-45mm": 14.5,
    "45mm+": 16.5,
    "50mm+": 17.5,
    "55mm+": 18.5,
  };

  // Updated packaging modifiers to include jute bags
  const packagingModifiers = {
    "5kg-red-mesh": 1.00,
    "10kg-red-mesh": 0.00,
    "18kg-red-mesh": -0.25,
    "20kg-red-mesh": -0.25,
    "25kg-jute": -0.25,  // Same as 20kg red mesh
    "50kg-jute": -0.25,  // Same as 20kg red mesh
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
    IDR: "Rp",
    LKR: "₨",
    MVR: "ރ.",
  };

  // Translations object
  const translations = {
    en: {
      title: "Onion Price Calculator",
      subtitle: "Get instant pricing for premium red onions based on your specifications",
      calculatePrice: "Calculate Your Price",
      onionSize: "Onion Size",
      packagingType: "Packaging Type",
      currency: "Currency",
      language: "Language",
      shippingPort: "Preferred Shipping Port",
      quantity: "Quantity Required",
      orderTiming: "Order Timing",
      incoterms: "Incoterms",
      paymentTerms: "Payment Terms",
      calculatedPrices: "Calculated Prices",
      pricePerKg: "Final Price per KG",
      pricePerTon: "Final Price per Ton",
      pricePerContainer: "Final Price per 29T Container",
      sendQuote: "Get Final Quote on WhatsApp",
      selectSize: "Select onion size",
      selectPackaging: "Select packaging type",
      selectCurrency: "Select currency",
      selectLanguage: "Select language",
      selectPort: "Select preferred port",
      selectQuantity: "Select quantity",
      selectTiming: "Select order timing",
      selectIncoterms: "Select incoterms",
      selectPaymentTerms: "Select payment terms",
      loadingRates: "Loading exchange rates...",
      selectToCalculate: "Select onion size, packaging type, and payment terms to see calculated prices",
      lastUpdated: "Last updated: 30th June 2025",
      fobNote: "Note: Prices are EXW India and may change with freight, certification or destination port.",
      approximateNote: "Note: These are approximate rates, a variation of upto 5% should be considered. Actual prices will depend on realtime bank exchange rates.",
      calculatePricing: "Calculate Pricing",
      fillAllFields: "Please fill all required fields to calculate pricing",
      creditPaymentNote: "We don't accept payment after delivery. Please select a different payment term."
    },
    ar: {
      title: "حاسبة أسعار البصل",
      subtitle: "احصل على تسعير فوري للبصل الأحمر المميز بناءً على مواصفاتك",
      calculatePrice: "احسب سعرك",
      onionSize: "حجم البصل",
      packagingType: "نوع التغليف",
      currency: "العملة",
      language: "اللغة",
      shippingPort: "ميناء الشحن المفضل",
      quantity: "الكمية المطلوبة",
      orderTiming: "توقيت الطلب",
      incoterms: "شروط التجارة الدولية",
      paymentTerms: "شروط الدفع",
      calculatedPrices: "الأسعار المحسوبة",
      pricePerKg: "السعر النهائي لكل كيلوغرام",
      pricePerTon: "السعر النهائي لكل طن",
      pricePerContainer: "السعر النهائي لحاوية 29 طن",
      sendQuote: "احصل على عرض أسعار نهائي عبر واتساب",
      selectSize: "اختر حجم البصل",
      selectPackaging: "اختر نوع التغليف",
      selectCurrency: "اختر العملة",
      selectLanguage: "اختر اللغة",
      selectPort: "اختر الميناء المفضل",
      selectQuantity: "اختر الكمية",
      selectTiming: "اختر توقيت الطلب",
      selectIncoterms: "اختر شروط التجارة",
      selectPaymentTerms: "اختر شروط الدفع",
      loadingRates: "تحميل أسعار الصرف...",
      selectToCalculate: "اختر حجم البصل ونوع التغليف وشروط الدفع لرؤية الأسعار المحسوبة",
      lastUpdated: "آخر تحديث: 30 يونيو 2025",
      fobNote: "ملاحظة: الأسعار EXW الهند وقد تتغير مع الشحن أو الشهادات أو ميناء الوجهة.",
      approximateNote: "ملاحظة: هذه أسعار تقريبية، يجب النظر في تباين يصل إلى 5%. ستعتمد الأسعار الفعلية على أسعار صرف البنوك في الوقت الفعلي.",
      calculatePricing: "احسب التسعير",
      fillAllFields: "يرجى ملء جميع الحقول المطلوبة لحساب التسعير",
      creditPaymentNote: "نحن لا نقبل الدفع بعد التسليم. يرجى اختيار شرط دفع مختلف."
    },
    ms: {
      title: "Kalkulator Harga Bawang",
      subtitle: "Dapatkan harga segera untuk bawang merah premium berdasarkan spesifikasi anda",
      calculatePrice: "Kira Harga Anda",
      onionSize: "Saiz Bawang",
      packagingType: "Jenis Pembungkusan",
      currency: "Mata Wang",
      language: "Bahasa",
      shippingPort: "Pelabuhan Penghantaran Pilihan",
      quantity: "Kuantiti Diperlukan",
      orderTiming: "Masa Tempahan",
      incoterms: "Terma Perdagangan Antarabangsa",
      paymentTerms: "Terma Pembayaran",
      calculatedPrices: "Harga Dikira",
      pricePerKg: "Harga Akhir Setiap KG",
      pricePerTon: "Harga Akhir Setiap Tan",
      pricePerContainer: "Harga Akhir Setiap Kontena 29T",
      sendQuote: "Dapatkan Sebut Harga Akhir di WhatsApp",
      selectSize: "Pilih saiz bawang",
      selectPackaging: "Pilih jenis pembungkusan",
      selectCurrency: "Pilih mata wang",
      selectLanguage: "Pilih bahasa",
      selectPort: "Pilih pelabuhan pilihan",
      selectQuantity: "Pilih kuantiti",
      selectTiming: "Pilih masa tempahan",
      selectIncoterms: "Pilih terma perdagangan",
      selectPaymentTerms: "Pilih terma pembayaran",
      loadingRates: "Memuatkan kadar pertukaran...",
      selectToCalculate: "Pilih saiz bawang, jenis pembungkusan dan terma pembayaran untuk melihat harga dikira",
      lastUpdated: "Kemaskini terakhir: 30 Jun 2025",
      fobNote: "Nota: Harga adalah EXW India dan mungkin berubah dengan pengangkutan, pensijilan atau pelabuhan destinasi.",
      approximateNote: "Nota: Ini adalah kadar anggaran, variasi sehingga 5% harus dipertimbangkan. Harga sebenar bergantung pada kadar pertukaran bank masa nyata.",
      calculatePricing: "Kira Harga",
      fillAllFields: "Sila isi semua medan yang diperlukan untuk mengira harga",
      creditPaymentNote: "Kami tidak menerima pembayaran selepas pengiriman. Sila pilih terma pembayaran yang berbeza."
    },
    id: {
      title: "Kalkulator Harga Bawang",
      subtitle: "Dapatkan harga instan untuk bawang merah premium berdasarkan spesifikasi Anda",
      calculatePrice: "Hitung Harga Anda",
      onionSize: "Ukuran Bawang",
      packagingType: "Jenis Kemasan",
      currency: "Mata Uang",
      language: "Bahasa",
      shippingPort: "Pelabuhan Pengiriman Pilihan",
      quantity: "Kuantitas Diperlukan",
      orderTiming: "Waktu Pemesanan",
      incoterms: "Incoterms",
      paymentTerms: "Syarat Pembayaran",
      calculatedPrices: "Harga Terhitung",
      pricePerKg: "Harga Akhir per KG",
      pricePerTon: "Harga Akhir per Ton",
      pricePerContainer: "Harga Akhir per Kontainer 29T",
      sendQuote: "Dapatkan Penawaran Akhir di WhatsApp",
      selectSize: "Pilih ukuran bawang",
      selectPackaging: "Pilih jenis kemasan",
      selectCurrency: "Pilih mata uang",
      selectLanguage: "Pilih bahasa",
      selectPort: "Pilih pelabuhan pilihan",
      selectQuantity: "Pilih kuantitas",
      selectTiming: "Pilih waktu pemesanan",
      selectIncoterms: "Pilih incoterms",
      selectPaymentTerms: "Pilih syarat pembayaran",
      loadingRates: "Memuat nilai tukar...",
      selectToCalculate: "Pilih ukuran bawang, jenis kemasan dan syarat pembayaran untuk melihat harga terhitung",
      lastUpdated: "Terakhir diperbarui: 30 Juni 2025",
      fobNote: "Catatan: Harga adalah EXW India dan dapat berubah dengan freight, sertifikasi atau pelabuhan tujuan.",
      approximateNote: "Catatan: Ini adalah tarif perkiraan, variasi hingga 5% harus dipertimbangkan. Harga aktual akan tergantung pada nilai tukar bank real-time.",
      calculatePricing: "Hitung Harga",
      fillAllFields: "Harap isi semua bidang yang diperlukan untuk menghitung harga",
      creditPaymentNote: "Kami tidak menerima pembayaran setelah pengiriman. Silakan pilih syarat pembayaran yang berbeda."
    },
    si: {
      title: "ළූණු මිල ගණකය",
      subtitle: "ඔබේ විශේෂාංග මත පදනම්ව උසස් තත්ත්වයේ රතු මූණු සඳහා ක්ෂණික මිල ගණන් ලබා ගන්න",
      calculatePrice: "ඔබේ මිල ගණනය කරන්න",
      onionSize: "ළූණු ප්‍රමාණය",
      packagingType: "ඇසුරුම් වර්ගය",
      currency: "මුදල්",
      language: "භාෂාව",
      shippingPort: "කැමති නැව් වරාය",
      quantity: "අවශ්‍ය ප්‍රමාණය",
      orderTiming: "ඇණවුම් කාලය",
      incoterms: "ඉන්කෝටර්ම්ස්",
      paymentTerms: "ගෙවීම් කොන්දේසි",
      calculatedPrices: "ගණනය කළ මිල",
      pricePerKg: "කිලෝ එකට අවසාන මිල",
      pricePerTon: "ටනයකට අවසාන මිල",
      pricePerContainer: "ටන් 29 කන්ටේනරයකට අවසාන මිල",
      sendQuote: "WhatsApp හි අවසාන මිල ගණන් ලබා ගන්න",
      selectSize: "ළූණු ප්‍රමාණය තෝරන්න",
      selectPackaging: "ඇසුරුම් වර්ගය තෝරන්න",
      selectCurrency: "මුදල් තෝරන්න",
      selectLanguage: "භාෂාව තෝරන්න",
      selectPort: "කැමති වරාය තෝරන්න",
      selectQuantity: "ප්‍රමාණය තෝරන්න",
      selectTiming: "ඇණවුම් කාලය තෝරන්න",
      selectIncoterms: "ඉන්කෝටර්ම්ස් තෝරන්න",
      selectPaymentTerms: "ගෙවීම් කොන්දේසි තෝරන්න",
      loadingRates: "විනිමය අනුපාත පූරණය කරමින්...",
      selectToCalculate: "ගණනය කළ මිල බැලීමට ළූණු ප්‍රමාණය, ඇසුරුම් වර්ගය සහ ගෙවීම් කොන්දේසි තෝරන්න",
      lastUpdated: "අවසන් වරට යාවත්කාලීන කරන ලද්දේ: ජුනි 30, 2025",
      fobNote: "සටහන: මිල EXW ඉන්දියාව වන අතර ප්‍රවාහනය, සහතිකය හෝ ගමනාන්ත වරාය සමඟ වෙනස් විය හැක.",
      approximateNote: "සටහන: මේවා ආසන්න වශයෙන් අනුපාත වන අතර, 5% දක්වා වෙනසක් සලකා බැලිය යුතුය. නියම මිල තත්‍ය කාල බැංකු විනිමය අනුපාත මත රඳා පවතී.",
      calculatePricing: "මිල ගණනය කරන්න",
      fillAllFields: "මිල ගණනය කිරීමට අවශ්‍ය සියලුම ක්ෂේත්‍ර පුරවන්න",
      creditPaymentNote: "අපි බෙදා හරින පසු ගෙවීම් පිළිගන්නේ නැත. කරුණාකර වෙනත් ගෙවීම් කොන්දේසියක් තෝරන්න."
    },
    dv: {
      title: "ބަސްއަޅާގެ ޕްރައިސް ކެލްކްއުލޭޓަރ",
      subtitle: "ތިޔާގެ ސްޕޮސިފިކޭޝަން މަތިން ޕްރީމިއަމް ރަތް ބަސްއަޅާއަށް ވަގުތުން ޕްރައިސް ހޯދާ",
      calculatePrice: "ތިޔާގެ ޕްރައިސް ކެލްކްއުލޭޓް ކުރާ",
      onionSize: "ބަސްއަޅާގެ ސައިޒް",
      packagingType: "ޕެކޭޖިންގ ވާރު",
      currency: "ފައިސާ",
      language: "ބަސް",
      shippingPort: "ވަޑައިގަންނަ ޕޯޓް",
      quantity: "ޚަރދުކުރާ މިންޒަތް",
      orderTiming: "އޯޑަރު ވައިޚަތު",
      incoterms: "އި​ންކޯޓާމްސް",
      paymentTerms: "ފައިސާ އަދާކުރުމުގެ ޝަރުތު",
      calculatedPrices: "ކެލްކްއުލޭޓް ކުރެވިފައިވާ ޕްރައިސް",
      pricePerKg: "ކިލޯއަށް ފައިނަލް ޕްރައިސް",
      pricePerTon: "ޓަނަށް ފައިނަލް ޕްރައިސް",
      pricePerContainer: "29 ޓަން ކޮންޓޭނަރަށް ފައިނަލް ޕްރައިސް",
      sendQuote: "WhatsApp ގައި ފައިނަލް ކޯޓް ހޯދާ",
      selectSize: "ބަސްއަޅާގެ ސައިޒް ޚޮއްސާ",
      selectPackaging: "ޕެކޭޖިންގ ވާރު ޚޮއްސާ",
      selectCurrency: "ފައިސާ ޚޮއްސާ",
      selectLanguage: "ބަސް ޚޮއްސާ",
      selectPort: "ވަޑައިގަންނަ ޕޯޓް ޚޮއްސާ",
      selectQuantity: "މިންޒަތް ޚޮއްސާ",
      selectTiming: "އޯޑަރު ވައިޚަތު ޚޮއްސާ",
      selectIncoterms: "އި​ންކޯޓާމްސް ޚޮއްސާ",
      selectPaymentTerms: "ފައިސާ އަދާކުރުމުގެ ޝަރުތު ޚޮއްސާ",
      loadingRates: "އެކްސްޗެއިންޖް ރޭޓް ލޯޑް ކުރަމުން...",
      selectToCalculate: "ކެލްކްއުލޭޓް ކުރެވިފައިވާ ޕްރައިސް ބެލުމަށް ބަސްއަޅާގެ ސައިޒް، ޕެކޭޖިންގ ވާރު އަދި ފައިސާ އަދާކުރުމުގެ ޝަރުތު ޚޮއްސާ",
      lastUpdated: "އެންމެ ފަހުން އަޕްޑޭޓް ކުރެވުނު: ޖުން 30، 2025",
      fobNote: "ނޯޓް: ޕްރައިސް އަކީ EXW އިންޑިޔާ އަދި ފްރެއިޓް، ސެޓިފިކޭޝަން ނުވަތަ ޑެސްޓިނޭޝަން ޕޯޓާ އެކު ބަދަލުވެދާނެ ޕްރައިސެއް",
      approximateNote: "ނޯޓް: މި އަކީ އަޕްރޮކްސިމޭޓް ރޭޓްތައް، 5% އަށް ޤަރީބުވާ ވެރިއޭޝަނެއް ކޮންސިޑަރު ކުރަން ޖެހޭ. އަސްލު ޕްރައިސް ބޭނުންވަނީ ރިއަލް ޓައިމް ބޭންކް އެކްސްޗެއިންޖް ރޭޓް މައްޗަށް",
      calculatePricing: "ޕްރައިސް ކެލްކްއުލޭޓް ކުރާ",
      fillAllFields: "ޕްރައިސް ކެލްކްއުލޭޓް ކުރުމަށް ޖަހާ ފީލްޑް ފުރާ",
      creditPaymentNote: "އަހަރެމެން ޑެލިވަރީ ކޮށްގެން ފައިސާ ނާނގޭ. ދެނެއް ޕޭމަންޓް ޓާމް ޚޮއްސާ."
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
    const packagingLabel = packaging.replace('-', ' ').replace('kg', 'kg ').replace('mesh', 'Mesh Bag').replace('jute', 'Jute Bag');
    const quantityLabel = quantity;
    const timingLabel = orderTiming;
    const incotermsLabel = incoterms?.toUpperCase();
    const paymentLabel = paymentTerms;
    
    const message = `Hi! 👋 I'm interested in getting a quote for red onions with the following specifications:

🧅 Onion Size: ${sizeLabel}
📦 Packaging: ${packagingLabel}
💰 Estimated Price: ${formatCurrency(perTon, currency)} per ton
📊 Container Price (29T): ${formatCurrency(perContainer, currency)}
📈 Quantity Required: ${quantityLabel} containers
⏱️ Order Timing: ${timingLabel}
🚢 Preferred Port: ${shippingPort || 'To be discussed'}
📋 Incoterms: ${incotermsLabel || 'To be discussed'}
💳 Payment Terms: ${paymentLabel || 'To be discussed'}

Please provide me with a detailed quote including freight costs and delivery terms.

Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/919998694346?text=${encodedMessage}`;
  };

  const openWhatsApp = () => {
    if (onionSize && packaging && paymentTerms && paymentTerms !== "credit") {
      window.open(generateWhatsAppMessage(), '_blank');
    }
  };

  const handleCalculatePricing = () => {
    if (onionSize && packaging && currency && shippingPort && quantity && orderTiming && incoterms && paymentTerms) {
      setShowResults(true);
      // Scroll to results section
      setTimeout(() => {
        const resultsElement = document.getElementById('price-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      alert(t.fillAllFields);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-turquoise-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <PriceCalculatorForm
            onionSize={onionSize}
            setOnionSize={setOnionSize}
            packaging={packaging}
            setPackaging={setPackaging}
            currency={currency}
            setCurrency={setCurrency}
            language={language}
            setLanguage={setLanguage}
            shippingPort={shippingPort}
            setShippingPort={setShippingPort}
            quantity={quantity}
            setQuantity={setQuantity}
            orderTiming={orderTiming}
            setOrderTiming={setOrderTiming}
            incoterms={incoterms}
            setIncoterms={setIncoterms}
            paymentTerms={paymentTerms}
            setPaymentTerms={setPaymentTerms}
            isLoading={isLoading}
            translations={t}
            onCalculate={handleCalculatePricing}
          />

          {/* Results */}
          {showResults && (
            <div id="price-results">
              {paymentTerms === "credit" ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-red-800">Payment Terms Notice</h3>
                  </div>
                  <p className="text-red-700">
                    {t.creditPaymentNote}
                  </p>
                </div>
              ) : (
                <PriceResults
                  onionSize={onionSize}
                  packaging={packaging}
                  paymentTerms={paymentTerms}
                  perKg={perKg}
                  perTon={perTon}
                  perContainer={perContainer}
                  currency={currency}
                  formatCurrency={formatCurrency}
                  openWhatsApp={openWhatsApp}
                  translations={t}
                />
              )}
            </div>
          )}
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
