
import { useState, useEffect } from 'react';

export const useWhatsAppTracking = () => {
  const [fbclid, setFbclid] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const extractedFbclid = urlParams.get('fbclid');
    if (extractedFbclid) {
      setFbclid(extractedFbclid);
      console.log('🎯 Facebook click ID captured:', extractedFbclid);
    }
  }, []);

  const sendConversionEvent = async (eventName: string, customData: any = {}) => {
    try {
      const payload = {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: {
          client_user_agent: navigator.userAgent,
        },
        custom_data: customData,
        ...(fbclid && { fbc: fbclid }),
      };

      console.log(`🎯 Sending ${eventName} conversion event:`, payload);

      const response = await fetch('https://v0-capi-sigma.vercel.app/api/meta-capi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log(`🎯 ${eventName} conversion event sent successfully`);
      } else {
        console.error(`🎯 Failed to send ${eventName} conversion event`);
      }
    } catch (error) {
      console.error(`🎯 Error sending ${eventName} conversion event:`, error);
    }
  };

  return { fbclid, sendConversionEvent };
};
