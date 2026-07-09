import SmartImage from "@/components/SmartImage";
import { Quote } from "lucide-react";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";
import Link from "next/link";

export const metadata = {
  title: "A Message from Our Founder | PDD Rwanda",
  description: "A profound message from Eugene Twizerimana, founder of Peace and Durable Development (PDD) Rwanda.",
};

export default async function FounderMessagePage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-surface">
      <section className="relative bg-surface-alt border-b border-border overflow-hidden py-16 md:py-24">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-accent/15 text-accent font-bold text-sm uppercase tracking-widest mb-6">
                {t.founderMessage.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-ink-heading leading-tight mb-6">
                {t.founderMessage.title}
              </h1>
            </div>

            {/* Content & Image */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-2xl shadow-primary/5 border border-border relative overflow-hidden">
              <div className="absolute -top-10 -left-10 text-accent/5 rotate-12">
                <Quote size={200} strokeWidth={1} />
              </div>

              <div className="relative z-10">
                {/* Founder Image */}
                <div className="float-none md:float-right md:ml-12 mb-8 md:mb-4 w-full md:w-72 lg:w-80 shrink-0">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
                    <SmartImage
                      cloudinaryUrl="/boss.png"
                      label={t.founderMessage.founderName}
                      aspectRatio="4/5"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-6 text-center md:text-left">
                    <p className="font-heading font-bold text-2xl text-ink-heading m-0">{t.founderMessage.founderName}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mt-1">
                      {t.founderMessage.founderTitle}
                    </p>
                  </div>
                </div>

                {/* Message text */}
                <div className="text-lg md:text-xl text-ink-body font-serif leading-[1.8] space-y-6 text-justify">
                  <p className="first-letter:text-6xl first-letter:font-heading first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                    {t.founderMessage.p1}
                  </p>
                  <p>{t.founderMessage.p2}</p>
                  <p>{t.founderMessage.p3}</p>
                  <p>{t.founderMessage.p4}</p>
                  <p>{t.founderMessage.p5}</p>
                  <p>{t.founderMessage.p6}</p>
                  <p className="font-medium italic text-ink-heading">
                    {t.founderMessage.p7}
                  </p>

                  <div className="mt-12 pt-8 border-t border-border/60">
                    <p className="font-medium italic text-accent text-xl mb-4">{t.founderMessage.signoff}</p>
                    {/* Minimal signature representation */}
                    <div className="font-['Brush_Script_MT',cursive,serif] text-4xl text-ink-heading opacity-80">
                      Eugene Twizerimana
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                 <Link href="/" className="inline-flex items-center gap-3 bg-surface-alt border-2 border-border hover:border-primary text-ink-heading hover:text-primary px-8 py-3 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-md group">
                    <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                    {t.home.backBtn}
                 </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
