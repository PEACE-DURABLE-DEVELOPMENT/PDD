import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogAirtable";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";
import { translateCategory } from "@/components/BlogFeed";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: "Story Not Found - PDD Rwanda",
    };
  }
  
  return {
    title: `${post.title} - PDD Rwanda`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  const formattedDate = new Date(post.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const category = getPostCategory(post);
  const readingTime = getReadingTime(post.content);

  const authorInitials = post.author
    ? post.author
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "PD";

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50/50 selection:bg-blue-600/20 selection:text-slate-900">
      {/* Article Header */}
      <section className="relative pt-28 pb-12 px-4 overflow-hidden bg-white border-b border-slate-100">
        {/* Decorative radial blur gradient */}
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-50/40 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-blue-700" /> {t.blog.backLink}
          </Link>
          
          <div className="mb-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xxs font-extrabold uppercase tracking-widest">
              {translateCategory(category, lang)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-6 py-5 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-6">
              {/* Author info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 border border-blue-100 font-heading font-bold text-xs uppercase shadow-sm">
                  {authorInitials}
                </div>
                <div>
                  <div className="text-xxs text-slate-400 font-bold uppercase tracking-wider">{t.common.writtenBy}</div>
                  <div className="text-slate-900 font-bold text-sm">{post.author}</div>
                </div>
              </div>
              
              <div className="w-px h-8 bg-slate-100 hidden md:block"></div>
              
              {/* Publish Date */}
              <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-xxs text-slate-400 font-bold uppercase tracking-wider">{t.common.published}</div>
                  <time dateTime={post.date} className="text-slate-700 font-semibold">{formattedDate}</time>
                </div>
              </div>

              <div className="w-px h-8 bg-slate-100 hidden md:block"></div>

              {/* Reading Time */}
              <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium">
                <Clock className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-xxs text-slate-400 font-bold uppercase tracking-wider">{t.common.readingTime}</div>
                  <span className="text-slate-700 font-semibold">{readingTime}</span>
                </div>
              </div>
            </div>
            
            <ShareButton title={post.title} />
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.imageUrl && (
        <section className="px-4 mb-16 relative z-20 -mt-6">
          <div className="container mx-auto max-w-4xl">
            <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden bg-slate-100 shadow-lg border border-white">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-slate max-w-none md:prose-lg first-letter:text-5xl first-letter:font-bold first-letter:text-blue-700 first-letter:mr-2 first-letter:float-left first-letter:font-heading">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed text-slate-700 font-sans text-justify text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-6 justify-between items-center bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div>
              <h4 className="text-xl font-heading font-extrabold text-slate-900 mb-2">{t.blog.ctaTitle}</h4>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">{t.blog.ctaSub}</p>
            </div>
            <Link
              href="/contact"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3.5 rounded-full font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap text-sm uppercase tracking-wider"
            >
              {t.common.supportWork}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper to resolve categories dynamically inside detail page
const getPostCategory = (post: { title: string; content: string; excerpt: string; category?: string }) => {
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
const getReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Generate static params for mock data
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
