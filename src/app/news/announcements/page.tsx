import { getAnnouncements } from "@/lib/announcementAirtable";
import AnnouncementsFeed from "@/components/AnnouncementsFeed";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Announcements | PDD Rwanda",
  description: "Stay informed with our latest official announcements and updates.",
};

export default async function AnnouncementsPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  const announcements = await getAnnouncements();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative bg-white pt-28 pb-16 md:pt-36 md:pb-20 border-b border-slate-100 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(#2563eb 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-50/40 rounded-full blur-[80px] -z-10" />

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-blue-700" />
            {t.news?.backLink || "Back to News"}
          </Link>
          
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-600/10 text-blue-800 font-bold text-xs uppercase tracking-widest mb-6 border border-blue-600/20">
              {lang === "fr" ? "Annonces Officielles" : "Official Announcements"}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
              {lang === "fr" ? (
                <>Dernières <span className="text-blue-700 relative">Annonces<span className="absolute bottom-1 left-0 right-0 h-1.5 bg-blue-600/30 -z-10" /></span></>
              ) : (
                <>Latest <span className="text-blue-700 relative">Announcements<span className="absolute bottom-1 left-0 right-0 h-1.5 bg-blue-600/30 -z-10" /></span></>
              )}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {lang === "fr" ? "Restez informés des mises à jour, des nouvelles importantes et des rapports officiels de PDD Rwanda." : "Stay informed with updates, important news, and official reports from PDD Rwanda."}
            </p>
          </div>
        </div>
      </section>

      {/* Announcements Feed Section */}
      <section className="py-16 bg-slate-50/50 flex-grow">
        <div className="container mx-auto px-4">
          <AnnouncementsFeed announcements={announcements} lang={lang} t={t} />
        </div>
      </section>
    </div>
  );
}
