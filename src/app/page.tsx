import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";
import HomeProjectsSlider from "@/components/HomeProjectsSlider";
import HeroSlider from "@/components/HeroSlider";

export default async function Home() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];



  const projectsList = [
    {
      id: "peace",
      title: t.projects.items.peace.title.split('(')[0].trim(),
      image: "/peace.webp",
      summary: t.projects.items.peace.short,
    },
    {
      id: "fsca",
      title: t.projects.items.fsca.title.split('(')[0].trim(),
      image: "/cons.webp",
      summary: t.projects.items.fsca.short,
    },
    {
      id: "rights",
      title: t.projects.items.rights.title.split('(')[0].trim(),
      image: "/human.webp",
      summary: t.projects.items.rights.short,
    },
    {
      id: "poverty",
      title: t.projects.items.poverty.title,
      image: "/pover.webp",
      summary: t.projects.items.poverty.short,
    },
    {
      id: "water",
      title: t.projects.items.water.title,
      image: "/fill.webp",
      summary: t.projects.items.water.short,
    },
    {
      id: "library",
      title: t.projects.items.library.title,
      image: "/liba.jpeg",
      summary: t.projects.items.library.short,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/* Hero Section */}
      <HeroSlider
        heroTitle1={t.home.heroTitle1}
        heroTitle2={t.home.heroTitle2}
        ourProjectsText={t.home.ourProjects}
        supportWorkText={t.common.supportWork}
      />

      {/* Who We Are */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative max-w-sm lg:max-w-md mx-auto w-full">
              <div className="absolute -inset-4 bg-blue-600/20 rounded-[3rem] transform -rotate-3 z-0"></div>
              <div className="relative z-10 w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <SmartImage
                  cloudinaryUrl="/boy.webp"
                  label="A young boy representing the future of Rwanda"
                  aspectRatio="4/5"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* Content Side */}
            <div className="flex flex-col items-start text-left lg:pr-12">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-700 font-bold text-sm mb-6 uppercase tracking-wider">
                {t.home.whoWeAreBadge}
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                {t.home.whoWeAreTitle}<span className="text-blue-700">{t.home.whoWeAreTitleAccent}</span>
              </h2>
              <p className={`text-lg text-slate-600 leading-relaxed text-justify ${t.home.whoWeArePara2 ? 'mb-6' : 'mb-10'}`}>
                {t.home.whoWeArePara1}
              </p>
              {t.home.whoWeArePara2 && (
                <p className="text-lg text-slate-600 leading-relaxed mb-10 text-justify">
                  {t.home.whoWeArePara2}
                </p>
              )}
              <Link
                href="/founder-message"
                className="inline-flex items-center gap-3 bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-md hover:shadow-lg group"
              >
                {t.common.learnMore}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Projects Showcase — Card Flip */}
      <section className="py-28 bg-[#FFFCF2] overflow-hidden relative">
        {/* Decorative dot grid */}
        <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: 'radial-gradient(#eab308 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        
        <style>{`
          .flip-card { position: relative; }
          .flip-card-front,
          .flip-card-back {
            position: absolute;
            inset: 0;
            border-radius: 1.25rem;
            overflow: hidden;
            transition: opacity 0.35s ease;
          }
          .flip-card-front  { opacity: 1; pointer-events: auto; }
          .flip-card-back   { opacity: 0; pointer-events: none; }
          
          .flip-card-input:checked + .flip-card .flip-card-front {
            opacity: 0;
            pointer-events: none;
          }
          .flip-card-input:checked + .flip-card .flip-card-back {
            opacity: 1;
            pointer-events: auto;
          }
        `}</style>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="inline-block py-1 px-4 rounded-full bg-blue-600/20 text-blue-800 font-bold text-sm mb-5 uppercase tracking-widest border border-blue-600/30">
              {t.home.whatWeDoBadge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 leading-tight">
              {t.home.whatWeDoTitle}
            </h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mt-5 rounded-full" />
          </div>

          {/* Card Grid / Swiper */}
          <HomeProjectsSlider projectsList={projectsList} t={t} />

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 bg-blue-600 text-white font-extrabold px-6 py-3.5 sm:px-10 sm:py-5 rounded-full text-sm sm:text-lg uppercase tracking-wider hover:bg-blue-700 transition-all shadow-[8px_8px_0px_0px_rgba(234,179,8,0.25)] hover:shadow-[4px_4px_0px_0px_rgba(234,179,8,0.25)] hover:translate-y-1 group"
            >
              {t.home.viewAllProjects}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* PDD Burera Beneficiary Story Section */}
      <section className="py-28 bg-[#FFFDF9] overflow-hidden relative border-t border-b border-amber-100">
        {/* Background graphic elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-700/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Left side: quote */}
            <div className="lg:col-span-7 relative">
              {/* Huge stylized double quote mark floating in background */}
              <span className="absolute -top-28 -left-8 text-[14rem] md:text-[16rem] font-serif text-blue-600/25 leading-none select-none pointer-events-none z-0">
                “
              </span>
              
              <div className="relative z-10 space-y-8 pl-4 sm:pl-8">
                {/* Tag/Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-600/30 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-700 animate-pulse" />
                  <span className="text-xs font-black text-blue-900 uppercase tracking-widest">
                    {t.home.beneficiaryBadge}
                  </span>
                </div>
                
                {/* The Quote Block */}
                <blockquote className="space-y-6">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-slate-900 leading-[1.15] tracking-tight">
                    &ldquo;{t.home.beneficiaryQuote1Pre} <span className="line-through text-slate-400 decoration-red-500/80 decoration-[3px] underline-offset-4">{t.home.beneficiaryQuote1Strike}</span>. {t.home.beneficiaryQuote1Post} <span className="bg-blue-600 text-white px-3 py-1 rounded-xl inline-block transform -rotate-1 font-black shadow-md mx-1 tracking-wide">{t.home.beneficiaryQuote1Accent}</span>!&rdquo;
                  </p>
                  
                  <p className="text-xl md:text-2xl font-light text-slate-700 leading-relaxed italic border-l-4 border-blue-600 pl-4">
                    &ldquo;{t.home.beneficiaryQuote2}&rdquo;
                  </p>
                </blockquote>
                
                {/* Sign-off / Citation */}
                <div className="pt-4 flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-blue-600" />
                  <div>
                    <cite className="block not-italic">
                      <span className="block font-black text-slate-900 text-lg uppercase tracking-wide">
                        {t.home.beneficiaryAuthor}
                      </span>
                      <span className="block text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                        {t.home.beneficiaryLoc}
                      </span>
                    </cite>
                  </div>
                </div>

                {/* Explore Our Programs Button (Desktop only) */}
                <div className="pt-4 hidden lg:block">
                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-3 bg-blue-600 text-white font-extrabold px-6 py-3.5 rounded-full text-sm uppercase tracking-wider hover:bg-blue-700 transition-all shadow-[6px_6px_0px_0px_rgba(234,179,8,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(234,179,8,0.2)] hover:translate-y-0.5 group"
                  >
                    {t.home.explorePrograms}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side: Framed image */}
            <div className="lg:col-span-5 relative">
              {/* Decorative background border block (yellow solid offset box) */}
              <div className="absolute inset-0 bg-blue-600 translate-x-4 translate-y-4 rounded-[2rem] shadow-lg pointer-events-none z-0" />
              
              {/* Main Image Card Wrapper */}
              <div className="relative bg-white p-4 rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden z-10">
                <SmartImage
                  cloudinaryUrl="/muzehe.png"
                  label="Jean Damascene, potato farmer in Burera District"
                  aspectRatio="4/5"
                  className="w-full h-full rounded-[1.5rem] object-cover"
                />
                
                {/* stamp / Geographical coordinates overlay */}
                <div className="absolute bottom-8 left-8 right-8 bg-slate-950/90 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10 text-white z-20 flex items-center justify-between shadow-2xl">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">{t.home.stampLocation}</p>
                    <p className="text-sm font-extrabold tracking-wide mt-0.5">{t.home.stampLocationVal}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{t.home.stampProgram}</p>
                    <p className="text-sm font-extrabold tracking-wide text-white mt-0.5">{t.home.stampProgramVal}</p>
                  </div>
                </div>
              </div>

              {/* Decorative crop mark decorations for expert editorial feel */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-slate-300 pointer-events-none z-20" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-slate-300 pointer-events-none z-20" />

              {/* Explore Our Programs Button (Mobile only, under image) */}
              <div className="mt-12 text-center lg:hidden relative z-30">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-3 bg-blue-600 text-white font-extrabold px-6 py-3.5 rounded-full text-sm uppercase tracking-wider hover:bg-blue-700 transition-all shadow-[6px_6px_0px_0px_rgba(234,179,8,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(234,179,8,0.2)] hover:translate-y-0.5 group"
                >
                  {t.home.explorePrograms}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-blue-950 rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
              {/* Image Side */}
              <div className="h-64 lg:h-full w-full relative">
                <SmartImage
                  cloudinaryUrl="/fill.webp"
                  label="Join us in making a difference"
                  aspectRatio="16/9"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-800 text-white font-bold text-sm mb-4 uppercase tracking-wider self-start">
                  {t.home.getInvolved}
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold !text-blue-400 mb-4 leading-tight">
                  {t.home.readyImpact} <br/><span className="!text-white">{t.home.readyImpactAccent}</span>
                </h2>
                <p className="text-base text-white leading-relaxed mb-6">
                  {t.home.ctaText}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="bg-yellow-400 text-slate-950 hover:bg-yellow-500 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-sm sm:text-base text-center transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    {t.common.supportWork}
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-yellow-400 text-white hover:bg-yellow-400/10 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-sm sm:text-base text-center transition-all backdrop-blur-sm hover:-translate-y-1"
                  >
                    {t.common.contact}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
