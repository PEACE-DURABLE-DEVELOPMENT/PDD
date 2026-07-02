import SmartImage from "@/components/SmartImage";
import { Heart, Users, TreePine, Handshake, User } from "lucide-react";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";

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
      image: "/boss.webp",
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

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-surface-alt py-5 md:py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-accent/15 text-accent font-bold text-xs mb-3 uppercase tracking-wider">
              {t.about.aboutUsBadge}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-ink-heading mb-3">
              {t.about.title}
            </h1>
            <p className="text-base md:text-lg text-ink-body max-w-xl mx-auto leading-relaxed">
              {t.about.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7 prose prose-lg prose-slate max-w-none text-ink-body text-justify">
              <p>
                {t.about.para1}
              </p>
              
              <p className="text-xl font-medium text-ink-heading border-l-4 border-primary pl-6 py-2 my-8 italic">
                {t.about.conviction}
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-heading mt-12 mb-4">{t.about.rootCausesTitle}</h2>
              <p>
                {t.about.rootCausesDesc}
              </p>
              <ul className="space-y-3 my-6 list-disc pl-5">
                <li><strong>{t.about.rootCause1Title}</strong> — {t.about.rootCause1Desc}</li>
                <li><strong>{t.about.rootCause2Title}</strong> — {t.about.rootCause2Desc}</li>
                <li><strong>{t.about.rootCause3Title}</strong> — {t.about.rootCause3Desc}</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-ink-heading mt-12 mb-4">{t.about.approachTitle}</h2>
              <p>
                {t.about.approachPara1}
              </p>
              <p className="mt-4">
                {t.about.approachPara2}
              </p>
              <p className="mt-4">
                {t.about.approachPara3}
              </p>
            </div>
            
            <div className="lg:col-span-5 space-y-8">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm">
                <SmartImage 
                  cloudinaryUrl="/peace.webp"
                  label="About Us — community gathering or founders" 
                  aspectRatio="4/3" 
                  className="w-full h-full hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm">
                <SmartImage 
                  cloudinaryUrl="/hero.webp"
                  label="About Us — impactful field work" 
                  aspectRatio="4/3" 
                  className="w-full h-full hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-surface-alt border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-surface p-10 rounded-3xl shadow-sm border border-border flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-ink-heading mb-4">{t.about.missionTitle}</h2>
              <p className="text-ink-body leading-relaxed">
                {t.about.missionDesc}
              </p>
            </div>
            <div className="bg-surface p-10 rounded-3xl shadow-sm border border-border flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-ink-heading mb-4">{t.about.visionTitle}</h2>
              <p className="text-ink-body leading-relaxed">
                {t.about.visionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink-heading mb-4">{t.about.valuesTitle}</h2>
            <p className="text-ink-body max-w-2xl mx-auto text-lg">
              {t.about.valuesSub}
            </p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 hide-scrollbar">
            {[
              {
                title: t.about.val1Title,
                desc: t.about.val1Desc,
                icon: <Handshake className="w-8 h-8" />,
                color: "text-primary bg-primary/10"
              },
              {
                title: t.about.val2Title,
                desc: t.about.val2Desc,
                icon: <Users className="w-8 h-8" />,
                color: "text-accent bg-accent/10"
              },
              {
                title: t.about.val3Title,
                desc: t.about.val3Desc,
                icon: <TreePine className="w-8 h-8" />,
                color: "text-secondary bg-secondary/10"
              },
              {
                title: t.about.val4Title,
                desc: t.about.val4Desc,
                icon: <Heart className="w-8 h-8" />,
                color: "text-primary bg-primary/10"
              }
            ].map((value, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-8 bg-surface-alt rounded-2xl border border-border w-[85vw] md:w-auto shrink-0 snap-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${value.color}`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-ink-heading mb-3">{value.title}</h3>
                <p className="text-ink-body">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-surface-alt border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4 uppercase tracking-wider">
              {t.about.teamBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink-heading mb-4">
              {t.about.teamTitle}
            </h2>
            <p className="text-ink-body max-w-2xl mx-auto text-lg">
              {t.about.teamSub}
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto hide-scrollbar">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex flex-col bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 w-[85vw] md:w-auto shrink-0 snap-center">
                {/* Photo Placeholder / Image */}
                <div className="relative aspect-square w-full bg-slate-50 border-b border-border overflow-hidden">
                  {member.image ? (
                    <SmartImage
                      cloudinaryUrl={member.image}
                      label={`${member.name} — ${member.role}`}
                      aspectRatio="1/1"
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6">
                      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300 border border-slate-200">
                        <User className="w-10 h-10 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{t.common.photoPending}</span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-heading font-bold text-ink-heading mb-1 group-hover:text-primary transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
                    {member.role}
                  </p>
                  <p className="text-ink-body text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
