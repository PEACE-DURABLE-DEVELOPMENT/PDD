import Link from "next/link";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";
import ProgramCard from "@/components/ProgramCard";

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
      full: lang === "fr" ? "Ce programme garantit que les familles vulnérables reçoivent des filtres à eau, réduisant les risques pour la santé et gardant les enfants en bonne santé pour l'école." : "This program ensures vulnerable families receive water filters, reducing health risks and keeping children healthy for school.",
      iconName: "filter",
      color: "text-blue-500",
      bg: "bg-blue-50",
      image: "/fita.webp",
    },
    {
      id: "fight-malnutrition",
      title: t.programs.items.malnutrition.title,
      description: t.programs.items.malnutrition.desc,
      full: lang === "fr" ? "Nous donnons aux mères les connaissances et les ressources nécessaires pour cultiver des aliments nutritifs, garantissant que les enfants grandissent forts et en bonne santé." : "We empower mothers with knowledge and resources to cultivate nutritious foods, ensuring children grow up strong and healthy.",
      iconName: "apple",
      color: "text-red-500",
      bg: "bg-red-50",
      image: "/mal.webp",
    },
    {
      id: "mediation-and-conflict-resolution",
      title: t.programs.items.mediation.title,
      description: t.programs.items.mediation.desc,
      full: lang === "fr" ? "En formant les dirigeants locaux à la résolution des conflits, nous bâtissons une base de compréhension mutuelle, transformant les communautés de l'intérieur." : "By training local leaders in conflict resolution, we build a foundation of mutual understanding, transforming communities from within.",
      iconName: "users",
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      image: "/px.webp",
    },
    {
      id: "trauma-healing",
      title: t.programs.items.healing.title,
      description: t.programs.items.healing.desc,
      full: lang === "fr" ? "Nos conseillers dévoués offrent des espaces sûrs aux individus pour traiter le deuil et les traumatismes, ouvrant la voie à la guérison émotionnelle et à la paix." : "Our dedicated counselors provide safe spaces for individuals to process grief and trauma, paving the way for emotional recovery and peace.",
      iconName: "heartPulse",
      color: "text-rose-500",
      bg: "bg-rose-50",
      image: "/trouma.webp",
    },
    {
      id: "empowered-families-literacy",
      title: t.programs.items.literacy.title,
      description: t.programs.items.literacy.desc,
      full: lang === "fr" ? "L'accès à l'éducation est un droit fondamental. Nous proposons des cours qui équipent les familles de compétences en lecture et en écriture, ouvrant les portes à de nouvelles opportunités." : "Access to education is a fundamental right. We offer classes that equip families with reading and writing skills, opening doors to new opportunities.",
      iconName: "bookOpenCheck",
      color: "text-orange-500",
      bg: "bg-orange-50",
      image: "/medi.webp",
    },
    {
      id: "vsla",
      title: t.programs.items.vsla.title,
      description: t.programs.items.vsla.desc,
      full: lang === "fr" ? "Grâce à des groupes d'épargne localisés, les individus apprennent la gestion financière, accèdent à des micro-crédits et renforcent ensemble leur résilience économique." : "Through localized savings groups, individuals learn financial management, access micro-loans, and build economic resilience together.",
      iconName: "landmark",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      image: "/vsl.jpg",
    },
    {
      id: "reserving-forests",
      title: t.programs.items.forests.title,
      description: t.programs.items.forests.desc,
      full: lang === "fr" ? "Cette initiative environnementale encourage la plantation d'arbres communautaires et les pratiques durables pour lutter contre l'érosion des sols et préserver les ressources naturelles." : "This environmental initiative encourages community tree planting and sustainable practices to combat soil erosion and preserve natural resources.",
      iconName: "treePine",
      color: "text-green-500",
      bg: "bg-green-50",
      image: "/veg.webp",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative py-10 md:py-14 bg-black overflow-hidden border-b-4 border-yellow-500">
        {/* Subtle background gradient and patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-95"></div>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold text-xs uppercase tracking-wider mb-4">
              {t.programs.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold !text-white mb-6 leading-tight tracking-tight">
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
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} lang={lang} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-surface border-t border-border relative overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#eab308 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative bg-blue-950 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 text-center overflow-hidden border-2 border-blue-900 shadow-2xl">
            
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              {/* badge */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-950/60 border border-blue-500/30 rounded-full text-blue-300 font-bold text-xs uppercase tracking-widest mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                {t.programs.ctaBadge}
              </span>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black !text-white mb-6 leading-tight">
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
