"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, amount: 0.24 }}
      whileInView={{ opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = HTMLMotionProps<"div">;

export function Stagger({ children, className, ...props }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.09,
          },
        },
      }}
      viewport={{ once: true, amount: 0.18 }}
      whileInView="show"
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<"div">;

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type MotionImageBlockProps = HTMLMotionProps<"div"> & {
  className?: string;
};

export function MotionImageBlock({
  children,
  className,
  ...props
}: MotionImageBlockProps) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0, scale: 0.96, y: 32 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.28 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
