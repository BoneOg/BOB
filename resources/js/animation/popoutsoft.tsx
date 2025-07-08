import React from 'react';
import { motion } from 'framer-motion';

interface PopoutSoftProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  [key: string]: any; // For additional props like href, onClick, etc.
}

const PopoutSoft: React.FC<PopoutSoftProps> = ({ 
  children, 
  as: Component = "div",
  className = "", 
  delay = 0.8,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ 
        scale: 0,
        opacity: 0
      }}
      animate={{ 
        scale: 1,
        opacity: 1
      }}
      transition={{
        duration: 0.5,
        delay: delay,
        type: "spring",
        stiffness: 250,  // Lower stiffness (was 350)
        damping: 20      // Higher damping (was 12) - less bounce
      }}
    >
      <Component className={className} {...props}>
        {children}
      </Component>
    </motion.div>
  );
};

export default PopoutSoft;