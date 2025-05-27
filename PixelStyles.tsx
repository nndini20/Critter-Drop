import React, { useEffect } from "react";

export const PixelStyles: React.FC = () => {
  useEffect(() => {
    // Add Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=IBM+Plex+Mono:wght@400;500&display=swap';
    document.head.appendChild(fontLink);

    return () => {
      try {
        document.head.removeChild(fontLink);
      } catch (e) {
        console.warn('Could not remove Google Fonts link');
      }
    };
  }, []);

  return null;
};