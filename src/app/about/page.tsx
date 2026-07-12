import SmartImage from "@/components/SmartImage";
import { Heart, Users, TreePine, Handshake, Target, Compass, ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";
import TeamSlider from "@/components/TeamSlider";
import Link from "next/link";

export const metadata = {
  title: "About Us | PDD Rwanda",
  description: "Learn about the history, mission, and vision of Peace and Durable Development (PDD) Rwanda.",
};

export default async function AboutPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  const teamMembers = [
    {
      name: "Twizerimana Eugene",
      role: lang === "fr" ? "Directeur Exécutif" : "Executive Director",
      image: "/boss.png",
      description: lang === "fr"
        ? "Dirige la vision stratégique de PDD Rwanda, supervisant toutes les initiatives de consolidation de la paix et de développement, et établissant des partenariats mondiaux pour autonomiser les communautés locales."
        : "Leads PDD Rwanda's strategic vision, overseeing all peacebuilding and development initiatives, and building global partnerships to empower local communities.",
    },
    {
      name: "Niyigana Bernard",
      role: lang === "fr" ? "Chef de Projet FSCA" : "FSCA Project Lead",
      image: "/ber.webp",
      description: lang === "fr"
        ? "Coordonne l'initiative de sécurité alimentaire par l'agriculture de conservation (FSCA), formant les familles locales aux pratiques agricoles durables et à l'optimisation des rendements."
        : "Coordinates the Food Security through Conservation Agriculture (FSCA) initiative, training local families in sustainable agricultural practices and crop yield optimization.",
    },
    {
      name: "Byiringiro Samuel",
      role: lang === "fr" ? "Chef de Projet Agriculture de Conservation" : "Conservation Agriculture Project Lead",
      image: "/ca.webp",
      description: lang === "fr"
        ? "Supervise les opérations sur le terrain pour le développement agricole, mettant en œuvre des techniques agricoles respectueuses de l'environnement et l'agroforesterie pour promouvoir la résilience environnementale."
        : "Oversees field operations for agricultural development, implementing eco-friendly farming techniques and agroforestry to promote environmental resilience.",
    },
    {
      name: "Ngirankugire Bernadette",
      role: lang === "fr" ? "Comptable" : "Accountant",
      image: "/acc.webp",
      description: lang === "fr"
        ? "Gère la planification financière, la budgétisation et les rapports de PDD, garantissant la transparence, la responsabilité et une allocation efficace des ressources."
        : "Manages PDD's financial planning, budgeting, and reporting, ensuring transparency, accountability, and efficient resource allocation.",
    },
    {
      name: "Uwera Ernestine",
      role: lang === "fr" ? "Assistante FSCA" : "FSCA Assistant",
      image: "/ass.webp",
      description: lang === "fr"
        ? "Soutient l'équipe du projet FSCA dans les opérations sur le terrain, la sensibilisation communautaire et le suivi de la mise en œuvre des programmes agricoles."
        : "Supports the FSCA project team in field operations, community outreach, and monitoring agricultural program implementation.",
    },
    {
      name: "Gisubizo Gentille",
      role: lang === "fr" ? "Coordonnatrice de la Bibliothèque de la Paix" : "Peace Library Coordinator",
      image: "/lib.webp",
      description: lang === "fr"
        ? "Gère la bibliothèque communautaire pour la paix, facilitant les programmes éducatifs, les ateliers d'alphabétisation et les dialogues de jeunes pour favoriser une culture d'apprentissage et de réconciliation."
        : "Manages the community peace library, facilitating educational programs, literacy workshops, and youth dialogues to foster a culture of learning and reconciliation.",
    },
  ];

  const values = [
    { title: t.about.val1Title, desc: t.about.val1Desc, icon: <Handshake className="w-7 h-7" />, color: "text-primary bg-primary/10" },
    { title: t.about.val2Title, desc: t.about.val2Desc, icon: <Users className="w-7 h-7" />, color: "text-blue-600 bg-blue-600/10" },
    { title: t.about.val3Title, desc: t.about.val3Desc, icon: <TreePine className="w-7 h-7" />, color: "text-secondary bg-secondary/10" },
    { title: t.about.val4Title, desc: t.about.val4Desc, icon: <Heart className="w-7 h-7" />, color: "text-primary bg-primary/10" },
  ];

  const specificObjectives = [
    t.about.specificObjective1,
    t.about.specificObjective2,
    t.about.specificObjective3,
    t.about.specificObjective4,
  ];

  const strategies = [
    t.about.strategy1,
    t.about.strategy2,
    t.about.strategy3,
    t.about.strategy4,
    t.about.strategy5,
    t.about.strategy6,
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-surface">

      {/* ── MODERN SPLIT HERO / STORY SECTION ── */}
      <section className="relative bg-surface-alt border-b border-border overflow-hidden py-12 md:py-16">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-600/15 text-blue-600 font-semibold text-xs uppercase tracking-widest mb-4">
                  {t.about.aboutUsBadge}
                </span>
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-ink-heading mb-4 leading-tight">
                  {t.about.title}
                </h1>
                <p className="text-lg md:text-xl text-blue-600 font-medium italic">
                  &ldquo;{t.about.tagline}&rdquo;
                </p>
              </div>
              
              <div className="h-px bg-blue-600/30 w-24"></div>
              
              <p className="text-ink-body text-base md:text-lg leading-relaxed">
                {t.about.para1}
              </p>
              
              <div className="border-l-4 border-blue-600 pl-4 py-1">
                <p className="text-sm font-semibold text-ink-heading uppercase tracking-wider mb-1">
                  {lang === "fr" ? "Notre conviction" : "Our conviction"}
                </p>
                <p className="text-ink-body leading-relaxed">
                  {t.about.conviction}
                </p>
              </div>

              <div className="mt-4">
                <Link
                  href="/founder-message"
                  className="inline-flex items-center gap-3 bg-surface-alt border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-md group"
                >
                  {t.about.readFounderMessage}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-xl border border-white/50">
                <SmartImage
                  cloudinaryUrl="/peace.webp"
                  label="PDD Rwanda — community gathering"
                  aspectRatio="4/3"
                  className="w-full h-full hover:scale-[1.03] transition-transform duration-700 object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-4 bg-surface rounded-2xl shadow-xl border border-border px-5 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/15 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-ink-body font-medium">{lang === "fr" ? "Fondée en" : "Founded"}</p>
                  <p className="text-lg font-heading font-bold text-ink-heading leading-none">2001</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-20 md:py-24 bg-surface border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="relative bg-surface-alt rounded-3xl border border-border p-10 flex flex-col gap-5 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Heart className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-ink-heading mb-3">{t.about.missionTitle}</h2>
                <p className="text-ink-body leading-relaxed">{t.about.missionDesc}</p>
              </div>
            </div>
            {/* Vision */}
            <div className="relative bg-surface-alt rounded-3xl border border-border p-10 flex flex-col gap-5 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-ink-heading mb-3">{t.about.visionTitle}</h2>
                <p className="text-ink-body leading-relaxed">{t.about.visionDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-600/10 text-blue-600 font-semibold text-xs uppercase tracking-widest mb-4">
              {lang === "fr" ? "Ce qui nous guide" : "What guides us"}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink-heading mb-4">{t.about.valuesTitle}</h2>
            <p className="text-ink-body max-w-xl mx-auto text-lg">{t.about.valuesSub}</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-auto md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto hide-scrollbar">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-8 bg-surface-alt rounded-3xl border border-border w-[80vw] md:w-auto shrink-0 snap-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${value.color}`}>
                  {value.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-ink-heading mb-2">{value.title}</h3>
                <p className="text-ink-body text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBJECTIVES & STRATEGIES ── */}
      <section className="py-20 md:py-28 bg-surface-alt border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* Left col: image + global objective */}
            <div className="flex flex-col gap-8">
              {/* Global Objective card */}
              <div className="relative bg-primary rounded-3xl p-8 overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl pointer-events-none" />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/70">
                    {t.about.objectivesTitle}
                  </h3>
                  <p className="text-white/95 text-lg leading-relaxed font-medium">
                    {t.about.globalObjectiveDesc}
                  </p>
                </div>
              </div>

              {/* Field image */}
              <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-lg">
                <SmartImage
                  cloudinaryUrl="/hero.webp"
                  label="PDD Rwanda — field work"
                  aspectRatio="4/3"
                  className="w-full h-full hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right col: specific objectives + strategies */}
            <div className="flex flex-col gap-10">
              {/* Specific Objectives */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-ink-heading">
                    {lang === "fr" ? "Objectifs Spécifiques" : "Specific Objectives"}
                  </h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {specificObjectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-surface rounded-2xl border border-border p-4">
                      <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-ink-body text-sm leading-relaxed">{obj}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strategies */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-ink-heading">
                    {t.about.strategiesTitle}
                  </h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {strategies.map((strategy, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-ink-body text-sm leading-relaxed">{strategy}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest mb-4">
              {t.about.teamBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink-heading mb-4">
              {t.about.teamTitle}
            </h2>
            <p className="text-ink-body max-w-2xl mx-auto text-lg">
              {t.about.teamSub}
            </p>
          </div>

          <TeamSlider teamMembers={teamMembers} photoPendingText={t.common.photoPending} />
        </div>
      </section>

    </div>
  );
}
