import React, { useState, useEffect } from "react";

// Enhanced pastel color scheme with darker shades from the specified palette
const COLORS = {
  peach: "#f8c9ae", // Darker peach
  purple: "#724a73", // Darker purple
  pink: "#f7daec", // Darker pink
  mauve: "#b9849d", // Darker mauve
  blue: "#80afbb", // Darker blue
  burgundy: "#77434b", // Darker burgundy
  // Additional pastel shades with darker tones
  mint: "#a7d7bc", // Mint
  lavender: "#c5b1dd", // Lavender
  lemon: "#f0e6b5", // Lemon
  coral: "#f5b9ac", // Coral
  aqua: "#90d9d4", // Aqua
  lilac: "#c8a4d4", // Lilac
  // Natural animal colors
  tan: "#d2b48c",
  brown: "#a67c52",
  darkBrown: "#765234",
  lightGray: "#d3d3d3",
  mediumGray: "#a9a9a9",
  darkGray: "#696969",
  cream: "#fff8dc"
};

const HIGHLIGHTS = {
  peach: "#fae0d0", // Lighter highlight
  purple: "#9c6c9c", // Lighter highlight
  pink: "#fbeef5", // Lighter highlight
  mauve: "#d2afc0", // Lighter highlight
  blue: "#abd1db", // Lighter highlight
  burgundy: "#a16b72", // Lighter highlight
  mint: "#c8ead5", // Lighter highlight
  lavender: "#dfd2ee", // Lighter highlight
  lemon: "#f7f1d5", // Lighter highlight
  coral: "#f9d6ce", // Lighter highlight
  aqua: "#c0eae7", // Lighter highlight
  lilac: "#e2cae8", // Lighter highlight
  // Natural highlights
  tan: "#e6cbaa",
  brown: "#c49a76",
  darkBrown: "#9e785f",
  lightGray: "#e5e5e5",
  mediumGray: "#c0c0c0",
  darkGray: "#808080",
  cream: "#fffef0"
};

const SHADOWS = {
  peach: "#c9a18b", // Darker shadow
  purple: "#583856", // Darker shadow
  pink: "#d8aecc", // Darker shadow
  mauve: "#94677e", // Darker shadow
  blue: "#668b95", // Darker shadow
  burgundy: "#5c3339", // Darker shadow
  mint: "#85ac95", // Darker shadow
  lavender: "#9d8ebb", // Darker shadow
  lemon: "#c3b991", // Darker shadow
  coral: "#c2948a", // Darker shadow
  aqua: "#72ada9", // Darker shadow
  lilac: "#a082a9", // Darker shadow
  // Natural shadows
  tan: "#b39b76",
  brown: "#7d5d3d", 
  darkBrown: "#583f28",
  lightGray: "#b0b0b0",
  mediumGray: "#878787",
  darkGray: "#505050",
  cream: "#e6e4b8"
};

type AnimalType = "cat" | "dog" | "rabbit" | "bear" | "fox" | "deer" | "owl" | "raccoon";

interface AnimalFigurineProps {
  animal: AnimalType;
  size?: "sm" | "md" | "lg";
}

export const AnimalFigurine: React.FC<AnimalFigurineProps> = ({ 
  animal, 
  size = "md"
}) => {
  // States for animation
  const [blink, setBlink] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [bounce, setBounce] = useState(false);
  
  // Trigger occasional animations for cuteness
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    
    const wiggleInterval = setInterval(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 300);
    }, 5000 + Math.random() * 3000);
    
    const bounceInterval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 500);
    }, 4000 + Math.random() * 4000);
    
    return () => {
      clearInterval(blinkInterval);
      clearInterval(wiggleInterval);
      clearInterval(bounceInterval);
    };
  }, []);

  // Get natural animal colors based on animal type
  const getNaturalAnimalColors = (animalType: AnimalType) => {
    switch(animalType) {
      case "cat":
        return {
          main: COLORS[["tan", "lightGray", "peach", "pink", "mauve", "cream"][Math.floor(Math.random() * 6)] as keyof typeof COLORS],
          secondary: COLORS.cream,
          accent: COLORS.burgundy
        };
      case "dog":
        return {
          main: COLORS[["tan", "brown", "darkBrown", "peach", "burgundy"][Math.floor(Math.random() * 5)] as keyof typeof COLORS],
          secondary: COLORS.cream,
          accent: COLORS.burgundy
        };
      case "rabbit":
        return {
          main: COLORS[["lightGray", "cream", "pink", "peach"][Math.floor(Math.random() * 4)] as keyof typeof COLORS],
          secondary: COLORS.cream,
          accent: COLORS.pink
        };
      case "bear":
        return {
          main: COLORS[["brown", "darkBrown", "burgundy", "purple"][Math.floor(Math.random() * 4)] as keyof typeof COLORS],
          secondary: COLORS.cream,
          accent: COLORS.tan
        };
      case "fox":
        return {
          main: COLORS[["coral", "peach", "burgundy"][Math.floor(Math.random() * 3)] as keyof typeof COLORS],
          secondary: COLORS.cream,
          accent: COLORS.darkBrown
        };
      case "deer":
        return {
          main: COLORS[["tan", "brown", "peach"][Math.floor(Math.random() * 3)] as keyof typeof COLORS],
          secondary: COLORS.cream,
          accent: COLORS.darkBrown
        };
      case "owl":
        return {
          main: COLORS[["tan", "brown", "purple", "mediumGray"][Math.floor(Math.random() * 4)] as keyof typeof COLORS],
          secondary: COLORS.cream,
          accent: COLORS.darkBrown
        };
      case "raccoon":
        return {
          main: COLORS.mediumGray,
          secondary: COLORS.lightGray,
          accent: COLORS.darkGray
        };
      default:
        return {
          main: COLORS.tan,
          secondary: COLORS.cream,
          accent: COLORS.pink
        };
    }
  };
  
  // Initialize colors
  const [colors] = React.useState(() => {
    const naturalColors = getNaturalAnimalColors(animal);
    
    // Get the color key by comparing values
    const mainColorKey = Object.keys(COLORS).find(key => 
      COLORS[key as keyof typeof COLORS] === naturalColors.main
    ) as keyof typeof COLORS || "tan";
    
    return {
      main: naturalColors.main,
      secondary: naturalColors.secondary,
      accent: naturalColors.accent,
      highlight: HIGHLIGHTS[mainColorKey] || HIGHLIGHTS.tan,
      shadow: SHADOWS[mainColorKey] || SHADOWS.tan
    };
  });

  // Size classes
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-28 h-28"
  };

  // Render animals with pixel art div-based approach
  const renderPixelAnimal = () => {
    switch (animal) {
      case "cat":
        return (
          <div className="relative size-full">
            {/* Cat body - smaller, rounder body */}
            <div className="absolute top-[68%] left-[32%] w-[36%] h-[16%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Cat head - larger, rounder head */}
            <div className="absolute top-[38%] left-[32%] w-[36%] h-[36%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Cat ears - pointy ears */}
            <div className="absolute top-[26%] left-[34%] w-[10%] h-[16%]" 
                style={{ 
                  backgroundColor: colors.main, 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                }}>
            </div>
            <div className="absolute top-[26%] right-[34%] w-[10%] h-[16%]" 
                style={{ 
                  backgroundColor: colors.main, 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                }}>
            </div>
            
            {/* Cat inner ears */}
            <div className="absolute top-[28%] left-[35%] w-[8%] h-[12%]" 
                style={{ 
                  backgroundColor: colors.accent, 
                  clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)' 
                }}>
            </div>
            <div className="absolute top-[28%] right-[35%] w-[8%] h-[12%]" 
                style={{ 
                  backgroundColor: colors.accent, 
                  clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)' 
                }}>
            </div>
            
            {/* Cat face - white muzzle patch */}
            <div className="absolute top-[52%] left-[38%] w-[24%] h-[16%] rounded-b-full" style={{ backgroundColor: colors.secondary }}></div>
            
            {/* Cat eyes - open eyes */}
            {!blink && (
              <>
                <div className="absolute top-[47%] left-[38%] w-[8%] h-[10%] rounded-full" style={{ backgroundColor: "white" }}></div>
                <div className="absolute top-[47%] right-[38%] w-[8%] h-[10%] rounded-full" style={{ backgroundColor: "white" }}></div>
                
                {/* Pupils - large and round for cuteness */}
                <div className="absolute top-[48%] left-[39%] w-[6%] h-[8%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                <div className="absolute top-[48%] right-[39%] w-[6%] h-[8%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                
                {/* Eye highlights - sparkly */}
                <div className="absolute top-[48%] left-[40%] w-[2%] h-[3%] rounded-full bg-white"></div>
                <div className="absolute top-[48%] right-[40%] w-[2%] h-[3%] rounded-full bg-white"></div>
              </>
            )}
            
            {/* Cat blinking - cute curved eyes when blinking */}
            {blink && (
              <>
                <div className="absolute top-[49%] left-[38%] w-[8%] h-[1px] bg-[#302e2e]"></div>
                <div className="absolute top-[49%] right-[38%] w-[8%] h-[1px] bg-[#302e2e]"></div>
              </>
            )}
            
            {/* Cat nose - small triangle nose */}
            <div className="absolute top-[54%] left-[48%] w-[4%] h-[3%]" 
                style={{ 
                  backgroundColor: "#ff99aa", 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                }}>
            </div>
            
            {/* Cat mouth - subtle smile */}
            <div className="absolute top-[56%] left-[50%] w-[1px] h-[3%] bg-[#302e2e]"></div>
            <div className="absolute top-[59%] left-[46%] w-[8%] h-[1px] bg-[#302e2e]"></div>
            
            {/* Cat whiskers */}
            <div className="absolute top-[55%] left-[28%] w-[10%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[57%] left-[29%] w-[9%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[59%] left-[30%] w-[8%] h-[1px] bg-[#302e2e]"></div>
            
            <div className="absolute top-[55%] right-[28%] w-[10%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[57%] right-[29%] w-[9%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[59%] right-[30%] w-[8%] h-[1px] bg-[#302e2e]"></div>
            
            {/* Cat paws */}
            <div className="absolute bottom-[8%] left-[36%] w-[8%] h-[5%] rounded-b-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute bottom-[8%] right-[36%] w-[8%] h-[5%] rounded-b-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Cat tail - curvy and cute */}
            <div className="absolute top-[68%] right-[25%] w-[5%] h-[20%] rounded-full transform rotate-[30deg]" style={{ backgroundColor: colors.main }}></div>
          </div>
        );
        
      case "dog":
        return (
          <div className="relative size-full">
            {/* Dog body - round tummy */}
            <div className="absolute top-[68%] left-[30%] w-[40%] h-[16%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Dog head - big round head */}
            <div className="absolute top-[36%] left-[32%] w-[36%] h-[36%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Dog ears - floppy cute ears */}
            <div className="absolute top-[28%] left-[25%] w-[14%] h-[24%] rounded-full transform -rotate-12" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute top-[28%] right-[25%] w-[14%] h-[24%] rounded-full transform rotate-12" style={{ backgroundColor: colors.main }}></div>
            
            {/* Dog inner ears */}
            <div className="absolute top-[30%] left-[27%] w-[10%] h-[18%] rounded-full transform -rotate-12" style={{ backgroundColor: colors.accent }}></div>
            <div className="absolute top-[30%] right-[27%] w-[10%] h-[18%] rounded-full transform rotate-12" style={{ backgroundColor: colors.accent }}></div>
            
            {/* Dog muzzle - cute snout */}
            <div className="absolute top-[48%] left-[36%] w-[28%] h-[22%] rounded-b-[50%]" style={{ backgroundColor: colors.secondary }}></div>
            
            {/* Dog nose */}
            <div className="absolute top-[48%] left-[43%] w-[14%] h-[8%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
            
            {/* Dog eyes - open eyes */}
            {!blink && (
              <>
                <div className="absolute top-[40%] left-[36%] w-[8%] h-[10%] rounded-full" style={{ backgroundColor: "white" }}></div>
                <div className="absolute top-[40%] right-[36%] w-[8%] h-[10%] rounded-full" style={{ backgroundColor: "white" }}></div>
                
                {/* Pupils */}
                <div className="absolute top-[41%] left-[37%] w-[6%] h-[8%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                <div className="absolute top-[41%] right-[37%] w-[6%] h-[8%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                
                {/* Eye highlights */}
                <div className="absolute top-[41%] left-[38%] w-[2%] h-[3%] rounded-full bg-white"></div>
                <div className="absolute top-[41%] right-[38%] w-[2%] h-[3%] rounded-full bg-white"></div>
              </>
            )}
            
            {/* Dog blinking */}
            {blink && (
              <>
                <div className="absolute top-[42%] left-[36%] w-[8%] h-[1px] bg-[#302e2e]"></div>
                <div className="absolute top-[42%] right-[36%] w-[8%] h-[1px] bg-[#302e2e]"></div>
              </>
            )}
            
            {/* Dog mouth */}
            <div className="absolute top-[58%] left-[46%] w-[8%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[60%] left-[42%] w-[16%] h-[2%] rounded-b-full border-b border-[#302e2e]" style={{ borderBottomWidth: "1px" }}></div>
            
            {/* Dog tongue */}
            <div className="absolute top-[60%] left-[47%] w-[6%] h-[4%] rounded-b-full" style={{ backgroundColor: "#ff99aa" }}></div>
            
            {/* Dog paws */}
            <div className="absolute bottom-[8%] left-[34%] w-[8%] h-[6%] rounded-b-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute bottom-[8%] right-[34%] w-[8%] h-[6%] rounded-b-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Dog tail - wagging */}
            <div className="absolute top-[66%] right-[24%] w-[10%] h-[8%] rounded-full transform rotate-[-20deg]" style={{ backgroundColor: colors.main }}></div>
          </div>
        );
        
      case "rabbit":
        return (
          <div className="relative size-full">
            {/* Rabbit body - small round body */}
            <div className="absolute top-[68%] left-[32%] w-[36%] h-[14%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Rabbit head - extra large round head */}
            <div className="absolute top-[38%] left-[30%] w-[40%] h-[38%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Rabbit ears - tall floppy ears */}
            <div className="absolute top-[6%] left-[38%] w-[8%] h-[36%] rounded-t-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute top-[6%] right-[38%] w-[8%] h-[36%] rounded-t-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Rabbit inner ears */}
            <div className="absolute top-[8%] left-[39%] w-[6%] h-[32%] rounded-t-full" style={{ backgroundColor: colors.accent }}></div>
            <div className="absolute top-[8%] right-[39%] w-[6%] h-[32%] rounded-t-full" style={{ backgroundColor: colors.accent }}></div>
            
            {/* Rabbit muzzle */}
            <div className="absolute top-[54%] left-[36%] w-[28%] h-[16%] rounded-full" style={{ backgroundColor: colors.secondary }}></div>
            
            {/* Rabbit eyes - open eyes */}
            {!blink && (
              <>
                <div className="absolute top-[46%] left-[36%] w-[9%] h-[11%] rounded-full" style={{ backgroundColor: "white" }}></div>
                <div className="absolute top-[46%] right-[36%] w-[9%] h-[11%] rounded-full" style={{ backgroundColor: "white" }}></div>
                
                {/* Pupils */}
                <div className="absolute top-[47%] left-[37%] w-[7%] h-[9%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                <div className="absolute top-[47%] right-[37%] w-[7%] h-[9%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                
                {/* Eye highlights */}
                <div className="absolute top-[47%] left-[38%] w-[3%] h-[4%] rounded-full bg-white"></div>
                <div className="absolute top-[47%] right-[38%] w-[3%] h-[4%] rounded-full bg-white"></div>
              </>
            )}
            
            {/* Rabbit blinking */}
            {blink && (
              <>
                <div className="absolute top-[48%] left-[36%] w-[9%] h-[1px] bg-[#302e2e]"></div>
                <div className="absolute top-[48%] right-[36%] w-[9%] h-[1px] bg-[#302e2e]"></div>
              </>
            )}
            
            {/* Rabbit nose - small pink nose */}
            <div className="absolute top-[56%] left-[48%] w-[4%] h-[4%] rounded-full" style={{ backgroundColor: "#ff99aa" }}></div>
            
            {/* Rabbit mouth - tiny smiling mouth */}
            <div className="absolute top-[60%] left-[46%] w-[8%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[61%] left-[48%] w-[4%] h-[2%] border-b border-[#302e2e]" style={{ borderBottomWidth: "1px", borderRadius: "0 0 100% 100%" }}></div>
            
            {/* Rabbit whiskers */}
            <div className="absolute top-[56%] left-[30%] w-[8%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[58%] left-[32%] w-[7%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[60%] left-[34%] w-[6%] h-[1px] bg-[#302e2e]"></div>
            
            <div className="absolute top-[56%] right-[30%] w-[8%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[58%] right-[32%] w-[7%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[60%] right-[34%] w-[6%] h-[1px] bg-[#302e2e]"></div>
            
            {/* Rabbit paws */}
            <div className="absolute bottom-[10%] left-[38%] w-[8%] h-[6%] rounded-b-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute bottom-[10%] right-[38%] w-[8%] h-[6%] rounded-b-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Rabbit tail - tiny puff ball */}
            <div className="absolute top-[78%] left-[48%] w-[8%] h-[8%] rounded-full" style={{ backgroundColor: "white" }}></div>
          </div>
        );
        
      case "bear":
        return (
          <div className="relative size-full">
            {/* Bear body - round tummy */}
            <div className="absolute top-[68%] left-[28%] w-[44%] h-[18%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Bear head - extra large round head */}
            <div className="absolute top-[35%] left-[30%] w-[40%] h-[40%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Bear ears - small round ears */}
            <div className="absolute top-[26%] left-[32%] w-[11%] h-[11%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute top-[26%] right-[32%] w-[11%] h-[11%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Bear inner ears */}
            <div className="absolute top-[28%] left-[34%] w-[7%] h-[7%] rounded-full" style={{ backgroundColor: colors.accent }}></div>
            <div className="absolute top-[28%] right-[34%] w-[7%] h-[7%] rounded-full" style={{ backgroundColor: colors.accent }}></div>
            
            {/* Bear muzzle */}
            <div className="absolute top-[50%] left-[36%] w-[28%] h-[20%] rounded-full" style={{ backgroundColor: colors.secondary }}></div>
            
            {/* Bear eyes - open eyes */}
            {!blink && (
              <>
                <div className="absolute top-[44%] left-[35%] w-[8%] h-[9%] rounded-full" style={{ backgroundColor: "white" }}></div>
                <div className="absolute top-[44%] right-[35%] w-[8%] h-[9%] rounded-full" style={{ backgroundColor: "white" }}></div>
                
                {/* Pupils */}
                <div className="absolute top-[45%] left-[36%] w-[6%] h-[7%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                <div className="absolute top-[45%] right-[36%] w-[6%] h-[7%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                
                {/* Eye highlights */}
                <div className="absolute top-[45%] left-[37%] w-[2%] h-[3%] rounded-full bg-white"></div>
                <div className="absolute top-[45%] right-[37%] w-[2%] h-[3%] rounded-full bg-white"></div>
              </>
            )}
            
            {/* Bear blinking */}
            {blink && (
              <>
                <div className="absolute top-[46%] left-[35%] w-[8%] h-[1px] bg-[#302e2e]"></div>
                <div className="absolute top-[46%] right-[35%] w-[8%] h-[1px] bg-[#302e2e]"></div>
              </>
            )}
            
            {/* Bear nose - big cute nose */}
            <div className="absolute top-[52%] left-[44%] w-[12%] h-[10%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
            <div className="absolute top-[53%] left-[45%] w-[3%] h-[3%] rounded-full bg-white"></div>
            
            {/* Bear mouth */}
            <div className="absolute top-[62%] left-[48%] w-[4%] h-[4%] border-b border-[#302e2e]" style={{ borderBottomWidth: "1px" }}></div>
            <div className="absolute top-[64%] left-[42%] w-[16%] h-[3%] rounded-b-full border-b border-[#302e2e]" style={{ borderBottomWidth: "1px" }}></div>
            
            {/* Bear paws */}
            <div className="absolute bottom-[6%] left-[32%] w-[10%] h-[8%] rounded-b-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute bottom-[6%] right-[32%] w-[10%] h-[8%] rounded-b-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Bear claws */}
            <div className="absolute bottom-[4%] left-[33%] w-[2%] h-[2%] bg-[#302e2e]"></div>
            <div className="absolute bottom-[4%] left-[36%] w-[2%] h-[2%] bg-[#302e2e]"></div>
            <div className="absolute bottom-[4%] left-[39%] w-[2%] h-[2%] bg-[#302e2e]"></div>
            
            <div className="absolute bottom-[4%] right-[33%] w-[2%] h-[2%] bg-[#302e2e]"></div>
            <div className="absolute bottom-[4%] right-[36%] w-[2%] h-[2%] bg-[#302e2e]"></div>
            <div className="absolute bottom-[4%] right-[39%] w-[2%] h-[2%] bg-[#302e2e]"></div>
          </div>
        );
        
      case "fox":
        return (
          <div className="relative size-full">
            {/* Fox body - small body */}
            <div className="absolute top-[68%] left-[32%] w-[36%] h-[16%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Fox head - large pointed head */}
            <div className="absolute top-[40%] left-[25%] w-[50%] h-[32%]" 
                style={{ 
                  backgroundColor: colors.main,
                  borderRadius: "50% 50% 60% 60%" 
                }}>
            </div>
            
            {/* Fox ears - pointy cute ears */}
            <div className="absolute top-[24%] left-[34%] w-[10%] h-[18%]" 
                style={{ 
                  backgroundColor: colors.main, 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                }}>
            </div>
            <div className="absolute top-[24%] right-[34%] w-[10%] h-[18%]" 
                style={{ 
                  backgroundColor: colors.main, 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                }}>
            </div>
            
            {/* Fox inner ears */}
            <div className="absolute top-[26%] left-[35%] w-[8%] h-[14%]" 
                style={{ 
                  backgroundColor: colors.accent, 
                  clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)' 
                }}>
            </div>
            <div className="absolute top-[26%] right-[35%] w-[8%] h-[14%]" 
                style={{ 
                  backgroundColor: colors.accent, 
                  clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)' 
                }}>
            </div>
            
            {/* Fox face - white muzzle */}
            <div className="absolute top-[48%] left-[36%] w-[28%] h-[20%]" 
                style={{ 
                  backgroundColor: colors.secondary,
                  borderRadius: "30% 30% 60% 60%" 
                }}>
            </div>
            
            {/* Fox eyes - open eyes */}
            {!blink && (
              <>
                <div className="absolute top-[44%] left-[36%] w-[8%] h-[10%] rounded-full" style={{ backgroundColor: "white" }}></div>
                <div className="absolute top-[44%] right-[36%] w-[8%] h-[10%] rounded-full" style={{ backgroundColor: "white" }}></div>
                
                {/* Pupils - angular for fox */}
                <div className="absolute top-[45%] left-[37%] w-[6%] h-[6%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                <div className="absolute top-[45%] right-[37%] w-[6%] h-[6%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                
                {/* Eye highlights */}
                <div className="absolute top-[45%] left-[38%] w-[2%] h-[3%] rounded-full bg-white"></div>
                <div className="absolute top-[45%] right-[38%] w-[2%] h-[3%] rounded-full bg-white"></div>
              </>
            )}
            
            {/* Fox blinking */}
            {blink && (
              <>
                <div className="absolute top-[46%] left-[36%] w-[8%] h-[1px] bg-[#302e2e]"></div>
                <div className="absolute top-[46%] right-[36%] w-[8%] h-[1px] bg-[#302e2e]"></div>
              </>
            )}
            
            {/* Fox nose - small black nose */}
            <div className="absolute top-[54%] left-[48%] w-[4%] h-[4%]" 
                style={{ 
                  backgroundColor: "#302e2e", 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                }}>
            </div>
            
            {/* Fox mouth - tiny smile */}
            <div className="absolute top-[58%] left-[48%] w-[4%] h-[4%] border-b border-[#302e2e]" style={{ borderBottomWidth: "1px" }}></div>
            <div className="absolute top-[60%] left-[44%] w-[12%] h-[2%] rounded-b-full border-b border-[#302e2e]" style={{ borderBottomWidth: "1px" }}></div>
            
            {/* Fox paws */}
            <div className="absolute bottom-[8%] left-[36%] w-[7%] h-[5%] rounded-b-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute bottom-[8%] right-[36%] w-[7%] h-[5%] rounded-b-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Fox signature bushy tail */}
            <div className="absolute top-[60%] right-[22%] w-[20%] h-[14%] rounded-r-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute top-[61%] right-[24%] w-[16%] h-[10%] rounded-r-full" style={{ backgroundColor: colors.highlight }}></div>
            <div className="absolute top-[62%] right-[20%] w-[6%] h-[6%] rounded-r-full" style={{ backgroundColor: "white" }}></div>
          </div>
        );
        
      case "deer":
        return (
          <div className="relative size-full">
            {/* Deer body - slim body */}
            <div className="absolute top-[68%] left-[32%] w-[36%] h-[14%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Deer head - oval head */}
            <div className="absolute top-[38%] left-[32%] w-[36%] h-[32%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Deer antlers */}
            <div className="absolute top-[16%] left-[38%] w-[2%] h-[24%]" style={{ backgroundColor: colors.accent }}></div>
            <div className="absolute top-[16%] right-[38%] w-[2%] h-[24%]" style={{ backgroundColor: colors.accent }}></div>
            
            <div className="absolute top-[22%] left-[36%] w-[6%] h-[2%]" style={{ backgroundColor: colors.accent }}></div>
            <div className="absolute top-[22%] right-[36%] w-[6%] h-[2%]" style={{ backgroundColor: colors.accent }}></div>
            
            <div className="absolute top-[28%] left-[36%] w-[7%] h-[2%]" style={{ backgroundColor: colors.accent }}></div>
            <div className="absolute top-[28%] right-[36%] w-[7%] h-[2%]" style={{ backgroundColor: colors.accent }}></div>
            
            {/* Deer ears */}
            <div className="absolute top-[38%] left-[26%] w-[8%] h-[14%] rounded-full transform -rotate-12" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute top-[38%] right-[26%] w-[8%] h-[14%] rounded-full transform rotate-12" style={{ backgroundColor: colors.main }}></div>
            
            {/* Deer inner ears */}
            <div className="absolute top-[39%] left-[27%] w-[6%] h-[10%] rounded-full transform -rotate-12" style={{ backgroundColor: colors.highlight }}></div>
            <div className="absolute top-[39%] right-[27%] w-[6%] h-[10%] rounded-full transform rotate-12" style={{ backgroundColor: colors.highlight }}></div>
            
            {/* Deer face markings - cute white face */}
            <div className="absolute top-[48%] left-[38%] w-[24%] h-[16%] rounded-b-full" style={{ backgroundColor: colors.secondary }}></div>
            
            {/* Deer eyes - open eyes */}
            {!blink && (
              <>
                <div className="absolute top-[46%] left-[34%] w-[9%] h-[10%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                <div className="absolute top-[46%] right-[34%] w-[9%] h-[10%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                
                {/* Eye highlights */}
                <div className="absolute top-[47%] left-[36%] w-[3%] h-[4%] rounded-full bg-white"></div>
                <div className="absolute top-[47%] right-[36%] w-[3%] h-[4%] rounded-full bg-white"></div>
              </>
            )}
            
            {/* Deer blinking */}
            {blink && (
              <>
                <div className="absolute top-[48%] left-[34%] w-[9%] h-[1px] bg-[#302e2e]"></div>
                <div className="absolute top-[48%] right-[34%] w-[9%] h-[1px] bg-[#302e2e]"></div>
              </>
            )}
            
            {/* Deer nose - small black nose */}
            <div className="absolute top-[54%] left-[46%] w-[8%] h-[5%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
            
            {/* Deer legs - thin and delicate */}
            <div className="absolute bottom-[8%] left-[36%] w-[3%] h-[18%]" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute bottom-[8%] right-[36%] w-[3%] h-[18%]" style={{ backgroundColor: colors.main }}></div>
            
            {/* Deer hooves */}
            <div className="absolute bottom-[2%] left-[36%] w-[3%] h-[3%]" style={{ backgroundColor: "#302e2e" }}></div>
            <div className="absolute bottom-[2%] right-[36%] w-[3%] h-[3%]" style={{ backgroundColor: "#302e2e" }}></div>
            
            {/* Deer spots */}
            <div className="absolute top-[70%] left-[38%] w-[4%] h-[4%] rounded-full" style={{ backgroundColor: "white" }}></div>
            <div className="absolute top-[72%] right-[38%] w-[4%] h-[4%] rounded-full" style={{ backgroundColor: "white" }}></div>
            <div className="absolute top-[64%] left-[44%] w-[4%] h-[4%] rounded-full" style={{ backgroundColor: "white" }}></div>
            
            {/* Deer tail - tiny poof */}
            <div className="absolute top-[68%] right-[30%] w-[4%] h-[4%] rounded-full" style={{ backgroundColor: "white" }}></div>
          </div>
        );
        
      case "owl":
        return (
          <div className="relative size-full">
            {/* Owl body - round body */}
            <div className="absolute top-[60%] left-[30%] w-[40%] h-[30%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Owl head - big round head */}
            <div className="absolute top-[32%] left-[30%] w-[40%] h-[36%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Owl ear tufts */}
            <div className="absolute top-[20%] left-[36%] w-[8%] h-[14%]" 
                style={{ 
                  backgroundColor: colors.main, 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                }}>
            </div>
            <div className="absolute top-[20%] right-[36%] w-[8%] h-[14%]" 
                style={{ 
                  backgroundColor: colors.main, 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                }}>
            </div>
            
            {/* Owl face disk - heart-shaped face */}
            <div className="absolute top-[36%] left-[26%] w-[48%] h-[28%] rounded-full" style={{ backgroundColor: colors.secondary }}></div>
            
            {/* Owl eyes - huge eyes */}
            {!blink && (
              <>
                <div className="absolute top-[42%] left-[34%] w-[13%] h-[15%] rounded-full" style={{ backgroundColor: colors.accent }}></div>
                <div className="absolute top-[42%] right-[34%] w-[13%] h-[15%] rounded-full" style={{ backgroundColor: colors.accent }}></div>
                
                {/* Owl pupils - big black pupils */}
                <div className="absolute top-[44%] left-[36%] w-[9%] h-[11%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                <div className="absolute top-[44%] right-[36%] w-[9%] h-[11%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                
                {/* Eye highlights */}
                <div className="absolute top-[45%] left-[37%] w-[3%] h-[4%] rounded-full bg-white"></div>
                <div className="absolute top-[45%] right-[37%] w-[3%] h-[4%] rounded-full bg-white"></div>
                <div className="absolute top-[47%] left-[38%] w-[2%] h-[2%] rounded-full bg-white"></div>
                <div className="absolute top-[47%] right-[38%] w-[2%] h-[2%] rounded-full bg-white"></div>
              </>
            )}
            
            {/* Owl blinking */}
            {blink && (
              <>
                <div className="absolute top-[46%] left-[34%] w-[13%] h-[2%] rounded-full bg-[#302e2e]"></div>
                <div className="absolute top-[46%] right-[34%] w-[13%] h-[2%] rounded-full bg-[#302e2e]"></div>
              </>
            )}
            
            {/* Owl beak - triangle beak */}
            <div className="absolute top-[54%] left-[46%] w-[8%] h-[7%]" 
                style={{ 
                  backgroundColor: "#e6b800", 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                }}>
            </div>
            
            {/* Wing markings */}
            <div className="absolute top-[68%] left-[34%] w-[32%] h-[2%]" style={{ backgroundColor: colors.secondary }}></div>
            <div className="absolute top-[72%] left-[34%] w-[32%] h-[2%]" style={{ backgroundColor: colors.secondary }}></div>
            <div className="absolute top-[76%] left-[34%] w-[32%] h-[2%]" style={{ backgroundColor: colors.secondary }}></div>
            
            {/* Owl feet */}
            <div className="absolute bottom-[4%] left-[40%] w-[4%] h-[8%]" style={{ backgroundColor: "#e6b800" }}></div>
            <div className="absolute bottom-[4%] right-[40%] w-[4%] h-[8%]" style={{ backgroundColor: "#e6b800" }}></div>
            <div className="absolute bottom-[2%] left-[38%] w-[8%] h-[2%]" style={{ backgroundColor: "#e6b800" }}></div>
            <div className="absolute bottom-[2%] right-[38%] w-[8%] h-[2%]" style={{ backgroundColor: "#e6b800" }}></div>
          </div>
        );
        
      case "raccoon":
        return (
          <div className="relative size-full">
            {/* Raccoon body - round body */}
            <div className="absolute top-[68%] left-[32%] w-[36%] h-[16%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Raccoon head - big round head */}
            <div className="absolute top-[36%] left-[30%] w-[40%] h-[36%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Raccoon ears - round ears */}
            <div className="absolute top-[26%] left-[32%] w-[9%] h-[9%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute top-[26%] right-[32%] w-[9%] h-[9%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            
            {/* Raccoon face mask - iconic bandit mask */}
            <div className="absolute top-[38%] left-[28%] w-[44%] h-[16%] bg-[#302e2e]"></div>
            
            {/* Raccoon eyes - white patches around eyes */}
            <div className="absolute top-[38%] left-[34%] w-[12%] h-[14%] rounded-full" style={{ backgroundColor: "white" }}></div>
            <div className="absolute top-[38%] right-[34%] w-[12%] h-[14%] rounded-full" style={{ backgroundColor: "white" }}></div>
            
            {/* Raccoon actual eyes */}
            {!blink && (
              <>
                <div className="absolute top-[42%] left-[36%] w-[8%] h-[8%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                <div className="absolute top-[42%] right-[36%] w-[8%] h-[8%] rounded-full" style={{ backgroundColor: "#302e2e" }}></div>
                
                {/* Eye highlights */}
                <div className="absolute top-[42%] left-[37%] w-[3%] h-[3%] rounded-full bg-white"></div>
                <div className="absolute top-[42%] right-[37%] w-[3%] h-[3%] rounded-full bg-white"></div>
              </>
            )}
            
            {/* Raccoon blinking */}
            {blink && (
              <>
                <div className="absolute top-[44%] left-[36%] w-[8%] h-[1px] bg-white"></div>
                <div className="absolute top-[44%] right-[36%] w-[8%] h-[1px] bg-white"></div>
              </>
            )}
            
            {/* Raccoon nose */}
            <div className="absolute top-[52%] left-[46%] w-[8%] h-[6%] rounded-full bg-[#302e2e]"></div>
            
            {/* Raccoon mouth - cute smile */}
            <div className="absolute top-[58%] left-[46%] w-[8%] h-[1px] bg-[#302e2e]"></div>
            <div className="absolute top-[60%] left-[42%] w-[16%] h-[2%] rounded-b-full border-b border-[#302e2e]" style={{ borderBottomWidth: "1px" }}></div>
            
            {/* Raccoon paws */}
            <div className="absolute bottom-[8%] left-[36%] w-[8%] h-[5%] rounded-b-full" style={{ backgroundColor: colors.accent }}></div>
            <div className="absolute bottom-[8%] right-[36%] w-[8%] h-[5%] rounded-b-full" style={{ backgroundColor: colors.accent }}></div>
            
            {/* Raccoon tail - striped curvy tail */}
            <div className="absolute top-[66%] right-[22%] w-[16%] h-[10%] rounded-r-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute top-[68%] right-[24%] w-[12%] h-[2%] bg-[#302e2e]"></div>
            <div className="absolute top-[71%] right-[24%] w-[12%] h-[2%] bg-[#302e2e]"></div>
          </div>
        );
      default:
        return (
          <div className="relative size-full">
            {/* Default cute critter - smiley ball */}
            <div className="absolute inset-[20%] rounded-full" style={{ backgroundColor: colors.main }}></div>
            <div className="absolute top-[40%] left-[30%] w-[10%] h-[10%] rounded-full bg-white"></div>
            <div className="absolute top-[40%] right-[30%] w-[10%] h-[10%] rounded-full bg-white"></div>
            <div className="absolute top-[41%] left-[31%] w-[8%] h-[8%] rounded-full bg-black"></div>
            <div className="absolute top-[41%] right-[31%] w-[8%] h-[8%] rounded-full bg-black"></div>
            <div className="absolute bottom-[36%] left-[40%] w-[20%] h-[8%] rounded-full border-b-2 border-black" style={{ borderBottomWidth: "2px" }}></div>
          </div>
        );
    }
  };
  
  return (
    <div className={`${sizeClasses[size]} relative pixelated pixel-art pixel-blocky ${wiggle ? 'animate-wiggle' : ''} ${bounce ? 'animate-float' : ''}`}
         style={{ 
           imageRendering: 'pixelated',
           shapeRendering: 'crispEdges'
         }}>
      {renderPixelAnimal()}
    </div>
  );
};