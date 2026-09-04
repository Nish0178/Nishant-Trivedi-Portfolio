"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [label, setLabel] = useState("");

  const cursorX = useSpring(0, { stiffness: 500, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button";

      if (interactive) {
        setHovered(true);
        // Check for data-cursor-label attribute
        const el = (target.closest("a") || target.closest("button") || target) as HTMLElement;
        const cursorLabel = el.getAttribute("data-cursor-label");
        setLabel(cursorLabel || "");
      } else {
        setHovered(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  const size = hovered ? 48 : 24;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden mix-blend-difference">
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/60 flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
          scale: clicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {label && (
          <span className="text-[7px] font-mono text-white tracking-widest uppercase">
            {label}
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-white"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: clicking ? 0.5 : hovered ? 0 : 1,
        }}
      />
    </div>
  );
}
