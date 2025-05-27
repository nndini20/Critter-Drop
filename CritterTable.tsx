import React from "react";
import { AnimalFigurine } from "./AnimalFigurine";

// Define types
type AnimalType = "cat" | "dog" | "rabbit" | "bear" | "fox" | "deer" | "owl" | "raccoon";
type Rarity = "common" | "rare" | "legendary";

// Rarity colors and styles
const rarityColors = {
  common: {
    color: "#a0a0a0",
    bg: "bg-[#a0a0a0]",
    text: "text-white",
    glow: ""
  },
  rare: {
    color: "#7ec8ff",
    bg: "bg-[#7ec8ff]",
    text: "text-white",
    glow: "drop-shadow-[0_0_3px_#7ec8ff]"
  },
  legendary: {
    color: "#ffce29",
    bg: "bg-[#ffce29]",
    text: "text-black",
    glow: "drop-shadow-[0_0_8px_#ffce29]"
  }
};

export const CritterTable: React.FC = () => {
  // List of all possible animals
  const animals: AnimalType[] = ["cat", "dog", "rabbit", "bear", "fox", "deer", "owl", "raccoon"];
  
  // List of rarity levels (reduced to 3)
  const rarityLevels: Rarity[] = ["common", "rare", "legendary"];
  
  // Percent chances for each rarity
  const rarityChances = {
    common: "60%",
    rare: "35%",
    legendary: "5%"
  };

  return (
    <div className="w-[210px] bg-[#2B4C6F] border-4 border-[#1A2B3C] shadow-lg overflow-hidden p-2 rounded-sm">
      {/* Header */}
      <div className="text-center py-2">
        <h2 className="font-['Press_Start_2P'] text-white text-xs">COLLECTIBLES</h2>
        <div className="h-0.5 w-24 bg-[#4C8DAF] mx-auto mt-2"></div>
      </div>
      
      {/* Animals grid */}
      <div className="bg-[#1A2B3C] p-2 rounded-sm border-2 border-[#0A1525] mb-2">
        <div className="grid grid-cols-4 gap-1">
          {animals.map((animal) => (
            <div key={animal} className="flex flex-col items-center">
              <div className="w-10 h-10 bg-[#9DC1E4] rounded-sm border border-[#0A1525] mb-1 flex items-center justify-center">
                <AnimalFigurine animal={animal} size="sm" />
              </div>
              <p className="font-['IBM_Plex_Mono'] font-bold text-white text-[7px] uppercase">{animal}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Rarity section */}
      <div className="bg-[#1A2B3C] p-2 rounded-sm border-2 border-[#0A1525]">
        <p className="font-['Press_Start_2P'] text-white text-[7px] mb-1">RARITY</p>
        
        <div className="grid grid-cols-3 gap-1">
          {rarityLevels.map((rarity) => (
            <div 
              key={rarity} 
              className={`bg-[#0A1525] p-1 rounded-sm border border-[#4C8DAF] ${rarityColors[rarity].glow}`}
            >
              <div className="flex justify-between items-center">
                <div className={`w-2 h-2 ${rarityColors[rarity].bg} rounded-full`}></div>
                <p className="font-['IBM_Plex_Mono'] font-bold text-[6px] text-white">{rarityChances[rarity]}</p>
              </div>
              <p className={`font-['IBM_Plex_Mono'] text-[6px] uppercase mt-1 text-center ${rarityColors[rarity].text}`}>{rarity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Collection count */}
      <div className="mt-2 bg-[#1A2B3C] p-2 rounded-sm border-2 border-[#0A1525]">
        <div className="flex justify-between items-center">
          <p className="font-['IBM_Plex_Mono'] text-[#76D6FF] text-[8px]">8 Animals × 3 Rarities</p>
          <p className="font-['Press_Start_2P'] text-white text-[8px]">= 24</p>
        </div>
      </div>
      
      {/* Cute note */}
      <div className="text-center mt-2">
        <p className="font-['IBM_Plex_Mono'] text-[6px] text-[#9DC1E4]">
          ♥ Collect them all! ♥
        </p>
      </div>
    </div>
  );
};