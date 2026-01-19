"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface LightningWProps {
  onAnimationComplete: () => void;
}

export default function LightningW({ onAnimationComplete }: LightningWProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-24 h-24 stroke-white fill-none"
    >
      <motion.path
        id="lightning-w"
        d="M10 10 L35 90 L50 40 L65 90 L90 10"
        strokeWidth="2"
        strokeDasharray="400"
        strokeDashoffset="400"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onAnimationComplete={onAnimationComplete}
      />
    </svg>
  );
}
