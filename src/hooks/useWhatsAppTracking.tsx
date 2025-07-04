
import { useState, useEffect } from 'react';

// Utility function to get cookie value
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// Generate unique event ID for deduplication
const generateEventId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const useWhatsAppTracking = () => {
  const [fbclid, setFbclid] = useState<string | null>(null);
  const [fbp, setFbp] = useState<string | null>(null);

  useEffect(() => {
    // Extract fbclid from URL
    const urlParams = new URLSearchParams(window.location.search);
    const extractedFbclid = urlParams.get('fbclid');
    if (extractedFbclid) {
      setFbclid(extractedFbclid);
      console.log('🎯 Facebook click ID captured:', extractedFbclid);
    }

    // Extract fbp from cookies
    const extractedFbp = getCookie('_fbp');
    if (extractedFbp) {
      setFbp(extractedFbp);
      console.log('🎯 Facebook browser ID captured:', extractedFbp);
    }
  }, []);

  const sendConversionEvent = async (eventName: string, customData: any = {}) => {
    const eventId = generateEventId();
    const timestamp = Math.floor(Date.now() / 1000);

    try {
      // 1. Fire Meta Pixel event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        console.log('🎯 Firing Meta Pixel Contact event with ID:', eventId);
        (window as any).fbq('track', 'Contact', customData, { eventID: eventId });
      } else {
        console.warn('🎯 Meta Pixel not loaded');
      }

      // 2. Send CAPI event
      const capiPayload = {
        event_name: 'Contact',
        event_id: eventId,
        event_time: timestamp,
        action_source: 'website',
        user_data: {
          client_user_agent: navigator.userAgent,
          ...(fbp && { fbp: fbp }),
          ...(fbclid && { fbc: fbclid }),
        },
        custom_data: {
          content_type: 'contact',
          content_name: eventName,
          url: window.location.href,
          ...customData
        },
        url: window.location.href,
        timestamp: timestamp
      };

      console.log('🎯 Sending CAPI Contact event:', capiPayload);

      const response = await fetch('https://v0-capi-sigma.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(capiPayload),
      });

      if (response.ok) {
        console.log('🎯 CAPI Contact event sent successfully');
      } else {
        console.error('🎯 Failed to send CAPI Contact event:', response.status);
      }
    } catch (error) {
      console.error('🎯 Error sending Contact conversion event:', error);
    }
  };

  return { fbclid, fbp, sendConversionEvent };
};
