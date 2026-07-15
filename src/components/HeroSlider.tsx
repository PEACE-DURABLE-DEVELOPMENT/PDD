"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeroSliderProps {
  heroTitle1: string;
  heroTitle2: string;
  ourProjectsText: string;
  supportWorkText: string;
}

const IMAGES = [
  "/1.webp",
  "/hero.webp",
  "/3.webp",
  "/pover.webp",
  "/fill.webp",
  "/liba.jpeg",
  "/7.webp",
];

export default function HeroSlider({
  heroTitle1,
  heroTitle2,
  ourProjectsText,
  supportWorkText,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Images with Cross-fade & Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        {IMAGES.map((src, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt="PDD Rwanda Community Work"
                fill
                priority={index === 0}
                className={`object-cover object-[center_20%] transition-transform duration-[5000ms] ease-linear scale-100`}
                sizes="100vw"
              />
            </div>
          );
        })}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 leading-tight">
            <span className="block text-blue-400">{heroTitle1}</span>
            <span className="block text-white">{heroTitle2}</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto sm:max-w-none">
            <Link
              href="/projects"
              className="bg-yellow-400 text-slate-950 hover:bg-yellow-500 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg text-center transition-all shadow-sm"
            >
              {ourProjectsText}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-yellow-400 text-white hover:bg-yellow-400/10 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg text-center transition-all shadow-sm"
            >
              {supportWorkText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
