"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "@/components/SmartImage";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function PartnersPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activePartner, setActivePartner] = useState<string | null>(null);

  const partners = [
    {
      id: "mcc",
      name: "MCC",
      logo: "/mcc.png",
      description: t.partners.items.mcc,
    },
    {
      id: "pdn",
      name: "PDN",
      logo: "/pdn.png",
      description: t.partners.items.pdn,
    },
    {
      id: "wfp",
      name: "WFP",
      logo: "/wfp.png",
      description: t.partners.items.wfp,
    },
    {
      id: "cfb",
      name: "CFB",
      logo: "/cfb.png",
      description: t.partners.items.cfb,
    },
    {
      id: "might-water",
      name: "Might Water",
      logo: "/water.webp",
      description: t.partners.items.water,
    },
    {
      id: "jadf",
      name: "JADF",
      logo: "/jadf.png",
      description: t.partners.items.jadf,
    },
    {
      id: "burera",
      name: "Burera District",
      logo: "/burera.webp",
      description: t.partners.items.burera,
    },
    {
      id: "nord",
      name: "Northern Province",
      logo: "/nord.webp",
      description: t.partners.items.nord,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 font-medium text-sm mb-6 border border-yellow-200 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>{t.partners.badge}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              {language === "fr" ? (
                <>Nos Estimés <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Partenaires</span></>
              ) : (
                <>Our Esteemed <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Partners</span></>
              )}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {t.partners.heroSub}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => {
              const isActive = activePartner === partner.id;

              return (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    layout
                    onClick={() => setActivePartner(isActive ? null : partner.id)}
                    className={`relative cursor-pointer group rounded-3xl p-6 transition-all duration-500 ease-out border shadow-sm flex flex-col items-center justify-center
                      ${
                        isActive
                          ? "bg-white border-yellow-300 ring-4 ring-yellow-50"
                          : "bg-white border-slate-100 hover:border-yellow-200 hover:shadow-xl hover:-translate-y-1"
                      }
                    `}
                    style={{ minHeight: "280px" }}
                  >
                    <motion.div
                      layout
                      className="w-full max-w-[12rem] h-24 relative mb-6 rounded-2xl overflow-hidden shadow-sm bg-white p-2 border border-slate-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                    >
                      <SmartImage
                        cloudinaryUrl={partner.logo}
                        label={partner.name}
                        aspectRatio="16/9"
                        className="w-full h-full"
                        objectFit="contain"
                      />
                    </motion.div>

                    <motion.h3
                      layout="position"
                      className="text-xl font-bold text-slate-900 mb-2 text-center"
                    >
                      {partner.name}
                    </motion.h3>

                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-slate-600 text-center text-sm leading-relaxed"
                        >
                          {partner.description}
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-yellow-600 font-medium text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                        >
                          {t.common.clickToLearnMore}
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-blue-700 border-t-4 border-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6" style={{ color: '#eab308' }}>
              {t.partners.ctaTitle}
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {t.partners.ctaSub}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-8 py-4 rounded-full font-extrabold text-lg transition-all hover:scale-105 active:scale-95 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] uppercase tracking-wider"
            >
              {t.common.partnerWithUs}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
