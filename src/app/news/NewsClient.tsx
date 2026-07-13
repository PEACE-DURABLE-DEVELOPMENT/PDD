"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Megaphone, BookOpen, Calendar } from "lucide-react";
import { BlogPost } from "@/lib/blogAirtable";
import { Announcement } from "@/lib/announcementAirtable";
import SmartImage from "@/components/SmartImage";
import BlogCard from "@/components/BlogCard";

interface NewsClientProps {
  blogPosts: BlogPost[];
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
    <article className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full min-w-[300px]">
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
  // Show up to 3 items on the main news landing
  const topAnnouncements = announcements.slice(0, 3);
  const topBlogs = blogPosts.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* ── Hero ── */}
      <section className="relative bg-white pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-100 overflow-hidden">
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
              {t.news?.badge || "Latest Updates"}
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
              {t.news?.heroSub || "Stay informed with the latest announcements, field reports, and stories."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Announcements Section ── */}
      <section className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Megaphone className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-slate-900">
                {lang === "fr" ? "Dernières Annonces" : "Latest Announcements"}
              </h2>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {topAnnouncements.map((ann) => (
              <motion.div
                key={ann.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="w-[85vw] sm:w-[400px] flex-shrink-0 snap-start"
              >
                <AnnouncementCard item={ann} lang={lang} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/news/announcements"
              className="inline-flex items-center gap-2 bg-white text-blue-700 border border-blue-200 hover:border-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full font-bold transition-all shadow-sm group"
            >
              <span>{lang === "fr" ? "Voir toutes les annonces" : "View All Announcements"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Blogs & Stories Section ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-slate-900">
                {lang === "fr" ? "Blog & Histoires" : "Blog & Stories"}
              </h2>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {topBlogs.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="w-[85vw] sm:w-[400px] flex-shrink-0 snap-start"
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-white text-blue-700 border border-blue-200 hover:border-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full font-bold transition-all shadow-sm group"
            >
              <span>{lang === "fr" ? "Voir tous les articles" : "View All Stories"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
