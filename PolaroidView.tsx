import React, { useState, useEffect } from "react";
import { AnimalFigurine } from "./AnimalFigurine";

// Define types
type AnimalType = "cat" | "dog" | "rabbit" | "bear" | "fox" | "deer" | "owl" | "raccoon";
type CritterType = "Whimsy" | "Forage" | "Tinker" | "Dream" | "Sprout";
type Rarity = "common" | "rare" | "epic" | "legendary";

// Colors for different types with softer pastel colors
const typeColors = {
  Whimsy: {
    color: "#724a73", 
    light: "#f7daec",
    gradient: "linear-gradient(135deg, #c792ea 0%, #f7daec 100%)",
    pattern: "radial-gradient(circle at 30% 60%, rgba(247,218,236,0.6) 0%, rgba(199,146,234,0.2) 60%, transparent 70%)"
  },
  Forage: {
    color: "#77434b", 
    light: "#f8c9ae",
    gradient: "linear-gradient(135deg, #e6a8a8 0%, #f8c9ae 100%)",
    pattern: "repeating-linear-gradient(45deg, rgba(230,168,168,0.1), rgba(230,168,168,0.1) 5px, rgba(248,201,174,0.1) 5px, rgba(248,201,174,0.1) 10px)"
  },
  Tinker: {
    color: "#80afbb", 
    light: "#d1e8ec",
    gradient: "linear-gradient(135deg, #a0e7e5 0%, #d1e8ec 100%)",
    pattern: "linear-gradient(0deg, rgba(160,231,229,0.1) 25%, transparent 25%, transparent 50%, rgba(209,232,236,0.1) 50%, rgba(209,232,236,0.1) 75%, transparent 75%, transparent)"
  },
  Dream: {
    color: "#5d568b", 
    light: "#d8d5ec",
    gradient: "linear-gradient(135deg, #c792ea 0%, #d8d5ec 100%)",
    pattern: "radial-gradient(circle at 50% 50%, rgba(216,197,250,0.3) 0%, rgba(93,86,139,0.1) 60%, transparent 70%)"
  },
  Sprout: {
    color: "#6a8e4e", 
    light: "#e3efd7",
    gradient: "linear-gradient(135deg, #b4f8c8 0%, #e3efd7 100%)",
    pattern: "repeating-linear-gradient(0deg, rgba(180,248,200,0.05), rgba(180,248,200,0.05) 3px, rgba(227,239,215,0.1) 3px, rgba(227,239,215,0.1) 6px)"
  }
};

// Colors for different rarities with cuter glow effects
const rarityColors = {
  common: "#c0c0c0",
  rare: "#7ec8ff",
  epic: "#e3a5ff",
  legendary: "#ffe07d"
};

// Background patterns based on rarity
const rarityBackgrounds = {
  common: "radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 70%)",
  rare: "radial-gradient(circle, rgba(126,200,255,0.2) 10%, transparent 70%)",
  epic: "repeating-linear-gradient(45deg, rgba(227,165,255,0.05) 0%, rgba(227,165,255,0.1) 5%, transparent 5%, transparent 10%)",
  legendary: "radial-gradient(circle, rgba(255,224,125,0.2) 10%, transparent 70%)"
};

// Generate a random cute name
const generateName = (animal: AnimalType): string => {
  const prefixes = [
    "Pixel", "Lil", "Tiny", "Sweet", "Fuzzy", 
    "Boop", "Snug", "Puffy", "Mochi", "Fluffy",
    "Bubbly", "Puff", "Pudgy", "Cupcake", "Sprinkle"
  ];
  const suffixes = [
    "Bean", "Paws", "Muffin", "Dots", "Wiggles", 
    "Whisker", "Button", "Heart", "Sparkle", "Floof",
    "Cheeks", "Jelly", "Swirl", "Bubble", "Cotton"
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
const generateRarity = (): Rarity => {
  const random = Math.random();
  if (random < 0.6) return "common";
  if (random < 0.85) return "rare";
  if (random < 0.97) return "epic";
  return "legendary";
};

interface PolaroidViewProps {
  animal: string;
  onRestart: () => void;
}

export const PolaroidView: React.FC<PolaroidViewProps> = ({
  animal,
  onRestart,
}) => {
  const [saved, setSaved] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [sparkles, setSparkles] = useState<boolean>(false);
  
  // Generate random properties for the animal
  const [name] = useState(generateName(animal as AnimalType));
  const [type] = useState(generateType());
  const [rarity] = useState(generateRarity());
  
  const typeColor = typeColors[type] || { 
    color: "#A0A0A0", 
    light: "#f0f0f0", 
    gradient: "linear-gradient(135deg, #A0A0A0 0%, #f0f0f0 100%)",
    pattern: "none"
  };
  
  const rarityColor = rarityColors[rarity] || "#c0c0c0";
  const rarityBackground = rarityBackgrounds[rarity] || rarityBackgrounds.common;
  
  useEffect(() => {
    // Animate the reveal of the animal
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 500);
    
    // Add occasional sparkles for rarer animals
    if (rarity !== "common") {
      const sparkleInterval = setInterval(() => {
        setSparkles(true);
        setTimeout(() => setSparkles(false), 1500);
      }, 4000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(sparkleInterval);
      };
    }
    
    return () => clearTimeout(timer);
  }, [rarity]);
  
  const handleSave = () => {
    setSaved(true);
  };
  
  // Get sparkle effects based on rarity
  const getSparkles = () => {
    if (rarity === "common" || !sparkles) return null;
    
    const sparkleCount = 
      rarity === "legendary" ? 8 : 
      rarity === "epic" ? 6 : 
      rarity === "rare" ? 4 : 0;
    
    return Array(sparkleCount).fill(0).map((_, i) => {
      const delay = Math.random() * 0.5;
      const size = 3 + Math.random() * 5;
      const duration = 1 + Math.random() * 1;
      const angle = (i / sparkleCount) * 360;
      const radius = 40 + Math.random() * 20;
      const x = Math.cos(angle * (Math.PI / 180)) * radius;
      const y = Math.sin(angle * (Math.PI / 180)) * radius;
      
      return (
        <div 
          key={i}
          className="absolute animate-sparkle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: "50%",
            left: "50%",
            transform: `translate(${x}px, ${y}px)`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" fill={rarityColor} />
          </svg>
        </div>
      );
    });
  };
  
  // Get cute decorative elements based on type
  const getDecorations = () => {
    switch(type) {
      case "Whimsy":
        return (
          <div className="absolute inset-10 opacity-30 pointer-events-none">
            {Array(5).fill(0).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full animate-twinkle"
                style={{
                  width: `${4 + Math.random() * 4}px`,
                  height: `${4 + Math.random() * 4}px`,
                  backgroundColor: typeColor.color,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        );
      case "Forage":
        return (
          <div className="absolute inset-10 opacity-30 pointer-events-none">
            {Array(3).fill(0).map((_, i) => (
              <div 
                key={i}
                className="absolute animate-float"
                style={{
                  width: `${6 + Math.random() * 4}px`,
                  height: `${6 + Math.random() * 4}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  borderRadius: "50% 50% 50% 0",
                  transform: `rotate(${45 + Math.random() * 90}deg)`,
                  backgroundColor: typeColor.color
                }}
              />
            ))}
          </div>
        );
      case "Dream":
        return (
          <div className="absolute inset-10 opacity-20 pointer-events-none">
            {Array(6).fill(0).map((_, i) => (
              <div 
                key={i}
                className="absolute opacity-30 animate-pulse"
                style={{
                  width: `${8 + Math.random() * 8}px`,
                  height: `${8 + Math.random() * 8}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  borderRadius: "50%",
                  border: `1px solid ${typeColor.color}`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Polaroid frame with cute styling */}
      <div className="w-[350px] h-[450px] p-4 bg-white border-8 border-t-[24px] border-b-[48px] border-[#f0f0f0] relative shadow-xl overflow-hidden rounded-sm">
        {/* Light reflection on polaroid */}
        <div className="absolute top-0 right-0 w-1/3 h-1/4 bg-white opacity-20 transform -rotate-12"></div>
        
        {/* Camera brand in the top border */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 font-['IBM_Plex_Mono'] font-bold text-gray-800 text-[10px]">
          CRITTERCAM
        </div>
        
        {/* Red recording dot */}
        <div className="absolute -top-4 right-4 size-2 bg-red-600 rounded-full animate-pulse"></div>
        
        {/* Type label at the top */}
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg"
          style={{ background: typeColor.gradient }}
        >
          <p className="font-['IBM_Plex_Mono'] font-bold text-[9px] text-white drop-shadow-sm">{type.toUpperCase()} TYPE</p>
        </div>
        
        {/* Background pattern based on rarity */}
        <div 
          className="absolute inset-12 rounded-lg"
          style={{ background: rarityBackground }}
        ></div>
        
        {/* Type-based decorative elements */}
        {getDecorations()}
        
        {/* Sparkle effects for rarer animals */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {getSparkles()}
        </div>
        
        {/* Animal figurine - cuter and more vivid with pixelation */}
        <div className="w-full h-[60%] flex items-center justify-center transform translate-y-4">
          <div 
            className={`transform transition-all duration-700 ${isRevealed ? 'opacity-100 scale-[2.5]' : 'opacity-0 scale-0'}`}
            style={{ 
              filter: `${rarity !== "common" ? `drop-shadow(0 0 8px ${rarityColor})` : ""}`,
              transformOrigin: 'center',
            }}
          >
            <AnimalFigurine animal={animal as AnimalType} size="lg" />
          </div>
        </div>
        
        {/* Rarity and Name labels at the bottom */}
        <div className={`absolute bottom-20 left-0 w-full flex flex-col items-center ${isRevealed ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'} transition-all duration-500 delay-300`}>
          {/* Animal name */}
          <p 
            className="font-['IBM_Plex_Mono'] font-bold text-[12px] text-[#0a1525] bg-white px-3 py-1 rounded-lg shadow-sm mb-2"
            style={{ 
              border: `2px solid ${typeColor.color}`,
              boxShadow: `0 0 5px rgba(0,0,0,0.1)`
            }}
          >
            {name}
          </p>
          
          {/* Animal type and rarity */}
          <div className="mt-1 flex items-center space-x-6">
            <div className="flex items-center">
              <div className="size-3 bg-[#0a1525] rounded-full mr-1"></div>
              <p className="font-['IBM_Plex_Mono'] font-bold text-[9px] text-[#0a1525]">
                {animal.toUpperCase()}
              </p>
            </div>
            
            <div className="flex items-center">
              <div 
                className={`size-3 rounded-full mr-1 ${rarity === "legendary" ? "animate-pulse" : ""}`}
                style={{ 
                  backgroundColor: rarityColor,
                  boxShadow: rarity !== "common" ? `0 0 5px ${rarityColor}` : "none"
                }}
              ></div>
              <p 
                className="font-['IBM_Plex_Mono'] font-bold text-[9px]"
                style={{ 
                  color: rarity !== "common" ? rarityColor : "#0a1525",
                  textShadow: rarity === "legendary" ? "0 0 2px rgba(255,224,125,0.5)" : "none"
                }}
              >
                {rarity.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Polaroid development status light */}
        <div className="absolute bottom-6 right-6 flex items-center">
          <div className="size-3 mr-1 bg-green-500 rounded-full animate-pulse"></div>
          <div className="font-['IBM_Plex_Mono'] font-bold text-[8px] text-gray-800">READY</div>
        </div>
        
        {/* Film counter in bottom border */}
        <div className="absolute bottom-5 left-5 font-['IBM_Plex_Mono'] font-bold text-[10px] text-gray-800">
          1/1
        </div>
      </div>
      
      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={handleSave}
          disabled={saved}
          className={`px-4 py-2 font-['IBM_Plex_Mono'] font-bold text-xs 
            ${saved 
              ? 'bg-gray-400 text-gray-700' 
              : 'bg-[#1A2B3C] text-white hover:bg-[#2B4C6F]'
            } 
            border-2 border-[#0A1525] rounded-lg focus:outline-none transition-colors duration-200`}
        >
          {saved ? "SAVED!" : "SAVE TO COLLECTION"}
        </button>
        
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-[#4C8DAF] text-white font-['IBM_Plex_Mono'] font-bold text-xs hover:bg-[#5F9DC2] border-2 border-[#0A1525] rounded-lg focus:outline-none transition-colors duration-200"
        >
          GET ANOTHER
        </button>
      </div>
    </div>
  );
};