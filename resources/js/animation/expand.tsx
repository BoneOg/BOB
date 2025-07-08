import React from 'react';
import { motion } from 'framer-motion';

interface PopProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  as?: any; // For Inertia Link component
  [key: string]: any; // For additional props
}

const Pop: React.FC<PopProps> = ({ 
  children, 
  className = '', 
  as: Component = 'div',
  ...props 
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        transition: { 
          duration: 0.2, 
          ease: "easeOut" 
        }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { 
          duration: 0.1, 
          ease: "easeInOut" 
        }
      }}
      className={className}
    >
      <Component {...props}>
        {children}
      </Component>
    </motion.div>
  );
};

export default Pop;