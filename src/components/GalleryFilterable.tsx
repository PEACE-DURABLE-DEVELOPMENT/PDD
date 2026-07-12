"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "./SmartImage";
import { GalleryImage } from "@/lib/airtable";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface GalleryFilterableProps {
  images: GalleryImage[];
}

export default function GalleryFilterable({ images }: GalleryFilterableProps) {
  const { language } = useLanguage();
  const t = translations[language];
  
  const allLabel = t.common.all;
  const [selectedCategory, setSelectedCategory] = useState<string>(allLabel);

  // Get unique categories
  const categories = [allLabel, ...Array.from(new Set(images.map((img) => img.category)))];

  // Filtered images
  const filteredImages =
    selectedCategory === allLabel
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="w-full space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border cursor-pointer",
                isActive
                  ? "bg-blue-600 border-blue-600 text-slate-900 shadow-md scale-105"
                  : "bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:text-slate-900"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={image.id}
              className="group relative aspect-square rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Zooming image on hover */}
              <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-108">
                <SmartImage
                  label={`Gallery — ${image.category}`}
                  aspectRatio="1/1"
                  className="w-full h-full rounded-none"
                  cloudinaryUrl={image.cloudinaryImageUrl}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-end p-6 z-10">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-350 ease-out">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-slate-950 text-xxs font-extrabold uppercase tracking-widest mb-3">
                    {image.category}
                  </span>
                  <p className="text-white font-heading font-bold text-lg leading-snug">
                    {image.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
