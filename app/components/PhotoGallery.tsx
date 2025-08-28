"use client";

import { motion } from "framer-motion";
import { Photo } from "./Photo";
import { useEffect, useRef, useState } from "react";

type Direction = "left" | "right";

export const PhotoGallery = ({
  animationDelay = 0.5,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const el = rootRef.current;
    let hasTriggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;
          // First make the container visible with a fade-in
          const visibilityTimer = setTimeout(() => {
            setIsVisible(true);
          }, animationDelay * 1000);
          // Then start the photo animations after a short delay
          const animationTimer = setTimeout(() => {
            setIsLoaded(true);
          }, (animationDelay + 0.4) * 1000);

          // Cleanup timers when done
          const cleanup = () => {
            clearTimeout(visibilityTimer);
            clearTimeout(animationTimer);
          };
          el.addEventListener("animationcancel", cleanup, { once: true } as any);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animationDelay]);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1, // Reduced from 0.3 to 0.1 since we already have the fade-in delay
      },
    },
  };

  // Animation variants for each photo
  const photoVariants = {
    hidden: (custom) => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      // Keep the same z-index throughout animation
    }),
    visible: (custom) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0, // No rotation
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15, // Explicit delay based on order
      },
    }),
  };

  // Photo positions - horizontal layout with random y offsets
  const photos = [
    { id: 1, order: 0, x: "-440px", y: "15px", zIndex: 60, direction: "left" as Direction, src: "/8582.JPG" },
    { id: 2, order: 1, x: "-220px", y: "32px", zIndex: 50, direction: "left" as Direction, src: "/ami-image.png" },
    { id: 3, order: 2, x: "0px", y: "8px", zIndex: 40, direction: "left" as Direction, src: "/amitabh_tutor.png" },
    { id: 4, order: 3, x: "220px", y: "22px", zIndex: 30, direction: "right" as Direction, src: "/ami-image1.jpeg" },
    { id: 5, order: 4, x: "440px", y: "18px", zIndex: 20, direction: "right" as Direction, src: "/ami-image2.JPG" },
  ];

  return (
    <div ref={rootRef} className="relative mb-8 hidden h-[350px] w-full items-center justify-center lg:flex">
      <motion.div
        className="relative mx-auto flex w-full max-w-6xl justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="relative flex w-full justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <div className="relative h-[220px] w-full">
            {/* Render photos in reverse order so that higher z-index photos are rendered later in the DOM */}
            {[...photos].reverse().map((photo) => (
              <motion.div
                key={photo.id}
                className="absolute top-0"
                style={{ zIndex: photo.zIndex, left: "50%", marginLeft: "-110px" }}
                variants={photoVariants}
                custom={{
                  x: photo.x,
                  y: photo.y,
                  order: photo.order,
                }}
              >
                <Photo
                  width={220}
                  height={220}
                  src={photo.src}
                  alt="Family photo"
                  direction={photo.direction}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
