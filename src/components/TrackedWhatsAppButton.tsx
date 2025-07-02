
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useWhatsAppTracking } from "@/hooks/useWhatsAppTracking";

interface TrackedWhatsAppButtonProps {
  children: React.ReactNode;
  eventName?: string;
  customData?: any;
  className?: string;
  whatsappUrl?: string;
}

export const TrackedWhatsAppButton = ({ 
  children, 
  eventName = 'Contact', 
  customData = {}, 
  className = "",
  whatsappUrl = "https://wa.me/919998694346"
}: TrackedWhatsAppButtonProps) => {
  const { sendConversionEvent } = useWhatsAppTracking();

  const handleClick = async () => {
    await sendConversionEvent(eventName, {
      content_type: 'contact',
      content_name: eventName,
      ...customData
    });
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button onClick={handleClick} className={className}>
      <MessageCircle className="w-4 h-4 mr-2" />
      {children}
    </Button>
  );
};
