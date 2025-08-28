"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAnyWhere, useMediaQuery } from "usehooks-ts";

import { cn } from "../lib/utils";
import { useRotationVelocity } from "../lib/useRotationVelocity";
import { getRandomNumberInRange } from "../lib/getRandomNumberInRange";
import { useElementBoundingRect } from "../lib/useelementBoundingRect";
import { BentoCard } from "./BentoCard";

function Sticker({
  children,
  index = 1,
  caption,
  className,
  preventYOffsetOnMobile: preventYOffset,
  href,
}: {
  children: React.ReactNode;
  index: number;
  caption?: string;
  className?: string;
  preventYOffsetOnMobile?: boolean;
  href?: string;
}) {
  // Create refs for the sticker and caption, and set up measurement of elements
  const itemRef = useRef<HTMLDivElement | null>(null);
  const boundingRect = useElementBoundingRect(itemRef);

  // Manage state of stickers
  const [isDragging, setIsDragging] = useState<Boolean>(false);
  const [isCaptionVisible, setIsCaptionVisible] = useState<Boolean>(false);
  const [isModal, setIsModal] = useState<Boolean>(false);

  // Set up initial values with fixed rotations to prevent hydration errors
  const getFixedRotation = (index: number) => {
    const rotations = [-12, 8, -6, 10]; // Fixed rotations for each document
    return rotations[index % rotations.length];
  };
  
  const getFixedY = (index: number) => {
    const yOffsets = [15, -10, 12, -8]; // Fixed Y offsets for each document
    return yOffsets[index % yOffsets.length];
  };

  const [initialRotation] = useState<number>(getFixedRotation(index));
  const [initialY] = useState<number>(getFixedY(index));

  // Handle smaller devices with different behavior
  const matches = useMediaQuery("(max-width: 768px)");

    function onOpen() {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (matches) {
      setIsModal(!isModal);
      setIsCaptionVisible(!isModal);
    }
  }

  function onStart() {
    if (!matches) {
      // setDirty && setDirty(true)
      setIsCaptionVisible(true);
      setIsDragging(true);
    }
  }

  function onEnd() {
    if (!matches) {
      setIsCaptionVisible(false);
      setIsDragging(false);
    }
  }

  useClickAnyWhere((e) => {
    if (
      e.target != itemRef.current &&
      !itemRef.current?.contains(e.target as Node) &&
      isModal &&
      matches
    ) {
      setIsModal(false);
      setIsCaptionVisible(false);
    }
  });

  // Setup rotation based on speed of drag
  const { rotate, x } = useRotationVelocity(initialRotation);

  const stickerVariants = {
    default: {},
    modal: {
      x: -boundingRect.x / 2 + boundingRect.width,
      rotate: 0,
      scale: 1.2,
      zIndex: 1000,
    },
    dragging: {
      scale: 1.2,
      zIndex: 1000,
    },
  };

  return (
    <motion.div
      ref={itemRef}
      variants={{
        hidden: {
          opacity: 0,
          scale: 0.9,
          y: 10,
        },
        shown: {
          opacity: 1,
          scale: 1,
          y: matches && preventYOffset ? Math.abs(initialY) : initialY,
        },
      }}
      style={{
        zIndex: isModal || isDragging ? 1000 : undefined,
      }}
      className={cn("relative cursor-grab active:cursor-grabbing", className)}
    >
      <motion.div
        variants={stickerVariants}
        className={cn(
          "flex-shrink-1 relative h-fit min-w-[96px] drop-shadow-lg",
        )}
        drag={!matches}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragTransition={{
          power: 0.1,
          bounceStiffness: 200,
        }}
        dragElastic={0.8}
        style={{
          rotate: isModal ? 0 : rotate,
          x,
        }}
        animate={
          matches
            ? isModal
              ? "modal"
              : "default"
            : isDragging
              ? "dragging"
              : "default"
        }
        onTap={onOpen}
        onHoverStart={onStart}
        onHoverEnd={onEnd}
        onDragEnd={onEnd}
      >
        <div className="pointer-events-none flex h-full w-full select-none items-center justify-center">
          {children}
        </div>

        <AnimatePresence>
          {caption && caption.length > 0 && isCaptionVisible && (
            <motion.div
              key="child"
              initial={{ opacity: 0, y: -48, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 0.9 }}
              exit={{ opacity: 0, y: -48, scale: 0.5 }}
              style={{
                left: `50%`,
                x: `-50%`,
              }}
              className={cn(
                "pointer-events-none absolute top-full z-10 mx-auto mt-2 min-w-[160px] max-w-screen-sm select-none text-balance rounded-sm bg-white px-3 py-2 text-center text-[10px] text-black",
              )}
            >
              {caption}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function ScrapbookBento({ className }: { className?: string }) {
  const [resetIndex, setResetIndex] = useState<number>(0);

  const container = {
    hidden: { opacity: 0 },
    shown: {
      opacity: 1,
      transition: {
        delayChilcren: 0,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <BentoCard
      colSpan={9}
      rowSpan={4}
      height="h-[220px]"
      showHoverGradient={false}
      hideOverflow={false}
    >
      <h2 className="mb-2 font-medium">Documents & Certificates</h2>
      <div className="absolute top-0 h-[220px] w-full overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_2px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black_40%,transparent_100%)]"></div>
      <div
        key={resetIndex}
        className={cn(
          "bg-secondary @container xs:max-h-none w-full rounded-3xl p-6",
          className,
        )}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="shown"
          className="-mt-8 grid h-full w-full grid-cols-4 items-center gap-4"
        >
          <Sticker
            caption="Click to view my comprehensive resume showcasing my experience and skills"
            index={0}
            href="/Amitabh+Kumar+resume.pdf"
          >
            <div className="bg-white rounded-lg shadow-lg p-3 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
              <div className="text-xs font-semibold text-gray-700 mb-1">Resume</div>
              <img
                width="80"
                src="/resume.png"
                alt="Resume"
                className="xs:max-w-none max-w-[100px] rounded"
                draggable={false}
              />
            </div>
          </Sticker>
          <Sticker
            caption="Letter of recommendation from Director of Software Engineering at UNSW"
            index={1}
            href="/Recommendation Letter - Director of Software Engineering UNSW (1).pdf"
          >
            <div className="bg-white rounded-lg shadow-lg p-3 border-2 border-gray-200 hover:border-green-300 transition-colors">
              <div className="text-xs font-semibold text-gray-700 mb-1">Recommendation Letter</div>
              <img
                width="80"
                src="/recommendationletter.png"
                alt="Recommendation Letter"
                className="xs:max-w-none max-w-[100px] rounded block mx-auto"
                draggable={false}
              />
            </div>
          </Sticker>
          <Sticker
            caption="Volunteer certificate from Code Club Australia for teaching programming to kids from 2023 to 2024."
            index={2}
            href="/Amitabh_CodeClubAu.pdf"
          >
            <div className="bg-white rounded-lg shadow-lg p-3 border-2 border-gray-200 hover:border-purple-300 transition-colors">
              <div className="text-xs font-semibold text-gray-700 mb-1">Volunteer Certificate</div>
              <img
                width="80"
                src="/volunteercert.png"
                alt="Volunteer Certificate"
                className="xs:max-w-none max-w-[100px] rounded block mx-auto"
                draggable={false}
              />
            </div>
          </Sticker>
          <Sticker
            caption="Financial literacy certificate demonstrating knowledge in financial modeling and analysis."
            index={3}
            href="/Financial Literacy Certificate.pdf"
          >
            <div className="bg-white rounded-lg shadow-lg p-3 border-2 border-gray-200 hover:border-yellow-300 transition-colors">
              <div className="text-xs font-semibold text-gray-700 mb-1">Financial Certificate</div>
              <img
                width="80"
                src="/financialcert.png"
                alt="Financial Literacy Certificate"
                className="xs:max-w-none max-w-[100px] rounded block mx-auto"
                draggable={false}
              />
            </div>
          </Sticker>
        </motion.div>
      </div>
    </BentoCard>
  );
}
