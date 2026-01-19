"use client";

import { useState, useEffect, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear interval if text changes to prevent old scramble from overwriting
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2; // Slower reveal
    }, 50);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {displayText}
    </span>
  );
}
