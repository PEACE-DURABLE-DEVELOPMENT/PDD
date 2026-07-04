"use client";

import { useState } from "react";
import SmartImage from "@/components/SmartImage";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

export default function ProgramCard({ program, lang, t }: { program: any, lang: string, t: any }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = program.icon;
  
  return (
    <div className="group relative flex flex-col bg-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border">
      {/* Top Image */}
      <div className="w-full aspect-[4/3] relative overflow-hidden">
        <SmartImage 
          cloudinaryUrl={program.image}
          label={`Program: ${program.title}`}
          aspectRatio="4/3"
          className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-heading/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Card Content overlap */}
      <div className="relative p-8 flex flex-col flex-grow bg-surface z-10 transform -translate-y-6 mx-4 rounded-2xl shadow-lg border border-border/50 group-hover:border-primary/20 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${program.bg}`}>
            <Icon className={`w-6 h-6 ${program.color}`} />
          </div>
          <h2 className="text-xl font-heading font-bold text-ink-heading line-clamp-2">
            {program.title}
          </h2>
        </div>
        
        <div className="text-ink-body mb-6 flex-grow leading-relaxed">
          <p>{program.description}</p>
          <div 
            className={`grid transition-all duration-500 ease-in-out ${expanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <p className="text-sm text-ink-body/90 font-light border-l-2 border-primary/30 pl-3">
                {program.full}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-5 border-t border-border flex flex-col gap-4">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider w-fit"
          >
            {expanded ? (
              <>{t.projects?.readLessBtn || "Read Less"} <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>{t.common?.readMore || "Read More"} <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
          
          <Link
            href="/donate"
            className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-3 px-5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group/link"
          >
            {t.common?.supportPrograms || (lang === "fr" ? "Soutenir Nos Programmes" : "Support Our Programs")}
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
