
export const generateWhatsAppMessage = (
  onionSize: string,
  packaging: string,
  quantity: string,
  orderTiming: string,
  incoterms: string,
  paymentTerms: string,
  shippingPort: string,
  perTon: number,
  perContainer: number,
  currency: string,
  formatCurrency: (amount: number, currencyCode: string) => string
) => {
  const sizeLabel = onionSize.replace('-', '–');
  const packagingLabel = packaging.replace('-', ' ').replace('kg', 'kg ').replace('mesh', 'Mesh Bag').replace('jute', 'Jute Bag');
  
  const message = `Hi! 👋 I'm interested in getting a quote for red onions with the following specifications:

🧅 Onion Size: ${sizeLabel}
📦 Packaging: ${packagingLabel}
💰 Estimated Price: ${formatCurrency(perTon, currency)} per ton
📊 Container Price (29T): ${formatCurrency(perContainer, currency)}
📈 Quantity Required: ${quantity} containers
⏱️ Order Timing: ${orderTiming}
🚢 Preferred Port: ${shippingPort || 'To be discussed'}
📋 Incoterms: ${incoterms?.toUpperCase() || 'To be discussed'}
💳 Payment Terms: ${paymentTerms || 'To be discussed'}

Please provide me with a detailed quote including freight costs and delivery terms.

Thank you! 🙏`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/919998694346?text=${encodedMessage}`;
};
