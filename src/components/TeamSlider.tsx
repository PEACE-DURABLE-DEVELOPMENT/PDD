"use client";

import { useRef } from "react";
import SmartImage from "@/components/SmartImage";
import { User, ChevronLeft, ChevronRight } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  description: string;
}

interface TeamSliderProps {
  teamMembers: TeamMember[];
  photoPendingText: string;
}

export default function TeamSlider({ teamMembers, photoPendingText }: TeamSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.offsetWidth * 0.85; // matches card width w-[85vw]
      const scrollAmount = direction === "left" ? -cardWidth - 24 : cardWidth + 24; // card width + gap
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Left Navigation Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/85 backdrop-blur-xs border border-slate-800 shadow-lg flex items-center justify-center text-yellow-400 focus:outline-none cursor-pointer md:hidden"
        aria-label="Previous team member"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Cards Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:mx-auto md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto hide-scrollbar"
      >
        {teamMembers.map((member, idx) => (
          <div 
            key={idx} 
            className="flex flex-col bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 w-[85vw] md:w-auto shrink-0 snap-center"
          >
            {/* Photo Placeholder / Image */}
            <div className="relative w-44 h-44 mx-auto mt-8 rounded-full bg-slate-50 border-4 border-white shadow-md overflow-hidden z-10 flex-shrink-0">
              {member.image ? (
                <SmartImage
                  cloudinaryUrl={member.image}
                  label={`${member.name} — ${member.role}`}
                  aspectRatio="1/1"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                  <User className="w-14 h-14 text-slate-400 mb-1 group-hover:scale-105 transition-transform duration-300" />
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    {photoPendingText}
                  </span>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="px-6 pb-6 pt-4 flex flex-col flex-grow items-center text-center">
              <h3 className="text-xl font-heading font-bold text-ink-heading mb-1 group-hover:text-primary transition-colors duration-200">
                {member.name}
              </h3>
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
                {member.role}
              </p>
              <p className="text-ink-body text-sm leading-relaxed">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Navigation Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/85 backdrop-blur-xs border border-slate-800 shadow-lg flex items-center justify-center text-yellow-400 focus:outline-none cursor-pointer md:hidden"
        aria-label="Next team member"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
