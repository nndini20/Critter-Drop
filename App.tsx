
import React, { useState, useEffect } from "react";
import { VendingMachine } from "./components/VendingMachine";
import { CritterTable } from "./components/CritterTable";
import "./styles/app.css";
import "./styles/pixel-effects.css";
import { Suspense } from 'react';

const StaticNoise: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Animate the noise by changing position
    const interval = setInterval(() => {
      setPosition({
        x: Math.floor(Math.random() * 3) - 1, // -1, 0, or 1
        y: Math.floor(Math.random() * 3) - 1  // -1, 0, or 1
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full h-full" 
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, transparent 2px), 
                         repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, transparent 2px)`,
        backgroundSize: '2px 2px',
        transform: `translate(${position.x}px, ${position.y}px)`
      }}>
    </div>
  );
};

// Pixel art star decoration
const PixelStar: React.FC<{ index: number }> = ({
  index,
}) => {
  const topPosition = React.useMemo(
    () => Math.floor(Math.random() * 100),
    [],
  );
  const leftPosition = React.useMemo(
    () => Math.floor(Math.random() * 100),
    [],
  );
  const animationDuration = React.useMemo(
    () => 2 + Math.random() * 3,
    [],
  );
  const animationDelay = React.useMemo(() => Math.random(), []);
  const size = React.useMemo(
    () => 2 + Math.floor(Math.random() * 2),
    [],
  );

  return (
    <div
      className="absolute bg-white pixel-art"
      style={{
        top: `${topPosition}%`,
        left: `${leftPosition}%`,
        width: `${size}px`,
        height: `${size}px`,
        animation: `pixel-shine ${animationDuration}s infinite ${animationDelay}s`,
      }}
    />
  );
};

// Orientation detection component
const OrientationMessage = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  
  useEffect(() => {
    // Check if we're on mobile and in portrait mode
    const checkOrientation = () => {
      if (window.innerWidth < 768) {
        setIsPortrait(window.innerHeight > window.innerWidth);
      } else {
        setIsPortrait(false);
      }
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);
  
  if (!isPortrait) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center text-center p-6 landscape:hidden">
      <div className="animate-float p-4 bg-[#1A2B3C] border-4 border-[#4C8DAF] rounded-md max-w-xs">
        <h3 style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[#76D6FF] text-sm mb-3">For Best Experience</h3>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-white text-xs mb-4">Rotate your device to landscape mode</p>
        <div className="mx-auto w-16 h-16 relative">
          <div className="absolute w-12 h-8 border-2 border-[#76D6FF] rounded-sm animate-pulse"></div>
          <div className="absolute w-4 h-4 right-1 top-6 border-2 border-[#76D6FF] rounded-full"></div>
          <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '3s' }}>
            <div className="w-10 h-10 border-2 border-[#f7daec] border-t-transparent rounded-full mx-auto mt-3"></div>
          </div>
        </div>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[#f8c9ae] text-xs mt-4">Tap to continue anyway</p>
      </div>
    </div>
  );
};

export default function App() {
  const [skipOrientationCheck, setSkipOrientationCheck] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  // Load fonts directly in the component
  useEffect(() => {
    // Add font-face styles directly to document
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Press Start 2P';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(data:font/woff2;base64,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) format('woff2');
      }
      
      @font-face {
        font-family: 'IBM Plex Mono';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(data:font/woff2;base64,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) format('woff2');
      }
    `;
    
    document.head.appendChild(style);
    
    // Set fonts loaded
    setFontsLoaded(true);
    
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1A2B3C] relative overflow-hidden touch-manipulation">
      {/* Orientation message for mobile */}
      {!skipOrientationCheck && (
        <div onClick={() => setSkipOrientationCheck(true)}>
          <OrientationMessage />
        </div>
      )}
      
      {/* Arcade cabinet frame */}
      <div className="w-full h-full flex flex-col">
        {/* Arcade cabinet top section with marquee */}
        <div className="bg-[#0A1525] h-12 sm:h-16 md:h-20 w-full border-b-2 sm:border-b-4 border-[#4C8DAF] relative z-10 flex items-center justify-center">
          <div className="relative bg-[#724a73] w-[90%] max-w-4xl h-10 sm:h-12 md:h-16 border-2 sm:border-4 border-[#1A2B3C] shadow-lg flex items-center justify-center overflow-hidden">
            {/* Light decorations */}
            <div className="absolute top-0 left-2 sm:left-4 w-2 sm:w-3 h-2 sm:h-3 bg-[#f8c9ae] rounded-full animate-pulse"></div>
            <div className="absolute top-0 right-2 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 bg-[#f8c9ae] rounded-full animate-pulse delay-300"></div>
            
            {/* Title */}
            <h1 className="text-base sm:text-xl md:text-2xl" style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[#f7daec] text-center drop-shadow-md relative z-10">
              CritterDrop
            </h1>
            
            {/* Pattern behind text */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #f7daec 25%, transparent 25%), 
                  linear-gradient(-45deg, #f7daec 25%, transparent 25%), 
                  linear-gradient(45deg, transparent 75%, #f7daec 75%), 
                  linear-gradient(-45deg, transparent 75%, #f7daec 75%)
                `,
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
              }}
            />
          </div>
        </div>
        
        {/* Main arcade screen area - scrollable on mobile */}
        <div className="flex-1 bg-[#7BA3C9] p-2 sm:p-4 flex flex-col items-center relative overflow-y-auto">
          {/* CRT scanline effect - direct element instead of pseudo-element */}
          <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-30">
            <div className="w-full h-full" 
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1) 50%, transparent 100%)`,
                backgroundSize: '100% 4px'
              }}>
            </div>
          </div>
          
          {/* CRT screen curvature effect */}
          <div className="fixed inset-0 pointer-events-none z-[2] opacity-20"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.3) 100%)'
            }}>
          </div>
          
          {/* Background pattern - pixel grid */}
          <div className="fixed inset-0 bg-[#1A2B3C] opacity-5 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(#76D6FF 1px, transparent 1px), 
                linear-gradient(90deg, #76D6FF 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Star decorations */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {Array(24)
              .fill(0)
              .map((_, i) => (
                <PixelStar key={i} index={i} />
              ))}
          </div>
          
          {/* Instructions */}
          <div className="mt-2 sm:mt-4 mb-3 sm:mb-6 bg-[#1A2B3C] px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm border-2 border-[#0A1525] shadow-md max-w-lg text-center relative z-10 w-[90%] sm:w-auto">
            <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="font-bold text-xs sm:text-sm text-[#76D6FF]">
              SELECT A CODE AND COLLECT YOUR CRITTER
            </p>
            <div className="mt-1 h-px bg-[#4C8DAF] w-3/4 mx-auto opacity-50"></div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="mt-1 text-[10px] sm:text-xs text-white">
              CREDIT: 1 COIN = 1 CRITTER
            </p>
          </div>

          {/* Game content container */}
          <div className="w-[95%] sm:w-full max-w-6xl mx-auto bg-[#0A1525] p-3 sm:p-4 md:p-8 rounded-md border-2 sm:border-4 border-[#1A2B3C] shadow-xl relative z-10">
            {/* Static noise effect - with safe animation */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
              {/* Instead of CSS animation, we use React state for animation */}
              <StaticNoise />
            </div>
            
            {/* Main Content - Better layout for mobile */}
            <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-16">
              {/* Vending Machine */}
              <div className="relative w-full max-w-[350px] mx-auto">
                {/* Arcade spotlight effect */}
                <div className="absolute -top-4 sm:-top-8 left-1/2 -translate-x-1/2 w-24 sm:w-40 h-1 bg-[#76D6FF] opacity-30 blur-md rounded-full"></div>
                
                <VendingMachine />
              </div>
              
              {/* Collection guide - horizontal scrolling on mobile */}
              <div className="w-full overflow-x-auto pb-2 lg:pb-0 lg:overflow-visible">
                <div className="flex flex-row lg:flex-col items-start lg:items-center min-w-[500px] lg:min-w-0 px-2 sm:px-0">
                  {/* "How To Play" section */}
                  <div className="w-[200px] sm:w-[210px] mr-6 lg:mr-0 lg:mb-6 bg-[#2B4C6F] border-2 sm:border-4 border-[#1A2B3C] rounded-sm overflow-hidden shrink-0">
                    <div className="bg-[#1A2B3C] py-1 sm:py-2 px-3 sm:px-4 border-b-2 border-[#0A1525]">
                      <h2 style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[#76D6FF] text-[8px] sm:text-xs text-center">HOW TO PLAY</h2>
                    </div>
                    <div className="p-2 sm:p-3">
                      <ol className="list-decimal pl-5 space-y-0.5 sm:space-y-1">
                        <li style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-white text-[8px] sm:text-[10px]">Select a row (A, B, C)</li>
                        <li style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-white text-[8px] sm:text-[10px]">Select a column (1, 2, 3, 4)</li>
                        <li style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-white text-[8px] sm:text-[10px]">Press the CRITTER button</li>
                        <li style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-white text-[8px] sm:text-[10px]">Collect your new friend!</li>
                      </ol>
                    </div>
                  </div>
                  
                  {/* Collection guide */}
                  <div className="relative shrink-0">
                    {/* Arcade cabinet style header */}
                    <div className="w-[200px] sm:w-[210px] h-6 sm:h-8 bg-[#1A2B3C] border-2 sm:border-4 border-b-0 border-[#0A1525] rounded-t-sm flex items-center justify-center mb-0 shadow-lg">
                      <p style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[#76D6FF] text-[6px] sm:text-[8px]">COLLECTION GUIDE</p>
                    </div>
                    
                    {/* Collectibles table */}
                    <CritterTable />
                    
                    {/* Arcade cabinet style joystick area */}
                    <div className="w-[200px] sm:w-[210px] h-8 sm:h-10 bg-[#1A2B3C] border-2 sm:border-4 border-t-0 border-[#0A1525] rounded-b-sm flex items-center justify-center shadow-lg">
                      <div className="w-4 sm:w-6 h-4 sm:h-6 bg-[#4C8DAF] rounded-full border-2 border-[#0A1525] shadow-inner"></div>
                    </div>
                  </div>
                  
                  {/* Mobile indicator */}
                  <div className="flex lg:hidden items-center justify-center ml-6 w-6 h-full">
                    <div className="w-4 h-8 rounded-full border-2 border-[#76D6FF] opacity-30 animate-pulse flex flex-col items-center justify-center">
                      <div className="w-2 h-2 bg-[#76D6FF] rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
                
                {/* Cute pixel art decorations - centered on larger screens */}
                <div className="mt-4 flex justify-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#f8c9ae] rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#724a73] rounded-full animate-pulse delay-100"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#f7daec] rounded-full animate-pulse delay-200"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#b9849d] rounded-full animate-pulse delay-300"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#80afbb] rounded-full animate-pulse delay-400"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer credits */}
          <div className="mt-3 sm:mt-6 mb-2 text-center text-[8px] sm:text-[10px] text-[#76D6FF] opacity-80 relative z-10 px-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            © 2025 PIXELATED DREAMS • PRESS TO PLAY • INSERT COIN
          </div>
        </div>
        
        {/* Arcade cabinet control panel */}
        <div className="bg-[#1A2B3C] h-10 sm:h-12 md:h-16 w-full border-t-2 sm:border-t-4 border-[#0A1525] relative z-10 flex items-center justify-center">
          <div className="flex space-x-4 sm:space-x-6 md:space-x-10">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#f7daec] rounded-full border-2 border-[#0A1525] shadow-lg"></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80afbb] rounded-full border-2 border-[#0A1525] shadow-lg"></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#f8c9ae] rounded-full border-2 border-[#0A1525] shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
