import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { animate } from 'animejs';
import { Link } from '@inertiajs/react';
import Expand from './expand';
import PopoutSoft from './popoutsoft';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface SlideProps {
  onSlideChange?: (currentIndex: number) => void;
}

export interface SlideRef {
  slideNext: () => void;
  slidePrev: () => void;
  currentIndex: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "peridust body lotion",
    description: "A delicate blend of weightless moisture and soft glow. Designed to melt into your skin like fairy dust, leaving it smooth, luminous, and gently scented.",
    image: "/assets/mockups/lotion.webp"
  },
  {
    id: 2,
    name: "peridust moisturizing cream",
    description: "experience deeply hydrated and nourished skin. this rich yet lightweight cream replenishes moisture, leaving your complexion soft, smooth, and revitalized.",
    image: "/assets/mockups/jar.webp"
  },
  {
    id: 3,
    name: "peridust sunscreen",
    description: "your everyday essential for sun protection. this lightweight, non-greasy formula provides broad spectrum spf 30 to shield your skin from harmful uva and uvb rays. perfect for daily wear.",
    image: "/assets/mockups/sunscreen.webp"
  }
];

const Slide = forwardRef<SlideRef, SlideProps>(({ onSlideChange }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    slideNext,
    slidePrev,
    currentIndex
  }));

  const slideNext = () => {
    if (isAnimating) return;
    
    const nextIndex = (currentIndex + 1) % products.length;
    animateSlide('next', nextIndex);
  };

  const slidePrev = () => {
    if (isAnimating) return;
    
    const prevIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    animateSlide('prev', prevIndex);
  };

  const animateSlide = (direction: 'next' | 'prev', newIndex: number) => {
    if (!containerRef.current) return;
    
    setIsAnimating(true);
    
    const currentProduct = productRefs.current[currentIndex];
    const nextProduct = productRefs.current[newIndex];
    
    if (!currentProduct || !nextProduct) return;

    // Set initial position for incoming product
    if (direction === 'next') {
      // Coming from right
      animate(nextProduct, {
        translateX: '100%',
        opacity: 0,
        duration: 0
      });
    } else {
      // Coming from left
      animate(nextProduct, {
        translateX: '-100%',
        opacity: 0,
        duration: 0
      });
    }

    // Make next product visible
    nextProduct.style.display = 'flex';

    // Animate current product out
    animate(currentProduct, {
      translateX: direction === 'next' ? '-100%' : '100%',
      opacity: 0,
      duration: 600,
      easing: 'easeInOutQuart'
    });

    // Animate next product in with rubber band effect
    animate(nextProduct, {
      translateX: [
        direction === 'next' ? '100%' : '-100%', // Start position
        direction === 'next' ? '-5%' : '5%',     // Overshoot
        '0%'                                      // Final position
      ],
      opacity: [0, 1, 1],
      duration: 800,
      easing: 'easeOutElastic(1, .8)',
      complete: () => {
        // Hide previous product
        currentProduct.style.display = 'none';
        
        // Reset transform for current product
        animate(currentProduct, {
          translateX: '0%',
          opacity: 1,
          duration: 0
        });
        
        setCurrentIndex(newIndex);
        setIsAnimating(false);
        onSlideChange?.(newIndex);
      }
    });
  };

  useEffect(() => {
    // Initialize - show only first product
    productRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.display = index === 0 ? 'flex' : 'none';
        ref.style.transform = 'translateX(0%)';
        ref.style.opacity = '1';
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-center relative w-full h-full">
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={el => { productRefs.current[index] = el; }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ display: index === 0 ? 'flex' : 'none' }}
        >
          {/* Mockup Product with PopoutSoft animation */}
          <PopoutSoft delay={1.3}>
            <div className="relative">
              <img 
                src={product.image}
                alt={`${product.name} Mockup`}
                className="h-[620px] w-auto object-contain"
              />
            </div>
          </PopoutSoft>

          {/* Product Info - Responsive positioning and sizing */}
          <div className="ml-12 text-left max-w-[500px]">
            {/* Product Name with PopoutSoft animation */}
            <PopoutSoft delay={1.6}>
              <h2 
                className="text-white text-[32px] font-semibold "
                style={{
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                {product.name}
              </h2>
            </PopoutSoft>

            {/* Product Description with PopoutSoft animation */}
            <PopoutSoft delay={1.9}>
              <p 
                className="text-white text-[20px] font-normal leading-relaxed mb-5"
                style={{
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                {product.description}
              </p>
            </PopoutSoft>

            {/* Shop Now Button with PopoutSoft animation */}
            <PopoutSoft delay={2.2}>
              <Expand
                as={Link}
                href="/shop"
                className="w-[120px] w-[150px] h-[50px] bg-[#6666FF] text-white rounded-full shadow-sm flex items-center justify-center text-[20px] font-regular hover:shadow-lg transition-shadow duration-200"
              >
                shop now
              </Expand>
            </PopoutSoft>
          </div>
        </div>
      ))}
    </div>
  );
});

Slide.displayName = 'Slide';
export default Slide;