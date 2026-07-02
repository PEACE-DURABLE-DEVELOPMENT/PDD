import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone, Clock, ShieldCheck } from "lucide-react";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";

export const metadata = {
  title: "Contact Us | PDD Rwanda",
  description: "Get in touch with Peace and Durable Development (PDD) Rwanda.",
};

export default async function ContactPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  return (
    <div className="flex flex-col min-h-screen pt-20 relative overflow-hidden bg-surface-alt">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 border-b border-border bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-wider mb-3">
              {t.contact.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-ink-heading mb-6 tracking-tight">
              {t.contact.title}
            </h1>
            <p className="text-lg md:text-xl text-ink-body leading-relaxed max-w-2xl mx-auto">
              {t.contact.sub}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto">
            
            {/* Contact Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <h2 className="text-3xl font-heading font-bold text-ink-heading mb-4">
                  {t.contact.leftTitle}
                </h2>
                <p className="text-ink-body text-base leading-relaxed">
                  {t.contact.leftSub}
                </p>
              </div>

              {/* Info Cards Grid */}
              <div className="flex flex-col gap-6">
                {/* Locations Card */}
                <div className="bg-white border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg text-ink-heading mb-3">{t.contact.locations}</h3>
                      <div className="space-y-4">
                        <div className="border-l-2 border-primary/20 pl-3">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm text-ink-heading">{t.contact.hq}</p>
                            <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">{t.contact.hqBadge}</span>
                          </div>
                          <p className="text-ink-body text-xs mt-1">{t.footer.hqAddress}</p>
                        </div>
                        <div className="border-l-2 border-secondary/20 pl-3">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm text-ink-heading">{t.contact.field}</p>
                            <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-1.5 py-0.5 rounded">{t.contact.fieldBadge}</span>
                          </div>
                          <p className="text-ink-body text-xs mt-1">{t.footer.fieldAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Contacts Card */}
                <div className="bg-white border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex flex-col gap-5">
                    {/* Phones */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/10 border border-secondary/20 rounded-xl flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-ink-heading mb-2">{t.contact.phoneTitle}</h3>
                        <div className="flex flex-col gap-1.5">
                          <a href="tel:+250788476168" className="text-ink-body text-sm hover:text-secondary transition-colors font-medium">
                            (+250) 788 476 168
                          </a>
                          <a href="tel:+250782894008" className="text-ink-body text-sm hover:text-secondary transition-colors font-medium">
                            (+250) 782 894 008
                          </a>
                          <a href="tel:+250725218780" className="text-ink-body text-sm hover:text-secondary transition-colors font-medium">
                            (+250) 725 218 780
                          </a>
                        </div>
                      </div>
                    </div>

                    <hr className="border-border/60" />

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/15 border border-accent/20 rounded-xl flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-ink-heading mb-1">{t.contact.emailTitle}</h3>
                        <a href="mailto:info@pddrwanda.org" className="text-primary hover:text-primary/80 transition-colors text-sm font-semibold font-sans">
                          info@pddrwanda.org
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hours & Support Commitment Card */}
                <div className="bg-white border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-neutral-100 border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-600 shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-ink-heading mb-1">{t.contact.hoursTitle}</h3>
                        <p className="text-ink-body text-xs">{t.contact.hoursWeek}</p>
                        <p className="text-ink-body/60 text-[11px] mt-0.5">{t.contact.hoursWeekend}</p>
                      </div>
                    </div>

                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-3 mt-1">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-xs text-emerald-800">{t.contact.guaranteeTitle}</p>
                        <p className="text-[11px] text-emerald-700/95 mt-0.5 leading-relaxed">
                          {t.contact.guaranteeDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
