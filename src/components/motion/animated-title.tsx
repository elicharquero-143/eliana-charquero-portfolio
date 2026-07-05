"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedTitleProps = {
  ariaLabel: string;
  className?: string;
  lines: string[];
};

export function AnimatedTitle({ ariaLabel, className, lines }: AnimatedTitleProps) {
  const shouldReduceMotion = useReducedMotion();
  let characterIndex = 0;

  return (
    <h1 aria-label={ariaLabel} className={cn("overflow-hidden", className)}>
      {lines.map((line) => (
        <span aria-hidden className="block overflow-hidden whitespace-nowrap" key={line}>
          {Array.from(line).map((character) => {
            const index = characterIndex;
            characterIndex += 1;

            return (
              <motion.span
                className="inline-block"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: "105%", rotate: 2, filter: "blur(6px)" }
                }
                key={`${character}-${index}`}
                transition={{
                  delay: 0.08 + index * 0.035,
                  duration: 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }
                    : { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }
                }
              >
                {character === " " ? "\u00a0" : character}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
