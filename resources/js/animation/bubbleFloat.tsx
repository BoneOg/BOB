import React, { useState } from 'react';
import { motion } from 'motion/react';

interface BubbleFloatProps {
  text: string;
  className?: string;
  isActive?: boolean;
  activeIcon?: React.ReactNode;
}

const BubbleFloat: React.FC<BubbleFloatProps> = ({ 
  text, 
  className = '', 
  isActive = false,
  activeIcon 
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Gentle floating motion for letters
  const getLetterY = (index: number): number => {
    if (hoveredIndex === null) return 0;
    
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return -3; // Main letter floats highest
    if (distance === 1) return -2; // Adjacent letters float gently
    if (distance === 2) return -1; // Subtle movement for nearby letters
    return 0;
  };

  // Soft scaling like bubbles expanding
  const getLetterScale = (index: number): number => {
  if (hoveredIndex === null) return 1;
  
  const distance = Math.abs(hoveredIndex - index);
  if (distance === 0) return 1.10; // Gentle scaling
  if (distance === 1) return 1.06; // Medium expansion  
  if (distance === 2) return 1.03; // Subtle expansion
  return 1;
  };

  // Simple opacity for glow effect
  const getLetterOpacity = (index: number): number => {
    if (hoveredIndex === null) return 1;
    
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1;
    if (distance === 1) return 0.9;
    if (distance === 2) return 0.8;
    return 0.7;
  };

  return (
    <div 
      className={`flex items-center justify-center gap-1 ${className}`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Active icon with gentle animation */}
      {isActive && activeIcon && (
        <motion.div
          animate={{
            scale: hoveredIndex !== null ? 1.08 : 1,
            rotate: hoveredIndex !== null ? 3 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
        >
          {activeIcon}
        </motion.div>
      )}
      
      {/* Letters with bubble float effect */}
      <div className="flex">
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            animate={{
              y: getLetterY(index),
              scale: getLetterScale(index),
              opacity: getLetterOpacity(index),
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 0.6,
            }}
            style={{
              transformOrigin: 'center bottom',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default BubbleFloat;