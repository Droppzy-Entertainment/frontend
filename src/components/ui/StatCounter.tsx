"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export interface StatCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

function formatValue(raw: number, decimals: number, suffix: string): string {
  return `${raw.toFixed(decimals)}${suffix}`;
}

/**
 * Client leaf: Framer Motion `useInView` (fires once) drives an imperative
 * `animate()` count-up from 0 to `value` over ~1400ms with an ease-out
 * curve, written into local state on every frame. Under
 * `prefers-reduced-motion`, the final formatted value is rendered
 * immediately with no animation at all.
 */
export function StatCounter({ value, suffix = "", decimals, label }: StatCounterProps) {
  const resolvedDecimals = decimals ?? (value % 1 !== 0 ? 1 : 0);
  const reduce = useReducedMotion();
  const numRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(numRef, { once: true, amount: 0.5 });

  const [display, setDisplay] = useState(() =>
    formatValue(reduce ? value : 0, resolvedDecimals, suffix)
  );

  useEffect(() => {
    if (reduce) {
      setDisplay(formatValue(value, resolvedDecimals, suffix));
      return;
    }
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(formatValue(latest, resolvedDecimals, suffix));
      },
    });

    return () => controls.stop();
  }, [isInView, reduce, value, resolvedDecimals, suffix]);

  return (
    <>
      <p ref={numRef} className="stat-num">
        {display}
      </p>
      <p className="stat-label">{label}</p>
    </>
  );
}
