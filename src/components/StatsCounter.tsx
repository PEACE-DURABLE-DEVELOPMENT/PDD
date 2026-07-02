"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatsCounterProps {
  value: number;
  label: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export default function StatsCounter({
  value,
  label,
  duration = 2,
  prefix = "",
  suffix,
  icon,
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step);
        }
      };

      animationFrame = window.requestAnimationFrame(step);

      return () => {
        window.cancelAnimationFrame(animationFrame);
      };
    }
  }, [isInView, value, duration]);

  // Default suffix logic to maintain backward compatibility if not provided explicitly
  const displaySuffix = suffix !== undefined ? suffix : (value > 20 ? "+" : "");

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center justify-between p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-350 overflow-hidden text-center h-full min-h-[180px]"
    >
      {/* Decorative bottom border bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        {/* Icon wrapper with a soft background */}
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 mb-4 group-hover:bg-yellow-400 group-hover:text-slate-900 transition-colors duration-300">
            {icon}
          </div>
        )}
        
        <div className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
          <span className="text-slate-900">{prefix}</span>
          <span className="text-slate-900">{count.toLocaleString()}</span>
          <span className="text-yellow-500 font-bold">{displaySuffix}</span>
        </div>
        
        <div className="text-slate-500 text-sm font-semibold tracking-wide uppercase mt-1">
          {label}
        </div>
      </motion.div>
    </div>
  );
}
