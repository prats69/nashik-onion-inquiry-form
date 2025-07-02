
// Simple utility to extract fbclid from URL
export const getFbclid = (): string | null => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('fbclid');
  } catch (error) {
    console.error('Error extracting fbclid:', error);
    return null;
  }
};

// Send conversion event to Meta Conversions API
export const sendMetaConversionEvent = async (eventData: {
  event_name: string;
  content_type?: string;
  content_name?: string;
  value?: number;
  currency?: string;
  fbclid?: string | null;
}) => {
  try {
    const payload = {
      event_name: 'Contact',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        client_user_agent: navigator.userAgent,
      },
      custom_data: {
        content_type: eventData.content_type || 'contact',
        content_name: eventData.content_name || 'WhatsApp Contact',
        ...(eventData.value && { value: eventData.value }),
        ...(eventData.currency && { currency: eventData.currency }),
      },
      ...(eventData.fbclid && { fbc: eventData.fbclid }),
    };

    console.log('🎯 Meta Conversion: Sending event:', payload);

    const response = await fetch('https://v0-capi-sigma.vercel.app/api/meta-capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('🎯 Meta Conversion: Event sent successfully');
      return true;
    } else {
      console.error('🎯 Meta Conversion: Failed to send event');
      return false;
    }
  } catch (error) {
    console.error('🎯 Meta Conversion: Error sending event:', error);
    return false;
  }
};
