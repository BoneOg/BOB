import React from 'react';
import { motion } from 'framer-motion';

interface PopoutProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  [key: string]: any; // For additional props like href, onClick, etc.
}

const Popout: React.FC<PopoutProps> = ({ 
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
        stiffness: 350,
        damping: 12 // More bounce than the circle
      }}
    >
      <Component className={className} {...props}>
        {children}
      </Component>
    </motion.div>
  );
};

export default Popout;