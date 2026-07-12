"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Megaphone,
  BookOpen,
  X,
  ChevronRight,
} from "lucide-react";
import { BlogPost } from "@/lib/blogAirtable";
import { Announcement } from "@/lib/announcementAirtable";
import SmartImage from "@/components/SmartImage";
import BlogCard, { getPostCategory, getReadingTime } from "@/components/BlogCard";
import { translateCategory } from "@/components/BlogFeed";

interface NewsClientProps {
  blogPosts: BlogPost[];
  announcements: Announcement[];
  lang: "en" | "fr";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

type Tab = "announcements" | "blog";

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
      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

      {/* Cover Image */}
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
          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-extrabold uppercase tracking-widest backdrop-blur-sm">
              {item.category}
            </span>
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Category badge when no image */}
        {!item.coverImage && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-extrabold uppercase tracking-widest">
              {item.category}
            </span>
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={item.date}>{formattedDate}</time>
        </div>

        {/* Title */}
        <Link href={`/news/announcement/${item.slug}`} className="block mb-3">
          <h3 className="text-xl font-heading font-extrabold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
            {item.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {excerpt}
        </p>

        {/* Footer */}
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

export default function NewsClient({
  blogPosts,
  announcements,
  lang,
  t,
}: NewsClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("announcements");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  /* ---- Announcements filtering ---- */
  const announcementCategories = useMemo(() => {
    const cats = new Set<string>();
    announcements.forEach((a) => cats.add(a.category));
    return ["all", ...Array.from(cats)];
  }, [announcements]);

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((a) => {
      const matchCat = activeCategory === "all" || a.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        a.title.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [announcements, activeCategory, searchQuery]);

  /* ---- Blog filtering ---- */
  const blogCategories = useMemo(() => {
    const cats = new Set<string>();
    blogPosts.forEach((p) => cats.add(getPostCategory(p)));
    return ["all", ...Array.from(cats)];
  }, [blogPosts]);

  const filteredBlog = useMemo(() => {
    return blogPosts.filter((p) => {
      const cat = getPostCategory(p);
      const matchCat = activeCategory === "all" || cat === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [blogPosts, activeCategory, searchQuery]);

  /* Reset category when switching tabs */
  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    setActiveCategory("all");
    setSearchQuery("");
  }

  const categories =
    activeTab === "announcements" ? announcementCategories : blogCategories;
  const items =
    activeTab === "announcements" ? filteredAnnouncements : filteredBlog;

  /* Featured post (first item when no filter active) */
  const showFeatured =
    activeTab === "blog" && activeCategory === "all" && searchQuery === "" && filteredBlog.length > 0;
  const featuredBlog = showFeatured ? filteredBlog[0] : null;
  const gridBlog = showFeatured ? filteredBlog.slice(1) : filteredBlog;

  const featuredDate = featuredBlog
    ? new Date(featuredBlog.date).toLocaleDateString(
        lang === "fr" ? "fr-FR" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  /* Featured announcement */
  const showFeaturedAnn =
    activeTab === "announcements" && activeCategory === "all" && searchQuery === "" && filteredAnnouncements.length > 0;
  const featuredAnn = showFeaturedAnn ? filteredAnnouncements[0] : null;
  const gridAnn = showFeaturedAnn
    ? filteredAnnouncements.slice(1)
    : filteredAnnouncements;

  const featuredAnnDate = featuredAnn
    ? new Date(featuredAnn.date).toLocaleDateString(
        lang === "fr" ? "fr-FR" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* ── Hero ── */}
      <section className="relative bg-white pt-28 pb-20 md:pt-36 md:pb-28 border-b border-slate-100 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(#2563eb 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Blur blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-100/50 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[300px] bg-blue-50/60 rounded-full blur-[90px] -z-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-600/10 text-blue-800 font-bold text-xs uppercase tracking-widest mb-6 border border-blue-600/20">
              <Megaphone className="w-3.5 h-3.5" />
              {t.news.badge}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
              {lang === "fr" ? (
                <>
                  Actualités &{" "}
                  <span className="text-blue-700 relative">
                    Annonces
                    <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-blue-600/25 -z-10" />
                  </span>
                </>
              ) : (
                <>
                  News &{" "}
                  <span className="text-blue-700 relative">
                    Announcements
                    <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-blue-600/25 -z-10" />
                  </span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
              {t.news.heroSub}
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-2xl font-extrabold text-blue-700">{announcements.length}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  {lang === "fr" ? "Annonces" : "Announcements"}
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl font-extrabold text-blue-700">{blogPosts.length}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  {lang === "fr" ? "Articles" : "Articles"}
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl font-extrabold text-blue-700">
                  {announcements.length + blogPosts.length}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  {lang === "fr" ? "Total" : "Total"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab + Content ── */}
      <section className="py-14 flex-grow">
        <div className="container mx-auto px-4">
          {/* Tab Bar */}
          <div className="flex items-center gap-2 mb-10 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm max-w-md">
            {[
              {
                id: "announcements" as Tab,
                label: t.news.tabAnnouncements,
                icon: Megaphone,
                count: announcements.length,
              },
              {
                id: "blog" as Tab,
                label: t.news.tabBlog,
                icon: BookOpen,
                count: blogPosts.length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-10">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const label =
                  cat === "all"
                    ? lang === "fr"
                      ? "Tout"
                      : "All"
                    : activeTab === "blog"
                    ? translateCategory(cat, lang)
                    : cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer ${
                      isActive
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm scale-105"
                        : "bg-slate-50 border-slate-100 text-slate-500 hover:border-blue-200 hover:text-blue-700"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.news.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all duration-200"
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

          {/* ── ANNOUNCEMENTS TAB ── */}
          <AnimatePresence mode="wait">
            {activeTab === "announcements" && (
              <motion.div
                key="announcements"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-10"
              >
                {/* Featured Announcement */}
                {showFeaturedAnn && featuredAnn && (
                  <div className="group relative bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[4px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Image */}
                      {featuredAnn.coverImage && (
                        <div className="lg:col-span-7 aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-50 relative">
                          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                            <SmartImage
                              cloudinaryUrl={featuredAnn.coverImage}
                              label={featuredAnn.title}
                              aspectRatio="16/9"
                              className="w-full h-full rounded-none"
                            />
                          </div>
                          <div className="absolute top-4 left-4 z-10">
                            <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-extrabold uppercase tracking-widest shadow-sm">
                              {lang === "fr" ? "À la Une" : "Featured"}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div
                        className={`${featuredAnn.coverImage ? "lg:col-span-5" : "lg:col-span-12"} flex flex-col justify-center h-full`}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-extrabold uppercase tracking-widest">
                            <Megaphone className="w-3.5 h-3.5" />
                            {featuredAnn.category}
                          </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-blue-700 transition-colors">
                          <Link href={`/news/announcement/${featuredAnn.slug}`}>
                            {featuredAnn.title}
                          </Link>
                        </h2>

                        <p className="text-slate-500 text-base leading-relaxed mb-6 line-clamp-3">
                          {featuredAnn.body.substring(0, 240)}
                          {featuredAnn.body.length > 240 ? "…" : ""}
                        </p>

                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={featuredAnn.date}>{featuredAnnDate}</time>
                        </div>

                        <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                              <Megaphone className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-xs font-bold text-slate-600">
                              {lang === "fr" ? "PDD Rwanda" : "PDD Rwanda"}
                            </span>
                          </div>
                          <Link
                            href={`/news/announcement/${featuredAnn.slug}`}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all duration-200"
                          >
                            <span>{t.news.readFull}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Announcements grid */}
                {gridAnn.length > 0 ? (
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {gridAnn.map((ann) => (
                        <motion.div
                          layout
                          key={ann.id}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.25 }}
                        >
                          <AnnouncementCard item={ann} lang={lang} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  !showFeaturedAnn && (
                    <EmptyState
                      lang={lang}
                      onClear={() => {
                        setSearchQuery("");
                        setActiveCategory("all");
                      }}
                      message={t.news.noResults}
                    />
                  )
                )}
              </motion.div>
            )}

            {/* ── BLOG TAB ── */}
            {activeTab === "blog" && (
              <motion.div
                key="blog"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-10"
              >
                {/* Featured Blog Post */}
                {showFeatured && featuredBlog && (
                  <div className="group relative bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[4px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Image */}
                      <div className="lg:col-span-7 aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-50 relative">
                        {featuredBlog.imageUrl ? (
                          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                            <SmartImage
                              cloudinaryUrl={featuredBlog.imageUrl}
                              label={featuredBlog.title}
                              aspectRatio="16/9"
                              className="w-full h-full rounded-none"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 text-slate-400">
                            <BookOpen className="w-12 h-12 opacity-40" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-xs font-extrabold uppercase tracking-widest backdrop-blur-sm">
                            {lang === "fr" ? "À la Une" : "Featured"}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-5 flex flex-col justify-center h-full">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold uppercase tracking-widest mb-4 self-start">
                          {translateCategory(getPostCategory(featuredBlog), lang)}
                        </span>

                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-blue-700 transition-colors">
                          <Link href={`/blog/${featuredBlog.slug}`}>
                            {featuredBlog.title}
                          </Link>
                        </h2>

                        <p className="text-slate-500 text-base leading-relaxed mb-6 line-clamp-3">
                          {featuredBlog.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {featuredDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {getReadingTime(featuredBlog.content)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs uppercase">
                              {featuredBlog.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                            </div>
                            <span className="text-xs font-bold text-slate-800">
                              {featuredBlog.author}
                            </span>
                          </div>
                          <Link
                            href={`/blog/${featuredBlog.slug}`}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all duration-200"
                          >
                            <span>{lang === "fr" ? "Lire l'histoire" : "Read Story"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Blog grid */}
                {gridBlog.length > 0 ? (
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {gridBlog.map((post) => (
                        <motion.div
                          layout
                          key={post.id}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.25 }}
                        >
                          <BlogCard post={post} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  !showFeatured && (
                    <EmptyState
                      lang={lang}
                      onClear={() => {
                        setSearchQuery("");
                        setActiveCategory("all");
                      }}
                      message={t.news.noResults}
                    />
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-blue-600 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-4">
                {lang === "fr" ? "Restez Connectés" : "Stay Connected"}
              </h2>
              <p className="text-blue-100 text-base mb-8 max-w-xl mx-auto leading-relaxed">
                {lang === "fr"
                  ? "Soutenez nos programmes et aidez-nous à transformer des vies au Rwanda."
                  : "Support our programs and help us transform lives across Rwanda."}
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-blue-50 transition-all duration-200 shadow-sm"
                >
                  {lang === "fr" ? "Nous Contacter" : "Contact Us"}
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 bg-yellow-400 text-black px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-yellow-300 transition-all duration-200 shadow-sm"
                >
                  {lang === "fr" ? "Faire un Don" : "Donate Now"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EmptyState({
  lang,
  onClear,
  message,
}: {
  lang: "en" | "fr";
  onClear: () => void;
  message: string;
}) {
  return (
    <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm max-w-xl mx-auto p-8">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
        <Search className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">{message}</h3>
      <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
        {lang === "fr"
          ? "Essayez de vider votre recherche ou de choisir une autre catégorie."
          : "Try clearing your search query or choosing another category."}
      </p>
      <button
        onClick={onClear}
        className="px-6 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
      >
        {lang === "fr" ? "Effacer les Filtres" : "Clear Filters"}
      </button>
    </div>
  );
}
