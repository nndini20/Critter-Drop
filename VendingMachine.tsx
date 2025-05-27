import React, { useState, useCallback, useEffect } from "react";
import { CollectibleCard } from "./CollectibleCard";
import { Coin } from "./Coin";
import { PolaroidView } from "./PolaroidView";

// Define types
type AnimalType = "cat" | "dog" | "rabbit" | "bear" | "fox" | "deer" | "owl" | "raccoon";
type AppState = "vending" | "dispensing" | "polaroid";

export const VendingMachine: React.FC = () => {
  // Available animal types
  const animalTypes: AnimalType[] = ["cat", "dog", "rabbit", "bear", "fox", "deer", "owl", "raccoon"];
  
  // States for the vending machine
  const [state, setState] = useState<AppState>("vending");
  const [insertingCoin, setInsertingCoin] = useState<boolean>(false);
  const [currentAnimal, setCurrentAnimal] = useState<AnimalType | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [displayedAnimals, setDisplayedAnimals] = useState<AnimalType[]>(
    Array(12).fill(0).map(() => animalTypes[Math.floor(Math.random() * animalTypes.length)])
  );
  
  // We've removed the auto-start effect to allow users to manually click the CRITTER button
  // This gives users more control over the gameplay experience
  
  // Insert a coin into the machine
  const handleInsertCoin = useCallback(() => {
    if (insertingCoin || state !== "vending") return;
    
    if (selectedRow === null || selectedCol === null) {
      return;
    }
    
    setInsertingCoin(true);
    console.log("Coin inserted! Dispensing animal...");
  }, [insertingCoin, state, selectedRow, selectedCol]);
  
  // After coin is inserted
  const handleCoinInserted = useCallback(() => {
    setInsertingCoin(false);
    setState("dispensing");
    
    // Get the selected animal based on row/col
    const index = (selectedRow! * 4) + selectedCol!;
    const selectedAnimal = displayedAnimals[index];
    
    // Reveal the animal after a short delay
    setTimeout(() => {
      setCurrentAnimal(selectedAnimal);
      setState("polaroid");
    }, 1500);
    
  }, [displayedAnimals, selectedRow, selectedCol]);
  
  // Restart the process
  const handleRestart = useCallback(() => {
    // Generate new random animals for machine display
    setDisplayedAnimals(
      Array(12).fill(0).map(() => animalTypes[Math.floor(Math.random() * animalTypes.length)])
    );
    setState("vending");
    setCurrentAnimal(null);
    setSelectedRow(null);
    setSelectedCol(null);
  }, [animalTypes]);
  
  // Handle row selection
  const handleRowSelect = (row: number) => {
    if (state !== "vending" || insertingCoin) return;
    
    setSelectedRow(row);
  };
  
  // Handle column selection
  const handleColSelect = (col: number) => {
    if (state !== "vending" || insertingCoin) return;
    
    setSelectedCol(col);
  };
  
  // Display screen message
  const getScreenMessage = () => {
    if (insertingCoin) return "PROCESSING...";
    if (state === "dispensing") return "DISPENSING...";
    if (selectedRow !== null && selectedCol !== null) {
      const code = `${String.fromCharCode(65 + selectedRow)}${selectedCol + 1}`;
      return `SELECTED: ${code}`;
    }
    return "SELECT ITEM";
  };
  
  // Render based on current state
  if (state === "polaroid" && currentAnimal) {
    return <PolaroidView animal={currentAnimal} onRestart={handleRestart} />;
  }
  
  return (
    <div className="relative flex flex-col items-center">
      {/* Instructions */}
      <div className="mb-4 text-center">
        <p className="text-[rgba(185,203,221,1)] font-['IBM_Plex_Mono'] font-bold text-sm">
          {state === "dispensing" 
            ? "DISPENSING CRITTER..." 
            : "SELECT ROW (A,B,C) AND COLUMN (1,2,3,4)"}
        </p>
      </div>
      
      {/* Vending Machine Frame - Styled as PIPSI with pixel art aesthetic */}
      <div className="relative w-[350px] h-[500px] bg-[#2B4C6F] border-4 border-[#1A2B3C] overflow-hidden shadow-lg">
        {/* Machine Header - With Press Start 2P font for pixel aesthetic */}
        <div className="h-12 w-full bg-[#1A2B3C] flex items-center justify-center relative border-b-4 border-[#0A1525]">
          <h2 className="font-['Press_Start_2P'] text-white text-xs tracking-tight">CRITTER DROPS</h2>
        </div>
        
        {/* Glass Display Area with Side Buttons */}
        <div className="flex justify-center items-center relative mt-4 mb-4">
          {/* Row selection buttons (A, B, C) - Left side */}
          <div className="flex flex-col space-y-4 mr-2">
            {[0, 1, 2].map((row) => (
              <button
                key={`row-${row}`}
                onClick={() => handleRowSelect(row)}
                disabled={state !== "vending" || insertingCoin}
                className={`w-8 h-8 border-2 ${
                  selectedRow === row 
                    ? 'border-[#76D6FF] bg-[#1A2B3C] text-white' 
                    : 'border-[#1A2B3C] bg-[#4C8DAF] text-white hover:bg-[#5F9DC2]'
                } font-['IBM_Plex_Mono'] font-bold text-[12px] rounded-sm focus:outline-none`}
              >
                {String.fromCharCode(65 + row)}
              </button>
            ))}
          </div>
          
          {/* Glass Display - Grid of products */}
          <div className="w-[210px] h-[220px] bg-[#9DC1E4] border-4 border-[#1A2B3C] relative overflow-hidden">
            {/* CRT scan lines effect */}
            <div className="absolute inset-0 bg-[#0A1525] opacity-5 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(transparent 1px, transparent 1px), 
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '2px 2px'
              }}
            />
            
            {/* Display grid of collectible cards - Properly centered */}
            <div className="flex items-center justify-center w-full h-full">
              <div className="grid grid-cols-4 grid-rows-3 gap-x-1 gap-y-0.5 mx-auto" style={{ width: "180px" }}>
                {displayedAnimals.map((animalType, index) => {
                  const row = Math.floor(index / 4);
                  const col = index % 4;
                  const isSelected = selectedRow === row && selectedCol === col;
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center justify-center relative ${isSelected ? 'bg-[#7BAFE0]' : ''} transition-all duration-200`}
                      style={{ width: "42px", height: "68px", padding: "0" }}
                    >
                      <CollectibleCard 
                        animal={animalType}
                        size="sm"
                      />
                      
                      {/* Selection code */}
                      <div className="absolute -top-1 -right-1 text-[9px] font-['IBM_Plex_Mono'] font-bold text-white bg-[#1A2B3C] px-1 rounded-sm">
                        {`${String.fromCharCode(65 + row)}${col + 1}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Column selection buttons (1, 2, 3, 4) - Right side */}
          <div className="flex flex-col space-y-4 ml-2">
            {[0, 1, 2, 3].map((col) => (
              <button
                key={`col-${col}`}
                onClick={() => handleColSelect(col)}
                disabled={state !== "vending" || insertingCoin}
                className={`w-8 h-8 border-2 ${
                  selectedCol === col 
                    ? 'border-[#76D6FF] bg-[#1A2B3C] text-white' 
                    : 'border-[#1A2B3C] bg-[#4C8DAF] text-white hover:bg-[#5F9DC2]'
                } font-['IBM_Plex_Mono'] font-bold text-[12px] rounded-sm focus:outline-none`}
              >
                {col + 1}
              </button>
            ))}
          </div>
        </div>
        
        {/* Digital display */}
        <div className="h-10 w-[210px] mx-auto bg-[#1A2B3C] border-2 border-[#0A1525] flex items-center justify-center mb-3">
          <p className="font-['IBM_Plex_Mono'] font-bold text-[#76D6FF] text-sm">{getScreenMessage()}</p>
        </div>
        
        {/* Dark blue base section */}
        <div className="absolute bottom-0 w-full h-[160px] bg-[#1A2B3C] border-t-4 border-[#0A1525]">
          {/* Coin and Button Area */}
          <div className="flex items-center justify-center gap-6 mt-6 mb-4">
            {/* Coin Slot */}
            <div className="relative h-14 w-12 bg-[#1A2B3C] border-2 border-[#0A1525] flex flex-col items-center justify-center rounded-sm overflow-hidden">
              <div className="h-1 w-8 bg-black"></div>
              <div className="h-6 w-8 bg-[#0A1525] mt-1"></div>
              {insertingCoin && (
                <Coin 
                  isInserting={insertingCoin} 
                  onInsertComplete={handleCoinInserted} 
                />
              )}
            </div>
            
            {/* CRITTER button */}
            <button 
              className={`h-14 w-32 bg-[#4C8DAF] border-2 border-[#1A2B3C] flex items-center justify-center rounded-sm ${
                (state !== "vending") || insertingCoin || selectedRow === null || selectedCol === null
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#5F9DC2] active:translate-y-0.5'
              }`}
              onClick={handleInsertCoin}
              disabled={(state !== "vending") || insertingCoin || selectedRow === null || selectedCol === null}
            >
              <p className="font-['Press_Start_2P'] text-white text-xs">CRITTER</p>
            </button>
          </div>
          
          {/* Dispensing tray */}
          <div className="h-12 w-[210px] mx-auto bg-[#1A2B3C] border-2 border-[#0A1525] flex items-center justify-center mt-3">
            <div className="h-8 w-[190px] bg-[#0A1525]"></div>
          </div>
        </div>
      </div>
      
      {/* Machine Shadow */}
      <div className="w-[350px] h-4 bg-black opacity-30 rounded-full blur-xl mt-2"></div>
    </div>
  );
};