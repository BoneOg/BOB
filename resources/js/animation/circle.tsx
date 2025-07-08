import React from 'react';
import { motion } from 'framer-motion';

interface CircleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const Circle: React.FC<CircleProps> = ({ 
  children, 
  className = "", 
  delay = 0.3 
}) => {
  return (
    <div className="relative">
      {/* Expanding pill background */}
      <motion.div
        initial={{ 
          width: 60, // Small pill width to start
          height: 50,
          borderRadius: "25px", // Already pill-shaped
          scale: 0 // Start invisible
        }}
        animate={{ 
          width: 550, // Expand to full width
          height: 50,
          borderRadius: "25px", // Maintain pill shape
          scale: 1 // Pop into view
        }}
        transition={{
          scale: {
            duration: 0.4,
            delay: delay,
            type: "spring",
            stiffness: 400,
            damping: 15 // Bouncy pop effect
          },
          width: {
            duration: 0.6,
            delay: delay + 0.2, // Start expanding after pop
            type: "spring",
            stiffness: 300,
            damping: 25
          }
        }}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-sm ${className}`}
      />
      
      {/* Content that fades in after expansion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: delay + 0.7, // Fade in when expansion is almost complete
          ease: "easeOut"
        }}
        className="relative z-10 w-[550px] h-[50px]"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Circle;