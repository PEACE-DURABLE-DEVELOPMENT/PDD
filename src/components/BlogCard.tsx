"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/lib/blogAirtable";
import SmartImage from "./SmartImage";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { translateCategory } from "./BlogFeed";

// Helper to resolve categories dynamically based on post contents or Airtable field
export const getPostCategory = (post: { title: string; content: string; excerpt: string; category?: string }) => {
  if (post.category) {
    return post.category;
  }
  const text = `${post.title} ${post.content} ${post.excerpt}`.toLowerCase();
  if (text.includes("water") || text.includes("filter") || text.includes("filtration") || text.includes("gashaki")) {
    return "Water & Sanitation";
  }
  if (text.includes("agricultural") || text.includes("farm") || text.includes("crop") || text.includes("grow")) {
    return "Sustainable Agriculture";
  }
  if (text.includes("trauma") || text.includes("healing") || text.includes("peace") || text.includes("counsel")) {
    return "Peacebuilding & Healing";
  }
  return post.category || "Community Update";
};

// Helper to estimate reading time
export const getReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export default function BlogCard({ post }: { post: BlogPost }) {
  const { language } = useLanguage();
  const t = translations[language];

  const formattedDate = new Date(post.date).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const category = getPostCategory(post);
  const readingTime = getReadingTime(post.content);

  const authorInitials = post.author
    ? post.author
    : "PD";

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-350 h-full">
      {/* Decorative top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left z-10" />

      {/* Image Area */}
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-50 shrink-0">
        {post.imageUrl ? (
          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
            <SmartImage
              cloudinaryUrl={post.imageUrl}
              label={post.title}
              aspectRatio="16/10"
              className="w-full h-full rounded-none"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-50 to-slate-50 text-slate-400">
            <span className="font-medium text-sm">{language === "fr" ? "Aucune image disponible" : "No image available"}</span>
          </div>
        )}
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-900/90 text-white text-xxs font-extrabold uppercase tracking-widest backdrop-blur-sm">
            {translateCategory(category, language)}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-6">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wide">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{readingTime}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="block mb-3">
          <h3 className="text-xl font-heading font-extrabold text-slate-900 leading-tight group-hover:text-yellow-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow text-justify">
          {post.excerpt}
        </p>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-50 mt-auto">
          {/* Author Badge */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 border border-yellow-100 font-heading font-bold text-xs uppercase shadow-sm">
              {authorInitials.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
            </div>
            <span className="text-xs font-bold text-slate-800 tracking-wide">{post.author}</span>
          </div>

          {/* Read More link */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-slate-900 font-bold text-xs uppercase tracking-wider group/btn"
          >
            <span>{t.common.readStory}</span>
            <ArrowRight className="w-3.5 h-3.5 text-yellow-500 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
