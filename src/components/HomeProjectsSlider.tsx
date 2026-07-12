"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  image: string;
  summary: string;
}

interface HomeProjectsSliderProps {
  projectsList: ProjectItem[];
  t: any;
}

export default function HomeProjectsSlider({ projectsList, t }: HomeProjectsSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.offsetWidth * 0.85; // match card width w-[85vw]
      const scrollAmount = direction === "left" ? -cardWidth - 24 : cardWidth + 24; // width + gap
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Left Navigation Arrow - Visible only on mobile */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/85 backdrop-blur-xs border border-slate-800 shadow-lg flex items-center justify-center text-blue-600 focus:outline-none cursor-pointer sm:hidden"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Card Grid / Swiper */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 hide-scrollbar"
      >
        {projectsList.map((project) => {
          const cardId = `card-toggle-${project.id}`;
          return (
            <div key={project.id} className="relative shrink-0 w-[85vw] sm:w-auto snap-center" style={{ height: "420px" }}>
              <input type="checkbox" id={cardId} className="flip-card-input hidden" />
              <div className="flip-card w-full h-full">
                {/* FRONT — Image + title at bottom */}
                <div className="flip-card-front block w-full h-full relative">
                  {/* Absolute overlay label to make the entire card clickable to flip */}
                  <label htmlFor={cardId} className="absolute inset-0 cursor-pointer z-20" />
                  
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Dark gradient overlay from bottom */}
                  <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)' }} />
                  {/* Yellow accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 z-10" />
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-7 z-10">
                    <h3 className="text-xl font-heading font-extrabold uppercase tracking-wide leading-tight mb-3" style={{ color: '#eab308' }}>
                      {project.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-white/20">
                      {t.home.clickPhotoToLearnMore}
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>

                {/* BACK — Blurred image ghost bg + summary */}
                <div className="flip-card-back" style={{ background: '#0a0a0a' }}>
                  {/* Clicking the background closes it */}
                  <label htmlFor={cardId} className="absolute inset-0 cursor-pointer z-0" />
                  
                  {/* Ghosted blurred image as shadow */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt=""
                    aria-hidden="true"
                    style={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%',
                      objectFit: 'cover', filter: 'blur(6px) brightness(0.18) saturate(0.5)',
                      transform: 'scale(1.08)'
                    }}
                  />
                  {/* Overlay to deepen the shadow effect */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(0,0,0,0.5) 100%)' }} />
                  {/* Yellow side accent */}
                  <div className="absolute top-6 bottom-6 left-0 w-1 bg-blue-600 rounded-r-full" />
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-center px-8 py-8 z-10 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mb-4 shadow-lg shrink-0 pointer-events-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-blue-600 mb-3 uppercase tracking-wide leading-tight pointer-events-auto" style={{ color: '#eab308' }}>
                      {project.title}
                    </h3>
                    <p className="text-slate-200 text-sm leading-relaxed pointer-events-auto" style={{ textAlign: 'justify' }}>
                      {project.summary}
                    </p>
                    <div className="flex gap-4 mt-5 pointer-events-auto">
                      <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 bg-blue-600 text-slate-900 font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-blue-700 transition-all shadow-[4px_4px_0px_0px_rgba(234,179,8,0.25)]"
                      >
                        {t.common.learnMore}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                      <label
                        htmlFor={cardId}
                        className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-slate-800 transition-all cursor-pointer"
                      >
                        {t.home.backBtn}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Navigation Arrow - Visible only on mobile */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/85 backdrop-blur-xs border border-slate-800 shadow-lg flex items-center justify-center text-blue-600 focus:outline-none cursor-pointer sm:hidden"
        aria-label="Next project"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
