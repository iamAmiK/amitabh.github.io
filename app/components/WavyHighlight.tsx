"use client";

import { useEffect, useRef, useState } from "react";

interface WavyHighlightProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function WavyHighlight({ children, delay = 0, className = "" }: WavyHighlightProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (spanRef.current) {
      observer.observe(spanRef.current);
    }

    return () => observer.disconnect();
  }, [delay, hasAnimated]);

  useEffect(() => {
    if (!isVisible || !spanRef.current) return;

    const highlightElements: HTMLDivElement[] = [];
    let animationComplete = false;

    const createHighlights = () => {
      if (!spanRef.current) return;
      
      const rects = Array.from(spanRef.current.getClientRects());
      
      rects.forEach((rect, index) => {
        const highlight = document.createElement('div');
        highlight.classList.add('wavy-highlight-background');
        
        // Position relative to the document, not viewport
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        highlight.style.position = 'absolute';
        highlight.style.top = (rect.top + scrollTop) + 'px';
        highlight.style.left = (rect.left + scrollLeft) + 'px';
        highlight.style.width = rect.width + 'px';
        highlight.style.height = rect.height + 'px';
        highlight.style.background = 'rgba(167, 139, 250, 0.25)';
        highlight.style.padding = '0.2em 0.2em';
        highlight.style.transform = 'translate(-0.2em, -0.2em) skew(2deg, 0)';
        highlight.style.filter = 'url(#wavyHighlight)';
        highlight.style.zIndex = '-1';
        highlight.style.pointerEvents = 'none';
        highlight.style.borderRadius = '4px';
        
        // Start with width 0 for growing animation
        highlight.style.clipPath = 'inset(0 100% 0 0)';
        highlight.style.transition = 'clip-path 1.5s ease-out';
        
        document.body.appendChild(highlight);
        highlightElements.push(highlight);
        
        // Trigger growing animation for each line with staggered delay
        setTimeout(() => {
          highlight.style.clipPath = 'inset(0 0% 0 0)';
          
          // Mark animation as complete after the last element finishes
          if (index === rects.length - 1) {
            setTimeout(() => {
              animationComplete = true;
            }, 1500); // Match the new transition duration
          }
        }, index * 200); // Increased stagger delay to 200ms
      });
    };

    const updateHighlightPositions = () => {
      if (!spanRef.current || !animationComplete || highlightElements.length === 0) return;
      
      const rects = Array.from(spanRef.current.getClientRects());
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      highlightElements.forEach((highlight, index) => {
        if (rects[index]) {
          const rect = rects[index];
          highlight.style.top = (rect.top + scrollTop) + 'px';
          highlight.style.left = (rect.left + scrollLeft) + 'px';
          highlight.style.width = rect.width + 'px';
          highlight.style.height = rect.height + 'px';
        }
      });
    };

    // Create highlights after a short delay to ensure text is rendered
    setTimeout(createHighlights, 300);
    
    // Only update positions on resize/scroll, don't recreate
    window.addEventListener('resize', updateHighlightPositions);
    window.addEventListener('scroll', updateHighlightPositions);
    
    return () => {
      window.removeEventListener('resize', updateHighlightPositions);
      window.removeEventListener('scroll', updateHighlightPositions);
      highlightElements.forEach(el => el.remove());
    };
  }, [isVisible, hasAnimated]);

  return (
    <>
      {/* SVG Filter for wavy effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} xmlns="http://www.w3.org/2000/svg">
        <filter id="wavyHighlight" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" seed="1" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
        </filter>
      </svg>
      
      <span ref={spanRef} className={className}>
        {children}
      </span>
    </>
  );
}
