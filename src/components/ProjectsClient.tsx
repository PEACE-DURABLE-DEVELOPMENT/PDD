"use client";

import { useState, useRef } from "react";
import SmartImage from "@/components/SmartImage";
import { 
  ArrowRight, 
  Droplets, 
  Scale, 
  TrendingUp, 
  Wheat, 
  HeartHandshake, 
  ChevronDown, 
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  imageUrl?: string;
}

export default function ProjectsClient() {
  const { language } = useLanguage();
  const t = translations[language];
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [flippedProjects, setFlippedProjects] = useState<Record<string, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.offsetWidth * 0.85; // card size is 85% of container width
      const scrollAmount = direction === "left" ? -cardWidth - 24 : cardWidth + 24; // width + gap
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const projects: Project[] = [
    {
      id: "peace-promotion",
      title: t.projects.items.peace.title,
      shortDescription: t.projects.items.peace.short,
      fullDescription: t.projects.items.peace.full,
      icon: HeartHandshake,
      imageUrl: "/peace.webp",
    },
    {
      id: "fsca",
      title: t.projects.items.fsca.title,
      shortDescription: t.projects.items.fsca.short,
      fullDescription: t.projects.items.fsca.full,
      icon: Wheat,
      imageUrl: "/cons.webp",
    },
    {
      id: "human-right-advocacy",
      title: t.projects.items.rights.title,
      shortDescription: t.projects.items.rights.short,
      fullDescription: t.projects.items.rights.full,
      icon: Scale,
      imageUrl: "/human.webp",
    },
    {
      id: "poverty-reduction",
      title: t.projects.items.poverty.title,
      shortDescription: t.projects.items.poverty.short,
      fullDescription: t.projects.items.poverty.full,
      icon: TrendingUp,
      imageUrl: "/pover.webp",
    },
    {
      id: "clean-water",
      title: t.projects.items.water.title,
      shortDescription: t.projects.items.water.short,
      fullDescription: t.projects.items.water.full,
      icon: Droplets,
      imageUrl: "/fill.webp",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Premium Hero Section */}
      <section className="relative py-16 lg:py-24 bg-black overflow-hidden border-b-4 border-yellow-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#eab308 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="w-full text-left">
            <h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-6 tracking-tight uppercase"
              style={{ color: "#ffffff", textShadow: "none" }}
            >
              {language === "fr" ? (
                <>
                  Transformer des <span style={{ color: "#eab308" }}>Vies</span> par des <span style={{ color: "#eab308" }}>Projets</span>
                </>
              ) : (
                <>
                  Transforming <span style={{ color: "#eab308" }}>Lives</span> Through Impactful <span style={{ color: "#eab308" }}>Projects</span>
                </>
              )}
            </h1>
            <div className="h-1 w-32 bg-yellow-500 mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-light w-full">
              {t.projects.heroSub}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Layout */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          
          {/* Mobile View: Vertical list of 3D Flip Cards (One card below other) */}
          <div className="flex flex-col lg:hidden gap-10">
            {projects.map((project) => {
              const Icon = project.icon;
              const isFlipped = !!flippedProjects[project.id];
              const isExpanded = !!expandedProjects[project.id];

              return (
                <div 
                  key={project.id} 
                  className="relative w-full [perspective:1000px]" 
                  style={{ height: "460px" }}
                >
                  <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}>
                    {/* Front Side */}
                    <div 
                      onClick={() => setFlippedProjects(prev => ({ ...prev, [project.id]: true }))}
                      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden cursor-pointer [backface-visibility:hidden] shadow-md border border-slate-200"
                    >
                      <SmartImage
                        cloudinaryUrl={project.imageUrl || "/hero.webp"}
                        label={`Project: ${project.title}`}
                        aspectRatio="4/3"
                        className="w-full h-full object-cover saturate-150"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start">
                        <div className="flex items-center gap-3 mb-3 w-full">
                          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-slate-900" />
                          </div>
                          <h3 
                            className="text-lg font-heading font-extrabold uppercase tracking-wide leading-tight text-left"
                            style={{ color: '#eab308' }}
                          >
                            {project.title.split('(')[0].trim()}
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-white/20">
                          {t.home.clickPhotoToLearnMore || "Click to learn more"}
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-slate-800 bg-slate-950 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden"
                    >
                      {/* Blurred cover image backdrop */}
                      <div className="absolute inset-0 opacity-15 filter blur-lg pointer-events-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={project.imageUrl || "/hero.webp"} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-slate-950/90 pointer-events-none" />

                      <div className="relative z-10 flex flex-col h-full justify-between">
                        {/* Header */}
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5 text-slate-900" />
                              </div>
                              <h3 
                                className="text-lg font-heading font-extrabold uppercase tracking-wide leading-tight line-clamp-2"
                                style={{ color: '#eab308' }}
                              >
                                {project.title.split('(')[0].trim()}
                              </h3>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setFlippedProjects(prev => ({ ...prev, [project.id]: false }));
                              }}
                              className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer border border-slate-800 shrink-0"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Description scroll area */}
                          <div className="overflow-y-auto max-h-[190px] pr-1.5 text-justify scrollbar-thin scrollbar-thumb-slate-800 text-sm font-light text-slate-300 leading-relaxed">
                            <p>
                              {isExpanded ? project.fullDescription : project.shortDescription}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-3 pt-3 border-t border-slate-900 flex flex-col gap-2 shrink-0">
                          <div className="flex justify-between items-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(project.id);
                              }}
                              className="text-xs font-bold text-yellow-400 hover:text-yellow-300 uppercase tracking-wider cursor-pointer py-1"
                            >
                              {isExpanded ? t.projects.readLessBtn : t.projects.readMoreBtn}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFlippedProjects(prev => ({ ...prev, [project.id]: false }));
                              }}
                              className="text-xs font-bold text-slate-400 hover:text-slate-300 uppercase tracking-wider cursor-pointer py-1"
                            >
                              {t.home.backBtn || "Back"}
                            </button>
                          </div>
                          {isExpanded && (
                            <Link
                              href="/donate"
                              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-extrabold py-2.5 rounded-full text-center text-xs uppercase tracking-wider transition-colors shadow-sm"
                            >
                              {language === "fr" ? `Soutenir ce projet` : `Support this project`}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop/Laptop View: Alternating lists */}
          <div className="hidden lg:flex lg:flex-col lg:gap-40">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              const Icon = project.icon;
              const isExpanded = !!expandedProjects[project.id];

              return (
                <div 
                  key={project.id}
                  className={`flex flex-col gap-16 lg:gap-24 items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Image Side - Artistic Frame */}
                  <div className="w-full lg:w-1/2 relative group">
                    <div className={`absolute inset-0 bg-yellow-400 rounded-tr-[6rem] rounded-bl-[6rem] translate-y-8 ${isEven ? 'translate-x-8' : '-translate-x-8'} transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6 opacity-80`}></div>
                    <div className="relative z-10 rounded-tr-[6rem] rounded-bl-[6rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 border-4 border-slate-900 bg-slate-900">
                      <SmartImage 
                        cloudinaryUrl={project.imageUrl || "/hero.webp"}
                        label={`Project: ${project.title}`}
                        aspectRatio="4/3"
                        className="w-full h-full object-cover saturate-150 opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                      />
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center text-justify">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-slate-900 bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-transform duration-500 group-hover:-translate-y-1 shrink-0">
                        <Icon className="w-8 h-8 text-slate-900" />
                      </div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-yellow-600 text-left leading-tight">
                        {project.title.split('(')[0].trim()}
                      </h2>
                    </div>
                    
                    {/* Subtle underline accent */}
                    <div className="w-16 h-1 bg-slate-900 mb-8 rounded-full"></div>
                    
                    {/* Description */}
                    {!isExpanded ? (
                      <p className="text-xl text-slate-700 leading-relaxed mb-6 font-light" style={{ textAlign: "justify" }}>
                        {project.shortDescription}
                      </p>
                    ) : (
                      <div className="space-y-6 mb-6">
                        <p className="text-xl text-slate-700 leading-relaxed font-light" style={{ textAlign: "justify" }}>
                          {project.fullDescription}
                        </p>
                      </div>
                    )}
                    
                    {/* Expand/Collapse Toggle & Support Link */}
                    <div className="mt-8 flex flex-wrap gap-6 items-center">
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-yellow-600 transition-colors group text-left text-lg tracking-wide uppercase cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            {t.projects.readLessBtn} <ChevronUp className="w-6 h-6" />
                          </>
                        ) : (
                          <>
                            {t.projects.readMoreBtn} <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>

                      {isExpanded && (
                        <Link 
                          href="/donate"
                          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold px-8 py-4 rounded-full transition-all shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-1 hover:translate-y-1 text-sm uppercase tracking-wider group"
                        >
                          {language === "fr" ? `Soutenir ${project.title.split("(")[0].trim()}` : `Support ${project.title.split("(")[0].trim()}`}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#4a90e2] border-t-4 border-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 text-white">
            {language === "fr" ? (
              <>
                Associez-vous à nous pour le <span className="text-yellow-400">changement</span>
              </>
            ) : (
              <>
                Partner With Us for <span className="text-yellow-400">Change</span>
              </>
            )}
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-light">
            {language === "fr"
              ? "Votre soutien peut nous aider à étendre ces projets et à toucher plus de communautés dans le besoin. Ensemble, nous pouvons construire un avenir meilleur."
              : "Your support can help us expand these projects and reach more communities in need. Together, we can build a brighter future."
            }
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-5 bg-yellow-400 text-slate-900 rounded-full font-extrabold hover:bg-yellow-500 transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-1 hover:translate-y-1 text-lg uppercase tracking-wider"
          >
            {language === "fr" ? "Impliquez-vous dès aujourd'hui" : "Get Involved Today"}
          </Link>
        </div>
      </section>
    </div>
  );
}
