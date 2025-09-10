"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Yes, I most definitely over engineered this website...",
  "Check this out on desktop for a more interactive experience!",
  "I hope you're having a wonderful day :)",
  "Yes, my favourite colour is purple, how could you tell!",
  "Refresh to see new branches in the background.",
  "The logo is my intials 'ak' "
];

export function SpeechBubble() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 10000); // Change message every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute right-2 top-4 z-10 md:right-0 md:top-2 lg:-right-2 lg:top-0">
      <style jsx>{`
        .pixel-bubble {
          position: relative;
          display: inline-block;
          text-align: center;
          font-family: monospace;
          font-size: 12px;
          line-height: 1.3em;
          background-color: white;
          color: black;
          padding: 12px;
          width: 200px;
          box-sizing: border-box;
          box-shadow: 
            0 -4px white, 
            0 -8px black, 
            4px 0 white, 
            4px -4px black, 
            8px 0 black, 
            0 4px white, 
            0 8px black, 
            -4px 0 white, 
            -4px 4px black, 
            -8px 0 black, 
            -4px -4px black, 
            4px 4px black,
            4px 12px rgba(0,0,0,0.1),
            12px 4px rgba(0,0,0,0.1),
            8px 8px rgba(0,0,0,0.1);
        }

        .pixel-bubble::after {
          content: '';
          display: block;
          position: absolute;
          height: 4px;
          width: 4px;
          bottom: -8px;
          left: 32px;
          box-sizing: border-box;
          box-shadow: 
            0 4px black, 
            0 8px black, 
            0 12px black, 
            0 16px black, 
            -4px 12px black, 
            -8px 8px black, 
            -12px 4px black, 
            -4px 4px white, 
            -8px 4px white, 
            -4px 8px white, 
            -4px 0 white, 
            -8px 0 white, 
            -12px 0 white;
        }

        @media (min-width: 768px) {
          .pixel-bubble {
            width: 240px;
            font-size: 13px;
            padding: 14px;
          }
        }

        @media (min-width: 1024px) {
          .pixel-bubble {
            width: 260px;
            font-size: 14px;
            padding: 16px;
          }
        }
      `}</style>
      
      <div className="pixel-bubble">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold flex items-center justify-center hover:bg-red-600 transition-colors"
          style={{
            boxShadow: "0 0 black, 0 -4px black, 4px 0 black, 0 4px black, -4px 0 black"
          }}
          aria-label="Close speech bubble"
        >
          ×
        </button>
        
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              margin: 0,
              wordBreak: "break-word",
              hyphens: "auto"
            }}
          >
            {messages[currentMessageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
