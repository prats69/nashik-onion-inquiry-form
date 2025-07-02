
interface MetaConversionPayload {
  fbc?: string;
  event_name: string;
  event_time: number;
  action_source: string;
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data: {
    content_type: string;
    content_name: string;
  };
}

class WhatsAppTracker {
  private fbclid: string | null = null;
  private isInitialized: boolean = false;

  constructor() {
    this.initializeTracking();
  }

  private initializeTracking() {
    if (this.isInitialized) return;
    
    try {
      // Extract fbclid from URL if present
      this.extractFbclid();
      
      // Wait for DOM to be ready, then attach listeners
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.attachListeners();
        });
      } else {
        this.attachListeners();
      }

      // Re-attach listeners when new content is added (for dynamic content)
      this.observeNewContent();
      
      this.isInitialized = true;
    } catch (error) {
      console.error('🎯 WhatsApp Tracker: Failed to initialize:', error);
    }
  }

  private extractFbclid() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      this.fbclid = urlParams.get('fbclid');
      
      if (this.fbclid) {
        console.log('🎯 WhatsApp Tracker: Facebook click ID captured:', this.fbclid);
      } else {
        console.log('🎯 WhatsApp Tracker: No Facebook click ID found in URL');
      }
    } catch (error) {
      console.error('🎯 WhatsApp Tracker: Error extracting fbclid:', error);
    }
  }

  private attachListeners() {
    try {
      // Find all links that contain wa.me (avoid onclick attributes to prevent CSP issues)
      const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
      
      console.log(`🎯 WhatsApp Tracker: Found ${whatsappLinks.length} WhatsApp buttons to track`);

      whatsappLinks.forEach((element, index) => {
        // Remove existing listeners to avoid duplicates
        const existingHandler = (element as any)._whatsappHandler;
        if (existingHandler) {
          element.removeEventListener('click', existingHandler);
        }
        
        // Create new handler
        const handler = (event: Event) => {
          console.log(`🎯 WhatsApp Tracker: WhatsApp button ${index + 1} clicked`);
          this.handleWhatsAppClick(event, element);
        };
        
        // Store handler reference and add listener
        (element as any)._whatsappHandler = handler;
        element.addEventListener('click', handler);
      });

      // Also check for dynamically created buttons (like in React components)
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const closestLink = target.closest('a[href*="wa.me"]');
        
        if (closestLink && !closestLink.hasAttribute('data-tracked')) {
          console.log('🎯 WhatsApp Tracker: Dynamic WhatsApp button clicked');
          closestLink.setAttribute('data-tracked', 'true');
          this.handleWhatsAppClick(event, closestLink);
        }
      });
    } catch (error) {
      console.error('🎯 WhatsApp Tracker: Error attaching listeners:', error);
    }
  }

  private observeNewContent() {
    try {
      // Use MutationObserver to detect when new WhatsApp buttons are added
      const observer = new MutationObserver((mutations) => {
        let hasNewWhatsAppButtons = false;
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                const whatsappButtons = element.querySelectorAll('a[href*="wa.me"]');
                if (whatsappButtons.length > 0) {
                  hasNewWhatsAppButtons = true;
                }
              }
            });
          }
        });

        if (hasNewWhatsAppButtons) {
          console.log('🎯 WhatsApp Tracker: New WhatsApp buttons detected, re-attaching listeners');
          setTimeout(() => this.attachListeners(), 100);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } catch (error) {
      console.error('🎯 WhatsApp Tracker: Error setting up content observer:', error);
    }
  }

  private async handleWhatsAppClick(event: Event, element: Element): Promise<void> {
    try {
      // Get the WhatsApp URL
      let whatsappUrl = '';
      if (element.tagName === 'A') {
        whatsappUrl = (element as HTMLAnchorElement).href;
      }

      // Prepare payload for Meta Conversions API
      const payload: MetaConversionPayload = {
        event_name: 'Contact',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: {
          client_ip_address: await this.getClientIP(),
          client_user_agent: navigator.userAgent,
        },
        custom_data: {
          content_type: 'contact',
          content_name: 'WhatsApp Button Click',
        },
      };

      // Add fbclid if available
      if (this.fbclid) {
        payload.fbc = this.fbclid;
        console.log('🎯 WhatsApp Tracker: Including Facebook click ID in payload');
      }

      console.log('🎯 WhatsApp Tracker: Sending conversion event to Meta:', payload);

      // Send to Meta Conversions API endpoint
      const response = await fetch('https://v0-capi-sigma.vercel.app/api/meta-capi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('🎯 WhatsApp Tracker: Successfully sent conversion event:', responseData);
      } else {
        console.error('🎯 WhatsApp Tracker: Failed to send conversion event:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('🎯 WhatsApp Tracker: Error sending conversion event:', error);
    }
  }

  private async getClientIP(): Promise<string | undefined> {
    try {
      // Try to get IP from a public API (optional, as server can also detect this)
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.log('🎯 WhatsApp Tracker: Could not fetch client IP, server will handle it');
      return undefined;
    }
  }
}

// Initialize the tracker when the module loads
let tracker: WhatsAppTracker | null = null;

export const initializeWhatsAppTracking = () => {
  try {
    if (!tracker) {
      tracker = new WhatsAppTracker();
      console.log('🎯 WhatsApp Tracker: Initialized successfully');
    }
  } catch (error) {
    console.error('🎯 WhatsApp Tracker: Failed to initialize:', error);
  }
};

// Auto-initialize when the module is imported
if (typeof window !== 'undefined') {
  initializeWhatsAppTracking();
}
