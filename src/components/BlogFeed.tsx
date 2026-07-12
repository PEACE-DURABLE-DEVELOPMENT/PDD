"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, BookOpen, X } from "lucide-react";
import Link from "next/link";
import BlogCard, { getPostCategory, getReadingTime } from "./BlogCard";
import { BlogPost } from "@/lib/blogAirtable";
import SmartImage from "./SmartImage";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface BlogFeedProps {
  posts: BlogPost[];
}

export const translateCategory = (cat: string, lang: "en" | "fr") => {
  if (lang === "en") return cat;
  switch (cat) {
    case "Water & Sanitation": return "Eau & Assainissement";
    case "Sustainable Agriculture": return "Agriculture Durable";
    case "Peacebuilding & Healing": return "Consolidation de la Paix";
    case "Community Update": return "Actualités Communautaires";
    default: return cat;
  }
};

export default function BlogFeed({ posts }: BlogFeedProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const allLabel = t.common.all;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(allLabel);

  // Dynamically extract categories that actually exist in current posts
  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((post) => cats.add(getPostCategory(post)));
    return [allLabel, ...Array.from(cats)];
  }, [posts, allLabel]);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const category = getPostCategory(post);
      const matchesCategory = activeCategory === allLabel || category === activeCategory;
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery, allLabel]);

  // Determine if we should show a featured post
  const showFeatured = activeCategory === allLabel && searchQuery === "" && filteredPosts.length > 0;
  
  const featuredPost = showFeatured ? filteredPosts[0] : null;
  const gridPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;

  const featuredDate = featuredPost
    ? new Date(featuredPost.date).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="w-full space-y-12">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        {/* Category filters */}
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
                {category === allLabel ? category : translateCategory(category, language)}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.blog.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Featured Post Card */}
      {showFeatured && featuredPost && (
        <div className="group relative bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-350 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image side */}
            <div className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-50 relative shrink-0">
              {featuredPost.imageUrl ? (
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-103">
                  <SmartImage
                    cloudinaryUrl={featuredPost.imageUrl}
                    label={featuredPost.title}
                    aspectRatio="16/9"
                    className="w-full h-full rounded-none"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  <span>{language === "fr" ? "Aucune image disponible" : "No image available"}</span>
                </div>
              )}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-xxs font-extrabold uppercase tracking-widest backdrop-blur-sm shadow-sm">
                  {t.blog.featuredPost}
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full">
              <span className="text-white text-xxs font-extrabold uppercase tracking-widest bg-blue-600 border border-blue-600 shadow-sm px-2.5 py-1 rounded-full self-start mb-4">
                {translateCategory(getPostCategory(featuredPost), language)}
              </span>

              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-blue-700 transition-colors">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-slate-600 text-base leading-relaxed mb-6 text-justify">
                {featuredPost.excerpt}
              </p>

              {/* Meta information */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {featuredDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {getReadingTime(featuredPost.content)}
                </span>
              </div>

              {/* Author and CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-heading font-bold text-xs uppercase shadow-sm">
                    {featuredPost.author.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-slate-800 tracking-wide">{featuredPost.author}</span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                >
                  <span>{language === "fr" ? "Lire l'histoire complète" : "Read Full Story"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid Section */}
      {filteredPosts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {gridPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={post.id}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm max-w-xl mx-auto p-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
            <BookOpen className="w-8 h-8 text-blue-700" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">
            {language === "fr" ? "Aucune histoire ne correspond à vos critères" : "No stories match your criteria"}
          </h3>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            {language === "fr" ? "Essayez de vider votre recherche ou de choisir un autre filtre de catégorie." : "Try clearing your search query or choosing another category filter."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory(allLabel);
            }}
            className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            {language === "fr" ? "Effacer les filtres" : "Clear Filters"}
          </button>
        </div>
      )}
    </div>
  );
}
