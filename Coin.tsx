import React, { useEffect } from "react";

interface CoinProps {
  isInserting: boolean;
  onInsertComplete: () => void;
}

export const Coin: React.FC<CoinProps> = ({
  isInserting,
  onInsertComplete,
}) => {
  // Trigger the callback when the animation completes
  useEffect(() => {
    if (isInserting) {
      const timer = setTimeout(() => {
        onInsertComplete();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isInserting, onInsertComplete]);
  
  if (!isInserting) return null;
  
  return (
    <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10">
      <div
        className="size-6 bg-[#FFD700] rounded-full coin-animation relative pixel-art"
        style={{
          boxShadow: "inset -2px -2px 0 rgba(0,0,0,0.2), inset 2px 2px 0 rgba(255,255,255,0.2)",
        }}
      >
        <div className="absolute inset-1 rounded-full bg-[#FFC000] pixel-art"></div>
        <div className="absolute inset-2 flex items-center justify-center">
          <div className="text-[6px] font-pixel text-[#AA8500]">¢</div>
        </div>
      </div>
    </div>
  );
};