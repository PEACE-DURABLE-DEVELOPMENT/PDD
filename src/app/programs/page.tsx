import SmartImage from "@/components/SmartImage";
import { ArrowRight, Filter, Apple, Users, HeartPulse, BookOpenCheck, Landmark, TreePine } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";

export const metadata = {
  title: "Our Programs | PDD Rwanda",
  description: "Explore our diverse programs designed to uplift and support communities through targeted interventions.",
};

export default async function ProgramsPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  const programs = [
    {
      id: "filter-distribution",
      title: t.programs.items.filter.title,
      description: t.programs.items.filter.desc,
      icon: Filter,
      color: "text-blue-500",
      bg: "bg-blue-50",
      image: "/fita.webp",
    },
    {
      id: "fight-malnutrition",
      title: t.programs.items.malnutrition.title,
      description: t.programs.items.malnutrition.desc,
      icon: Apple,
      color: "text-red-500",
      bg: "bg-red-50",
      image: "/mal.webp",
    },
    {
      id: "mediation-and-conflict-resolution",
      title: t.programs.items.mediation.title,
      description: t.programs.items.mediation.desc,
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      image: "/medi.webp",
    },
    {
      id: "trauma-healing",
      title: t.programs.items.healing.title,
      description: t.programs.items.healing.desc,
      icon: HeartPulse,
      color: "text-rose-500",
      bg: "bg-rose-50",
      image: "/trouma.webp",
    },
    {
      id: "empowered-families-literacy",
      title: t.programs.items.literacy.title,
      description: t.programs.items.literacy.desc,
      icon: BookOpenCheck,
      color: "text-orange-500",
      bg: "bg-orange-50",
      image: "/medi.webp",
    },
    {
      id: "vsla",
      title: t.programs.items.vsla.title,
      description: t.programs.items.vsla.desc,
      icon: Landmark,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      image: "/vsl.jpg",
    },
    {
      id: "reserving-forests",
      title: t.programs.items.forests.title,
      description: t.programs.items.forests.desc,
      icon: TreePine,
      color: "text-green-500",
      bg: "bg-green-50",
      image: "/veg.webp",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-black overflow-hidden border-b-4 border-yellow-500">
        {/* Subtle background gradient and patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-95"></div>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold text-xs uppercase tracking-wider mb-4">
              {t.programs.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 leading-tight uppercase tracking-tight">
              {lang === "fr" ? (
                <>Des Programmes qui <span className="text-yellow-400">Autonomisent</span> les Communautés</>
              ) : (
                <>Programs that <span className="text-yellow-400">Empower</span> Communities</>
              )}
            </h1>
            <div className="h-1 w-24 bg-blue-500 mb-6 rounded-full"></div>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              {t.programs.heroSub}
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid Layout */}
      <section className="py-24 bg-surface-alt relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <div 
                  key={program.id} 
                  className="group relative flex flex-col bg-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border"
                >
                  {/* Top Image */}
                  <div className="w-full aspect-[4/3] relative overflow-hidden">
                    <SmartImage 
                      cloudinaryUrl={program.image}
                      label={`Program: ${program.title}`}
                      aspectRatio="4/3"
                      className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-heading/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Card Content overlap */}
                  <div className="relative p-8 flex flex-col flex-grow bg-surface z-10 transform -translate-y-6 mx-4 rounded-2xl shadow-lg border border-border/50 group-hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${program.bg}`}>
                        <Icon className={`w-6 h-6 ${program.color}`} />
                      </div>
                      <h2 className="text-xl font-heading font-bold text-ink-heading line-clamp-2">
                        {program.title}
                      </h2>
                    </div>
                    
                    <p className="text-ink-body mb-8 flex-grow leading-relaxed">
                      {program.description}
                    </p>
                    
                    <div className="mt-auto pt-5 border-t border-border">
                      <Link
                        href="/donate"
                        className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-3 px-5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group/link"
                      >
                        {lang === "fr" ? "Découvrez comment soutenir" : "Learn how to support"}
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-surface border-t border-border relative overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#eab308 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative bg-black rounded-[3rem] p-10 md:p-20 text-center overflow-hidden border-2 border-slate-800 shadow-2xl">
            {/* Glowing blur effects */}
            <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[300px] h-[300px] bg-blue-600/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[300px] h-[300px] bg-yellow-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              {/* badge */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-950/60 border border-blue-500/30 rounded-full text-blue-300 font-bold text-xs uppercase tracking-widest mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                {t.programs.ctaBadge}
              </span>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight">
                {lang === "fr" ? (
                  <>Prêt à faire un impact <span className="text-yellow-400">durable</span> ?</>
                ) : (
                  <>Ready to make a <span className="text-yellow-400">lasting</span> impact?</>
                )}
              </h2>
              
              <div className="h-1 w-20 bg-blue-500 mb-8 rounded-full"></div>

              <p className="text-base md:text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-2xl">
                {t.programs.ctaSub}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center px-10 py-5 bg-yellow-400 hover:bg-yellow-500 text-slate-950 rounded-full font-extrabold text-sm uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_4px_30px_rgba(234,179,8,0.5)] hover:-translate-y-0.5"
                >
                  {t.programs.ctaBtn1}
                </Link>
                <Link
                  href="/contact?type=partner"
                  className="inline-flex items-center justify-center px-10 py-5 border-2 border-blue-500 text-blue-400 hover:text-white hover:bg-blue-600/20 rounded-full font-extrabold text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5"
                >
                  {t.programs.ctaBtn2}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
