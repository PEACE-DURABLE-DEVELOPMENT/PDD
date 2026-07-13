"use client";

import { Publication } from "@/lib/publicationsAirtable";
import { Download, FileText, Calendar, User } from "lucide-react";
import { useState } from "react";

interface PublicationsSectionProps {
  publications: Publication[];
  translations: {
    badge: string;
    title: string;
    sub: string;
    download: string;
  };
}

export default function PublicationsSection({ publications, translations }: PublicationsSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!publications || publications.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    try {
      const [year, month, day] = dateString.split('-');
      if (!year || !month || !day) return dateString;
      const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
      return date.toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
            <FileText className="w-4 h-4" />
            {translations.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mb-4">
            {translations.title}
          </h2>
          <p className="text-slate-500 text-lg">
            {translations.sub}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((pub) => (
              <div 
                key={pub.id}
                className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                onMouseEnter={() => setHoveredId(pub.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Top accent color bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-emerald-400" />
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">
                      {pub.type || "Document"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {pub.title}
                  </h3>
                  
                  {pub.description && (
                    <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                      {pub.description}
                    </p>
                  )}

                  <div className="mt-auto pt-4 border-t border-slate-100 space-y-2 mb-6">
                    <div className="flex items-center text-xs text-slate-500">
                      <User className="w-3.5 h-3.5 mr-2" />
                      <span className="truncate">{pub.author || "PDD Rwanda"}</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 mr-2" />
                      <span>{formatDate(pub.date)}</span>
                    </div>
                  </div>

                  {pub.attachmentUrl ? (
                    <a
                      href={pub.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        hoveredId === pub.id 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                          : "bg-slate-50 text-blue-600 border border-blue-100 hover:bg-blue-50"
                      }`}
                    >
                      <Download className={`w-4 h-4 mr-2 ${hoveredId === pub.id ? "animate-bounce" : ""}`} />
                      {translations.download}
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed"
                    >
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
