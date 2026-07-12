import { getBlogPosts } from "@/lib/blogAirtable";
import BlogFeed from "@/components/BlogFeed";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";

export const metadata = {
  title: "Blog & Stories | PDD Rwanda",
  description: "Read stories of impact, updates on our programs, and insights from our team.",
};

export default async function BlogPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative bg-white pt-28 pb-20 md:pt-36 md:pb-28 border-b border-slate-100 overflow-hidden">
        {/* Decorative dot background */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#eab308 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
        
        {/* Decorative radial blur gradient */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-50/40 rounded-full blur-[80px] -z-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-600/10 text-blue-800 font-bold text-xs uppercase tracking-widest mb-6 border border-blue-600/20">
              {t.blog.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
              {lang === "fr" ? (
                <>Voix d&apos;<span className="text-blue-700 relative">Impact<span className="absolute bottom-1 left-0 right-0 h-1.5 bg-blue-600/30 -z-10" /></span> & de Changement</>
              ) : (
                <>Voices of <span className="text-blue-700 relative">Impact<span className="absolute bottom-1 left-0 right-0 h-1.5 bg-blue-600/30 -z-10" /></span> & Change</>
              )}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {t.blog.heroSub}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Feed Section */}
      <section className="py-16 bg-slate-50/50 flex-grow">
        <div className="container mx-auto px-4">
          <BlogFeed posts={posts} />
        </div>
      </section>
    </div>
  );
}
