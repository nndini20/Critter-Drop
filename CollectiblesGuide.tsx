import React from "react";
import { CritterTable } from "./CritterTable";
import { AnimalFigurine } from "./AnimalFigurine";

export const CollectiblesGuide: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="sticky top-4 bg-[#1A2B3C] p-4 rounded-sm border-2 border-[#0A1525] shadow-lg">
            <h2 className="font-['Press_Start_2P'] text-white text-sm mb-4">GUIDE</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-['IBM_Plex_Mono'] font-bold text-[#76D6FF] text-[12px] mb-2">HOW TO PLAY</h3>
                <ol className="list-decimal pl-4 space-y-2">
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Select a row (A, B, C)</li>
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Select a column (1, 2, 3, 4)</li>
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Press the CRITTER button</li>
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Receive your critter!</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-['IBM_Plex_Mono'] font-bold text-[#76D6FF] text-[12px] mb-2">SPECIAL FEATURES</h3>
                <ul className="list-disc pl-4 space-y-2">
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Holographic effects on Rare+ cards</li>
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Unique animations for each animal</li>
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Randomly generated names</li>
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Polaroid display after dispensing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-['IBM_Plex_Mono'] font-bold text-[#76D6FF] text-[12px] mb-2">TIPS</h3>
                <ul className="list-disc pl-4 space-y-2">
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Each pull is completely random</li>
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Legendary critters are very rare (3%)</li>
                  <li className="font-['IBM_Plex_Mono'] text-white text-[11px]">Save your favorites to your collection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <h1 className="font-['Press_Start_2P'] text-[#f7daec] text-xl mb-6 drop-shadow-md">
            Complete Collection
          </h1>
          
          <CritterTable />
          
          <div className="mt-8 bg-[#1A2B3C] p-4 rounded-sm border-2 border-[#0A1525] shadow-lg">
            <h2 className="font-['Press_Start_2P'] text-white text-sm mb-4">CRITTER SHOWCASE</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Example legendary critters - these would come from a collection */}
              {["bear", "fox", "owl", "rabbit"].map((animal, index) => (
                <div key={index} className="bg-[#0A1525] p-2 rounded-sm border border-[#ffce29] drop-shadow-[0_0_5px_#ffce29]">
                  <div className="w-full h-32 bg-[#9DC1E4] rounded-sm p-1 flex items-center justify-center mb-2">
                    <div className="transform scale-75">
                      <AnimalFigurine animal={animal as any} size="lg" />
                    </div>
                  </div>
                  <p className="font-['IBM_Plex_Mono'] font-bold text-white text-[11px] truncate">PixelPaws</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="font-['IBM_Plex_Mono'] text-[10px] text-[#76D6FF]">{animal.toUpperCase()}</p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#ffce29] rounded-full mr-1 drop-shadow-[0_0_3px_#ffce29]"></div>
                      <p className="font-['IBM_Plex_Mono'] text-[8px] text-[#ffce29]">LEGENDARY</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};