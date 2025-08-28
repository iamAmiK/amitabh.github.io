"use client";

import { motion } from "framer-motion";
import { ProfilePicture } from "./ProfilePicture";
import { SpeechBubble } from "./SpeechBubble";

interface AnimatedProfilePictureProps {
  delay?: number;
}

export function AnimatedProfilePicture({
  delay = 0,
}: AnimatedProfilePictureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay,
      }}
      className="relative flex justify-center"
    >
      {/* Profile Picture Container */}
      <div className="relative">
        <ProfilePicture />
        
        {/* Speech Bubble positioned relative to profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 10, y: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: delay + 0.8, // Appear after profile picture
          }}
          className="absolute -top-8 right-[-40px] md:-top-3 md:right-[-60px] lg:-top-0 lg:right-[-80px]"
          >
          <SpeechBubble />
        </motion.div>
      </div>
    </motion.div>
  );
}