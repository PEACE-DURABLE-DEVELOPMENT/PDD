import StatsCounter from "@/components/StatsCounter";
import RippleEffectPathway from "@/components/RippleEffectPathway";
import GalleryFilterable from "@/components/GalleryFilterable";
import { getTestimonials, getGalleryImages } from "@/lib/airtable";
import { Quote, Sprout, Users, Coins, Droplets, Gift } from "lucide-react";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";

export const metadata = {
  title: "Our Impact | PDD Rwanda",
  description: "See the ripple effect of our work and read stories of transformation from the communities we serve.",
};

export default async function ImpactPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  const testimonials = await getTestimonials();
  const galleryImages = await getGalleryImages();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative bg-white pt-28 pb-20 md:pt-36 md:pb-28 border-b border-slate-100 overflow-hidden">
        {/* Decorative dot background */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#eab308 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
        
        {/* Decorative radial blur gradient */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-100/40 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-50/40 rounded-full blur-[80px] -z-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-yellow-400/10 text-yellow-700 font-bold text-xs uppercase tracking-widest mb-6 border border-yellow-400/20">
              {t.impact.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
              {lang === "fr" ? (
                <>Créer un Impact <span className="text-yellow-500 relative">Durable<span className="absolute bottom-1 left-0 right-0 h-1.5 bg-yellow-400/30 -z-10" /></span> au Rwanda</>
              ) : (
                <>Creating Sustainable <span className="text-yellow-500 relative">Impact<span className="absolute bottom-1 left-0 right-0 h-1.5 bg-yellow-400/30 -z-10" /></span> in Rwanda</>
              )}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {t.impact.heroSub}
            </p>
          </div>
        </div>
      </section>

      {/* Key Numbers Section */}
      <section className="py-16 bg-white relative z-20 -mt-8 border-b border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <StatsCounter
                value={720}
                label={t.impact.stats.farmers}
                icon={<Sprout className="w-6 h-6" />}
              />
            </div>
            <div>
              <StatsCounter
                value={20}
                suffix="k+"
                label={t.impact.stats.reached}
                icon={<Users className="w-6 h-6" />}
              />
            </div>
            <div>
              <StatsCounter
                value={54}
                label={t.impact.stats.groups}
                icon={<Coins className="w-6 h-6" />}
              />
            </div>
            <div>
              <StatsCounter
                value={352}
                label={t.impact.stats.filters}
                icon={<Droplets className="w-6 h-6" />}
              />
            </div>
            <div>
              <StatsCounter
                value={275}
                label={t.impact.stats.goats}
                icon={<Gift className="w-6 h-6" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Ripple Effect (Transformation Pathway) */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-400/10 text-yellow-700 font-bold text-xs uppercase tracking-wider mb-4">
              {t.impact.rippleBadge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mb-6">
              {t.impact.rippleTitle}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t.impact.rippleSub}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <RippleEffectPathway />
          </div>
        </div>
      </section>

      {/* Testimonials / Voices from the Community */}
      <section className="py-24 bg-white border-y border-slate-100 relative">
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#eab308 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-400/10 text-yellow-700 font-bold text-xs uppercase tracking-wider mb-4">
              {t.impact.storiesBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mb-4">
              {t.impact.storiesTitle}
            </h2>
            <p className="text-slate-500 text-lg">
              {t.impact.storiesSub}
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 gap-8 max-w-5xl mx-auto hide-scrollbar">
            {testimonials.map((testimonial) => {
              return (
                <div
                  key={testimonial.id}
                  className="bg-slate-50/50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-all duration-300 w-[85vw] md:w-auto shrink-0 snap-center"
                >
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-yellow-400/10" />
                  
                  <p className="text-slate-700 text-lg md:text-xl font-medium leading-relaxed mb-8 italic relative z-10 text-justify">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  
                  <div className="flex flex-col border-t border-slate-100/80 pt-6 mt-auto">
                    <h4 className="font-heading font-bold text-slate-900 text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-yellow-600 font-semibold mt-0.5">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section ("In the Field") */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-400/10 text-yellow-700 font-bold text-xs uppercase tracking-wider mb-4">
              {t.impact.galleryBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mb-4">
              {t.impact.galleryTitle}
            </h2>
            <p className="text-slate-500 text-lg">
              {t.impact.gallerySub}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <GalleryFilterable images={galleryImages} />
          </div>
        </div>
      </section>
    </div>
  );
}
