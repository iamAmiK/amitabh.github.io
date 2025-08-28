"use client";

import { motion } from "framer-motion";
import { ShadowBox } from "./ShadowBox";
import { useEffect, useRef, useState } from "react";

interface AnimatedMobilePhotosProps {
  delay: number;
}

export function AnimatedMobilePhotos({ delay }: AnimatedMobilePhotosProps) {
  const [start, setStart] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const el = rootRef.current;
    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !fired) {
          fired = true;
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={rootRef} className="relative -mx-12 lg:hidden">
      <div className="relative w-full overflow-hidden py-12">
        <div className="flex items-center justify-center space-x-14">
          <motion.div
            className="relative w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: start ? delay : 0,
            }}
          >
            <ShadowBox width={170} height={252}></ShadowBox>
            <img
              className="absolute left-0 top-2 h-[245px] w-[163px] rotate-[-5deg] rounded-lg object-cover"
              src="/8582.JPG"
              alt="Profile"
            />
          </motion.div>
          <motion.div
            className="relative w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: start ? delay + 0.1 : 0,
            }}
          >
            <ShadowBox width={188} height={278}></ShadowBox>
            <img
              className="absolute left-0 top-0 h-[280px] w-[190px] rotate-[-8deg] rounded-lg object-cover shadow-lg shadow-black/20"
              src="/amitabh_tutor.png"
              alt="Amitabh"
            />
          </motion.div>
          <motion.div
            className="relative w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: start ? delay + 0.2 : 0,
            }}
          >
            <ShadowBox width={170} height={252}></ShadowBox>
            <img
              className="absolute left-0 top-0 h-[245px] w-[163px] rotate-[10deg] rounded-lg object-cover shadow-lg shadow-black/20"
              src="/ami-image1.jpeg"
              alt="Amitabh"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
