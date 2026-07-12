"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Sparkles, Coins, Heart, ChevronRight } from "lucide-react";
import SmartImage from "./SmartImage";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface Step {
  id: number;
  title: string;
  short: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function RippleEffectPathway() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: Step[] = [
    {
      id: 1,
      title: t.impact.rippleSteps.step1.title,
      short: t.impact.rippleSteps.step1.short,
      description: t.impact.rippleSteps.step1.desc,
      image: "/cons.webp",
      icon: Sprout,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200 active-emerald",
    },
    {
      id: 2,
      title: t.impact.rippleSteps.step2.title,
      short: t.impact.rippleSteps.step2.short,
      description: t.impact.rippleSteps.step2.desc,
      image: "/maize.webp",
      icon: Sparkles,
      color: "bg-amber-50 text-amber-600 border-amber-200 active-amber",
    },
    {
      id: 3,
      title: t.impact.rippleSteps.step3.title,
      short: t.impact.rippleSteps.step3.short,
      description: t.impact.rippleSteps.step3.desc,
      image: "/vsl.jpg",
      icon: Coins,
      color: "bg-blue-50 text-blue-600 border-blue-200 active-blue",
    },
    {
      id: 4,
      title: t.impact.rippleSteps.step4.title,
      short: t.impact.rippleSteps.step4.short,
      description: t.impact.rippleSteps.step4.desc,
      image: "/peace.webp",
      icon: Heart,
      color: "bg-rose-50 text-rose-600 border-rose-200 active-rose",
    },
  ];

  const currentStep = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div className="w-full">
      {/* Mobile Accordion / Layout */}
      <div className="md:hidden space-y-4">
        {steps.map((step) => {
          const isOpen = activeStep === step.id;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={cn(
                "border rounded-2xl overflow-hidden transition-all duration-300 bg-white",
                isOpen ? "border-blue-600 shadow-lg" : "border-slate-100 shadow-sm"
              )}
            >
              <button
                onClick={() => setActiveStep(step.id)}
                className="w-full flex items-center justify-between p-5 text-left font-heading"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm", step.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                      {language === "fr" ? `Étape 0${step.id}` : `Step 0${step.id}`}
                    </span>
                    <span className="font-bold text-slate-900 text-base">{step.title}</span>
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    "w-5 h-5 text-slate-400 transition-transform duration-300",
                    isOpen ? "rotate-90 text-blue-700" : ""
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-6 border-t border-slate-50 pt-4 space-y-4 bg-slate-50/50">
                      <p className="text-slate-600 text-sm leading-relaxed text-justify">
                        {step.description}
                      </p>
                      <div className="rounded-xl overflow-hidden shadow-sm aspect-video w-full">
                        <SmartImage
                          cloudinaryUrl={step.image}
                          label={step.title}
                          aspectRatio="16/9"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Desktop Split Layout */}
      <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left timeline controls */}
        <div className="col-span-5 flex flex-col justify-between py-2 space-y-4">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={cn(
                  "group relative w-full flex items-center gap-5 p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer",
                  isActive
                    ? "border-blue-600 bg-white shadow-xl translate-x-2"
                    : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
                )}
              >
                {/* Connector Line between items */}
                {step.id < 4 && (
                  <div
                    className={cn(
                      "absolute left-[40px] top-[76px] w-[2px] h-[36px] z-0 pointer-events-none transition-colors duration-300",
                      activeStep > step.id ? "bg-blue-600" : "bg-slate-100"
                    )}
                  />
                )}

                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg z-10 transition-colors duration-300",
                    isActive ? "bg-blue-600 text-slate-900" : "bg-slate-50 text-slate-500 group-hover:bg-slate-100"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="z-10">
                  <span className={cn(
                    "text-xs font-bold block uppercase tracking-widest mb-1 transition-colors duration-300",
                    isActive ? "text-blue-700" : "text-slate-400"
                  )}>
                    {language === "fr" ? `Étape 0${step.id}` : `Stage 0${step.id}`}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">
                    {step.short}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right showcase card */}
        <div className="col-span-7 relative bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden min-h-[460px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col h-full"
            >
              {/* Image background top half */}
              <div className="h-[200px] lg:h-[240px] relative w-full overflow-hidden shrink-0">
                <SmartImage
                  cloudinaryUrl={currentStep.image}
                  label={currentStep.title}
                  aspectRatio="16/6"
                  className="w-full h-full rounded-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10" />
              </div>

              {/* Text content bottom half */}
              <div className="p-8 flex-grow flex flex-col justify-between relative z-20 -mt-10 bg-white rounded-t-3xl shadow-[0_-12px_24px_rgba(0,0,0,0.03)]">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-700 text-xs font-extrabold uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full">
                      {language === "fr" ? `Étape 0${currentStep.id}` : `Stage 0${currentStep.id}`}
                    </span>
                    <span className="text-slate-400 text-sm font-semibold">
                      {language === "fr" ? "Le Chemin de la Transformation" : "The Transformation Pathway"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-4 leading-tight">
                    {currentStep.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-justify text-base">
                    {currentStep.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium">{t.projects.impactCycle}</span>
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold">
                    <span>{t.projects.activeStage}</span>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
