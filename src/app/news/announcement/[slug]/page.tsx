import { getAnnouncementBySlug, getAnnouncements } from "@/lib/announcementAirtable";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Megaphone, Tag } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const item = await getAnnouncementBySlug(resolvedParams.slug);

  if (!item) {
    return { title: "Announcement Not Found - PDD Rwanda" };
  }

  return {
    title: `${item.title} | PDD Rwanda`,
    description: item.body.substring(0, 160),
  };
}

export default async function AnnouncementDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const item = await getAnnouncementBySlug(resolvedParams.slug);

  if (!item) notFound();

  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  const formattedDate = new Date(item.date).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50/50 selection:bg-blue-600/20 selection:text-slate-900">
      {/* Article Header */}
      <section className="relative pt-28 pb-12 px-4 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-50/50 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-blue-50/30 rounded-full blur-[80px] -z-10" />

        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Back link */}
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-blue-600" />
            {t.news.backLink}
          </Link>

          {/* Badges */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold uppercase tracking-widest shadow-sm">
              <Megaphone className="w-3.5 h-3.5" />
              {lang === "fr" ? "Annonce Officielle" : "Official Announcement"}
            </span>
            {item.category && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-extrabold uppercase tracking-widest">
                <Tag className="w-3.5 h-3.5" />
                {item.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
            {item.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-6 py-5 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-6">
              {/* Organization */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                  <Megaphone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xxs text-slate-400 font-bold uppercase tracking-wider">
                    {lang === "fr" ? "Publié par" : "Published by"}
                  </div>
                  <div className="text-slate-900 font-bold text-sm">PDD Rwanda</div>
                </div>
              </div>

              <div className="w-px h-8 bg-slate-100 hidden md:block" />

              {/* Date */}
              <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-xxs text-slate-400 font-bold uppercase tracking-wider">
                    {lang === "fr" ? "Date" : "Date"}
                  </div>
                  <time dateTime={item.date} className="text-slate-700 font-semibold">
                    {formattedDate}
                  </time>
                </div>
              </div>
            </div>

            <ShareButton title={item.title} />
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {item.coverImage && (
        <section className="px-4 mb-16 relative z-20 -mt-6">
          <div className="container mx-auto max-w-4xl">
            <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden bg-slate-100 shadow-lg border border-white">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Body Content */}
      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-slate max-w-none md:prose-lg first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-2 first-letter:float-left first-letter:font-heading">
            {item.body.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 leading-relaxed text-slate-700 font-sans text-justify text-base md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-6 justify-between items-center bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div>
              <h4 className="text-xl font-heading font-extrabold text-slate-900 mb-2">
                {t.blog.ctaTitle}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                {t.blog.ctaSub}
              </p>
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

export async function generateStaticParams() {
  const announcements = await getAnnouncements();
  return announcements.map((a) => ({ slug: a.slug }));
}
