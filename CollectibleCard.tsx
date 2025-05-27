import React from "react";
import { AnimalFigurine } from "./AnimalFigurine";

// Define types
type AnimalType = "cat" | "dog" | "rabbit" | "bear" | "fox" | "deer" | "owl" | "raccoon";
type CardSize = "sm" | "lg";
type CritterType = "Whimsy" | "Forage" | "Tinker" | "Dream" | "Sprout";

interface CollectibleCardProps {
  animal: AnimalType;
  size: CardSize;
  name?: string;
  type?: CritterType;
  rarity?: "common" | "rare" | "epic" | "legendary";
  withBackground?: boolean;
}

// Updated with darker pastel colors
const typeColors = {
  Whimsy: {
    bg: "bg-[#b28cb2]", 
    border: "border-[#d4b6d4]",
    light: "#e2d0e2"
  },
  Forage: {
    bg: "bg-[#e5aa8c]", 
    border: "border-[#f8c9ae]",
    light: "#fbe0cc"
  },
  Tinker: {
    bg: "bg-[#80afbb]", 
    border: "border-[#a9d8e2]",
    light: "#c5e6ec"
  },
  Dream: {
    bg: "bg-[#9689b9]", 
    border: "border-[#c5b8df]",
    light: "#d9d1ea"
  },
  Sprout: {
    bg: "bg-[#8eb66f]", 
    border: "border-[#b8d8a0]",
    light: "#d1e6c0"
  }
};

// Rarity colors with more saturation
const rarityColors = {
  common: {
    color: "#a0a0a0",
    glow: "0px 0px 5px #a0a0a0",
    border: "2px solid #a0a0a0"
  },
  rare: {
    color: "#7ec8ff",
    glow: "0px 0px 8px #7ec8ff",
    border: "2px solid #7ec8ff"
  },
  epic: {
    color: "#c45aec",
    glow: "0px 0px 12px #c45aec",
    border: "3px solid #c45aec"
  },
  legendary: {
    color: "#ffce29",
    glow: "0px 0px 15px #ffce29",
    border: "4px solid #ffce29"
  }
};

// Background patterns based on type
const backgroundPatterns = {
  Whimsy: "radial-gradient(circle, rgba(226,208,226,0.4) 15%, transparent 40%)",
  Forage: "radial-gradient(circle, rgba(251,224,204,0.4) 10%, transparent 30%)",
  Tinker: "linear-gradient(45deg, rgba(197,230,236,0.2) 25%, transparent 25%, transparent 50%, rgba(197,230,236,0.2) 50%, rgba(197,230,236,0.2) 75%, transparent 75%, transparent)",
  Dream: "radial-gradient(ellipse at 50% 50%, rgba(217,209,234,0.2) 0%, transparent 70%)",
  Sprout: "repeating-linear-gradient(45deg, rgba(209,230,192,0.2), rgba(209,230,192,0.2) 5px, transparent 5px, transparent 10px)"
};

// Generate a random name based on the animal type
const generateName = (animal: AnimalType): string => {
  const prefixes = [
    "Pixel", "Bit", "Byte", "Chip", "Glitch", "Beta", 
    "Retro", "Arcade", "Crypto", "Digi", "Echo", "Flux"
  ];
  const suffixes = [
    "Bot", "Mint", "Core", "Coin", "Ware", "Craft", 
    "Quest", "Blip", "Pulse", "Star", "Dex", "Wave"
  ];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix}${suffix}`;
};

// Generate a random type
const generateType = (): CritterType => {
  const types: CritterType[] = ["Whimsy", "Forage", "Tinker", "Dream", "Sprout"];
  return types[Math.floor(Math.random() * types.length)];
};

// Generate a random rarity
const generateRarity = (): "common" | "rare" | "epic" | "legendary" => {
  const random = Math.random();
  if (random < 0.6) return "common";
  if (random < 0.85) return "rare";
  if (random < 0.97) return "epic";
  return "legendary";
};

export const CollectibleCard: React.FC<CollectibleCardProps> = ({
  animal,
  size,
  name = generateName(animal),
  type = generateType(),
  rarity = generateRarity(),
  withBackground = false
}) => {
  const typeColor = typeColors[type] || { bg: "bg-gray-200", border: "border-gray-400", light: "#f0f0f0" };
  const rarityStyle = rarityColors[rarity] || rarityColors.common;
  
  // For the vending machine view (small size)
  if (size === "sm") {
    return (
      <div 
        className="relative group"
        style={{ width: "36px", height: "46px" }}
      >
        <div className={`w-full h-full relative overflow-hidden pixel-art bg-[#9dc1e4] border border-[#597fa7]`}>
          {/* Card content */}
          <div className="w-full h-3/4 flex items-center justify-center bg-[#c4ddff] border-b border-[#597fa7]">
            {/* Minimalist Animal Icon */}
            <div className="size-6 flex items-center justify-center">
              <div className={`size-5 ${typeColor.bg.split(' ')[0]}`}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[6px] font-['IBM_Plex_Mono'] font-bold text-white">
                    {animal.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card footer */}
          <div className="w-full h-1/4 bg-[#7ba3c9] flex items-center justify-center">
            <div 
              className="size-2 rounded-full"
              style={{ 
                backgroundColor: rarityStyle.color,
                boxShadow: rarityStyle.glow
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
  
  // For the polaroid view (large size)
  return (
    <div 
      className="relative group transform scale-[0.7]"
      style={{ width: "240px", height: "340px" }}
    >
      <div 
        className="w-full h-full relative rounded-lg overflow-hidden pixel-art bg-white"
        style={{ 
          border: rarityStyle.border,
          boxShadow: rarityStyle.glow,
          transition: "all 0.3s ease"
        }}
      >
        {/* Card header - Type label */}
        <div className={`w-full py-2 ${typeColor.bg} ${typeColor.border} flex items-center justify-center`}>
          <div className="text-[9px] font-['IBM_Plex_Mono'] font-bold text-white">{type.toUpperCase()} TYPE</div>
        </div>
        
        {/* Card content - Animal with background */}
        <div 
          className="w-full h-[60%] flex items-center justify-center p-4"
          style={{ 
            background: withBackground ? backgroundPatterns[type] : "white",
            backgroundColor: withBackground ? typeColor.light : "white" 
          }}
        >
          <div className="relative size-full flex items-center justify-center">
            {/* Rarity frame effect */}
            {rarity === "legendary" && (
              <div className="absolute inset-4 rounded-full animate-pulse opacity-30"
                style={{ 
                  background: `radial-gradient(circle, ${rarityStyle.color} 0%, transparent 70%)`,
                  animation: "pulse 2s infinite" 
                }}
              ></div>
            )}
            {rarity === "epic" && (
              <div className="absolute inset-4 animate-pulse opacity-20"
                style={{ 
                  background: `linear-gradient(45deg, transparent, ${rarityStyle.color}, transparent)`,
                  animation: "pulse 3s infinite" 
                }}
              ></div>
            )}
            
            <AnimalFigurine animal={animal} size="lg" />
          </div>
        </div>
        
        {/* Card name */}
        <div className="w-full py-2 bg-slate-100 text-center">
          <div className="text-[9px] font-['IBM_Plex_Mono'] font-bold text-[#0a1525]">{name}</div>
        </div>
        
        {/* Card stats */}
        <div className="w-full p-2 bg-white flex items-center justify-between">
          <div className="flex items-center">
            <div className="size-4 bg-[#0a1525] rounded-full mr-1"></div>
            <div className="text-[9px] font-['IBM_Plex_Mono'] font-bold">{animal.toUpperCase()}</div>
          </div>
          <div className="flex items-center">
            <div 
              className="size-4 rounded-full mr-1"
              style={{ 
                backgroundColor: rarityStyle.color,
                boxShadow: rarityStyle.glow
              }}
            ></div>
            <div className="text-[9px] font-['IBM_Plex_Mono'] font-bold uppercase">{rarity}</div>
          </div>
        </div>
        
        {/* Holographic effect */}
        {rarity !== "common" && (
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 animate-holo pointer-events-none"
            style={{
              backgroundSize: "200% 100%",
              animation: "holo 3s ease infinite"
            }}
          ></div>
        )}
      </div>
    </div>
  );
};