"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ArrowRight, Megaphone, X } from "lucide-react";
import Link from "next/link";
import { Announcement } from "@/lib/announcementAirtable";
import SmartImage from "./SmartImage";
import { cn } from "@/lib/utils";

interface AnnouncementsFeedProps {
  announcements: Announcement[];
  lang: "en" | "fr";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

function AnnouncementCard({
  item,
  lang,
}: {
  item: Announcement;
  lang: "en" | "fr";
}) {
  const formattedDate = new Date(item.date).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const excerpt =
    item.body.length > 180 ? item.body.substring(0, 180).trimEnd() + "…" : item.body;

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

      {item.coverImage && (
        <Link
          href={`/news/announcement/${item.slug}`}
          className="block relative aspect-[16/10] overflow-hidden bg-slate-50 shrink-0"
        >
          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
            <SmartImage
              cloudinaryUrl={item.coverImage}
              label={item.title}
              aspectRatio="16/10"
              className="w-full h-full rounded-none"
            />
          </div>
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-extrabold uppercase tracking-widest backdrop-blur-sm">
              {item.category}
            </span>
          </div>
        </Link>
      )}

      <div className="flex flex-col flex-grow p-6">
        {!item.coverImage && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-extrabold uppercase tracking-widest">
              {item.category}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={item.date}>{formattedDate}</time>
        </div>

        <Link href={`/news/announcement/${item.slug}`} className="block mb-3">
          <h3 className="text-xl font-heading font-extrabold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
            {item.title}
          </h3>
        </Link>

        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {excerpt}
        </p>

        <div className="flex items-center justify-between pt-5 border-t border-slate-50 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
              <Megaphone className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-slate-600 tracking-wide">
              {lang === "fr" ? "Annonce Officielle" : "Official Announcement"}
            </span>
          </div>
          <Link
            href={`/news/announcement/${item.slug}`}
            className="inline-flex items-center gap-1.5 text-slate-900 font-bold text-xs uppercase tracking-wider group/btn"
          >
            <span>{lang === "fr" ? "Lire" : "Read More"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-700 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function AnnouncementsFeed({
  announcements,
  lang,
  t,
}: AnnouncementsFeedProps) {
  const allLabel = lang === "fr" ? "Tout" : "All";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(allLabel);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    announcements.forEach((a) => cats.add(a.category));
    return [allLabel, ...Array.from(cats)];
  }, [announcements, allLabel]);

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((a) => {
      const matchCategory = activeCategory === allLabel || a.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        a.title.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [announcements, activeCategory, searchQuery, allLabel]);

  const showFeatured = activeCategory === allLabel && searchQuery === "" && filteredAnnouncements.length > 0;
  
  const featuredAnn = showFeatured ? filteredAnnouncements[0] : null;
  const gridAnn = showFeatured ? filteredAnnouncements.slice(1) : filteredAnnouncements;

  const featuredDate = featuredAnn
    ? new Date(featuredAnn.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="w-full space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-wrap gap-2.5">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer",
                  isActive
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm scale-105"
                    : "bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-200 hover:text-slate-900"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={lang === "fr" ? "Rechercher des annonces..." : "Search announcements..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {showFeatured && featuredAnn && (
        <div className="group relative bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-350 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {featuredAnn.coverImage && (
              <div className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-50 relative shrink-0">
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-103">
                  <SmartImage
                    cloudinaryUrl={featuredAnn.coverImage}
                    label={featuredAnn.title}
                    aspectRatio="16/9"
                    className="w-full h-full rounded-none"
                  />
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-xxs font-extrabold uppercase tracking-widest backdrop-blur-sm shadow-sm">
                    {lang === "fr" ? "À la Une" : "Featured"}
                  </span>
                </div>
              </div>
            )}

            <div className={`${featuredAnn.coverImage ? "lg:col-span-5" : "lg:col-span-12"} flex flex-col justify-center h-full`}>
              <span className="text-white text-xxs font-extrabold uppercase tracking-widest bg-blue-600 border border-blue-600 shadow-sm px-2.5 py-1 rounded-full self-start mb-4">
                {featuredAnn.category}
              </span>

              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-blue-700 transition-colors">
                <Link href={`/news/announcement/${featuredAnn.slug}`}>
                  {featuredAnn.title}
                </Link>
              </h2>

              <p className="text-slate-600 text-base leading-relaxed mb-6 text-justify line-clamp-4">
                {featuredAnn.body}
              </p>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {featuredDate}
                </span>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-heading font-bold shadow-sm">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 tracking-wide">PDD Rwanda</span>
                </div>

                <Link
                  href={`/news/announcement/${featuredAnn.slug}`}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                >
                  <span>{lang === "fr" ? "Lire l'histoire complète" : "Read Full Story"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredAnnouncements.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {gridAnn.map((ann) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={ann.id}
              >
                <AnnouncementCard item={ann} lang={lang} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm max-w-xl mx-auto p-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
            <Megaphone className="w-8 h-8 text-blue-700" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">
            {lang === "fr" ? "Aucune annonce ne correspond" : "No announcements match"}
          </h3>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            {lang === "fr" ? "Essayez de vider votre recherche ou de choisir un autre filtre de catégorie." : "Try clearing your search query or choosing another category filter."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory(allLabel);
            }}
            className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            {lang === "fr" ? "Effacer les filtres" : "Clear Filters"}
          </button>
        </div>
      )}
    </div>
  );
}
