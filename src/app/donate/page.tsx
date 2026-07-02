"use client";

import { useState } from "react";
import { 
  Heart, 
  Smartphone, 
  Building, 
  Check, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function DonatePage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "bank">("momo");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const donationTiers = [
    {
      amount: 25,
      title: t.donate.tiers.tier1.title,
      impact: t.donate.tiers.tier1.impact,
    },
    {
      amount: 50,
      title: t.donate.tiers.tier2.title,
      impact: t.donate.tiers.tier2.impact,
    },
    {
      amount: 100,
      title: t.donate.tiers.tier3.title,
      impact: t.donate.tiers.tier3.impact,
    },
    {
      amount: 250,
      title: t.donate.tiers.tier4.title,
      impact: t.donate.tiers.tier4.impact,
    },
    {
      amount: 500,
      title: t.donate.tiers.tier5.title,
      impact: t.donate.tiers.tier5.impact,
    },
  ];

  const faqs = t.donate.faqs;

  // Get active tier details or custom state
  const activeTier = typeof selectedAmount === "number" 
    ? donationTiers.find(t => t.amount === selectedAmount) 
    : null;

  const getActiveImpactText = () => {
    if (activeTier) return activeTier.impact;
    if (customAmount && parseFloat(customAmount) > 0) {
      const amt = parseFloat(customAmount);
      if (amt < 25) return t.donate.customImpactLessThan25;
      if (amt < 50) return t.donate.customImpactLessThan50;
      if (amt < 100) return t.donate.customImpactLessThan100;
      return t.donate.customImpactMoreThan100;
    }
    return t.donate.customImpactDefault;
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 relative overflow-hidden bg-surface-alt">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[10%] right-[-15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 border-b border-border bg-white/40 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-yellow-400/20 text-yellow-800 font-extrabold text-xs uppercase tracking-widest mb-4 border border-yellow-400/30">
              <Heart className="w-3.5 h-3.5 text-yellow-600 fill-yellow-600" />
              {t.donate.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-ink-heading mb-6 tracking-tight">
              {t.donate.heroTitle.split(' ')[0]} {t.donate.heroTitle.split(' ')[1]} {t.donate.heroTitle.split(' ')[2]} <span className="text-yellow-500">{t.donate.heroTitle.split(' ').slice(3).join(' ')}</span>
            </h1>
            <p className="text-lg md:text-xl text-ink-body leading-relaxed max-w-2xl mx-auto">
              {t.donate.heroSub}
            </p>
          </div>
        </div>
      </section>

      {/* Main Donation Section */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Interactive Widget */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-border/80 shadow-xl overflow-hidden">
              
              {/* Form Header */}
              <div className="p-6 md:p-8 bg-slate-900 text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-heading font-bold text-yellow-400">{t.donate.widgetHeader}</h2>
                  <div className="flex bg-slate-800 p-1 rounded-full border border-slate-700 text-xs font-bold">
                    <button
                      onClick={() => setFrequency("once")}
                      className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                        frequency === "once" ? "bg-yellow-400 text-slate-950" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {t.donate.oneTime}
                    </button>
                    <button
                      onClick={() => setFrequency("monthly")}
                      className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                        frequency === "monthly" ? "bg-yellow-400 text-slate-950" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {t.donate.monthly}
                    </button>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t.donate.widgetSub}
                </p>
              </div>

              {/* Form Body */}
              <div className="p-6 md:p-8 space-y-8">
                
                {/* Tiers Grid */}
                <div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3.5">
                    {donationTiers.map((tier) => (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(tier.amount);
                          setCustomAmount("");
                        }}
                        className={`py-4 px-2 rounded-2xl border font-heading font-extrabold text-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                          selectedAmount === tier.amount
                            ? "bg-yellow-400 border-yellow-500 text-slate-950 shadow-md scale-[1.03]"
                            : "bg-surface-alt border-border text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-slate-950">
                          USD
                        </span>
                        ${tier.amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Field */}
                  <div className="mt-5 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-semibold">$</span>
                    </div>
                    <input
                      type="number"
                      placeholder={t.donate.customPlaceholder}
                      value={customAmount}
                      onChange={(e) => {
                        setSelectedAmount("custom");
                        setCustomAmount(e.target.value);
                      }}
                      className={`w-full pl-8 pr-12 py-4 bg-surface-alt border rounded-2xl font-semibold outline-none transition-all ${
                        selectedAmount === "custom"
                          ? "border-yellow-400 ring-2 ring-yellow-400/20 bg-white text-slate-900"
                          : "border-border text-slate-700 hover:border-slate-300 focus:border-slate-400 focus:bg-white"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-xs font-bold text-slate-400 uppercase">{t.donate.customBadge}</span>
                    </div>
                  </div>
                </div>

                {/* Impact Statement Box */}
                <div className="bg-yellow-50/50 border border-yellow-100 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0 text-yellow-700">
                    <Heart className="w-5 h-5 fill-yellow-500 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-yellow-900 uppercase tracking-wider mb-1">
                      {activeTier ? activeTier.title : t.donate.customDonation}
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {getActiveImpactText()}
                    </p>
                  </div>
                </div>

                {/* Payment Options Tab Selector */}
                <div>
                  <h3 className="font-heading font-bold text-slate-800 text-sm uppercase tracking-wider mb-4">
                    {t.donate.paymentMethodTitle}
                  </h3>
                  <div className="grid grid-cols-2 gap-3.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("momo")}
                      className={`py-3.5 px-3 rounded-2xl border font-bold text-sm flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === "momo"
                          ? "bg-slate-900 border-slate-950 text-white shadow-md"
                          : "bg-surface-alt border-border text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      <Smartphone className="w-5 h-5" />
                      {t.donate.momoTitle}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bank")}
                      className={`py-3.5 px-3 rounded-2xl border font-bold text-sm flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === "bank"
                          ? "bg-slate-900 border-slate-950 text-white shadow-md"
                          : "bg-surface-alt border-border text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      <Building className="w-5 h-5" />
                      {t.donate.bankTitle}
                    </button>
                  </div>
                </div>

                {/* Tab Contents */}
                <div className="pt-4 border-t border-border">

                  {/* TAB 1: MOBILE MONEY */}
                  {paymentMethod === "momo" && (
                    <div className="space-y-6">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {t.donate.momoSubtitle}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* MTN Mobile Money Card */}
                        <div className="border border-yellow-200 bg-yellow-50/20 rounded-2xl p-5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl pointer-events-none" />
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-black text-[10px] text-slate-900 border border-yellow-500">
                              MTN
                            </span>
                            <div>
                              <h4 className="font-heading font-bold text-sm text-slate-900">{t.donate.momoPayName}</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t.donate.momoPayBadge}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3.5">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.donate.momoCodeLabel}</p>
                              <button 
                                onClick={() => handleCopy("829440", "momocode")}
                                className="mt-1 flex items-center justify-between w-full bg-white px-3.5 py-2.5 rounded-xl border border-yellow-100 font-mono font-bold text-lg text-slate-900 text-left hover:bg-yellow-50/50 transition-all group cursor-pointer"
                              >
                                829440
                                {copiedId === "momocode" ? (
                                  <span className="text-xs text-emerald-600 font-sans flex items-center gap-1 font-semibold">
                                    <Check className="w-3.5 h-3.5" /> {t.donate.copied}
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-400 group-hover:text-yellow-600 font-sans font-semibold flex items-center gap-1">
                                    {t.donate.copy}
                                  </span>
                                )}
                              </button>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.donate.registeredLabel}</p>
                              <p className="text-sm font-semibold text-slate-800 mt-1">Peace and Durable Development</p>
                            </div>
                          </div>
                        </div>

                        {/* Airtel Money Card */}
                        <div className="border border-red-100 bg-red-50/10 rounded-2xl p-5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-black text-xs text-white">
                              A
                            </span>
                            <div>
                              <h4 className="font-heading font-bold text-sm text-slate-900">{t.donate.momoAirtelName}</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t.donate.momoAirtelBadge}</p>
                            </div>
                          </div>

                          <div className="space-y-3.5">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.donate.phoneLabel}</p>
                              <button 
                                onClick={() => handleCopy("+250725218780", "airtel")}
                                className="mt-1 flex items-center justify-between w-full bg-white px-3.5 py-2.5 rounded-xl border border-red-50 font-mono font-bold text-base text-slate-900 text-left hover:bg-red-50/20 transition-all group cursor-pointer"
                              >
                                (+250) 725 218 780
                                {copiedId === "airtel" ? (
                                  <span className="text-xs text-emerald-600 font-sans flex items-center gap-1 font-semibold">
                                    <Check className="w-3.5 h-3.5" /> {t.donate.copied}
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-400 group-hover:text-red-500 font-sans font-semibold flex items-center gap-1">
                                    {t.donate.copy}
                                  </span>
                                )}
                              </button>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.donate.registeredLabel}</p>
                              <p className="text-sm font-semibold text-slate-800 mt-1">Peace and Durable Development</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
                        {t.donate.momoInstruction}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: BANK TRANSFER */}
                  {paymentMethod === "bank" && (
                    <div className="space-y-6">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {t.donate.bankSubtitle}
                      </p>

                      <div className="space-y-4">
                        {/* USD Account Card */}
                        <div className="border border-border bg-surface-alt rounded-2xl p-5 relative">
                          <div className="flex items-center justify-between mb-4 border-b border-border/80 pb-2">
                            <span className="text-xs font-bold text-yellow-600 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-0.5 rounded-full">
                              {t.donate.bankIntLabel}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">Bank of Kigali</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.donate.bankAccountName}</p>
                              <p className="font-semibold text-slate-800">PEACE AND DURABLE DEVELOPMENT</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                {t.donate.bankAccountNumber}
                                <button 
                                  onClick={() => handleCopy("00095-07758364-42", "usdbank")}
                                  className="text-primary text-[10px] hover:underline flex items-center gap-0.5 font-sans lowercase cursor-pointer"
                                >
                                  {copiedId === "usdbank" ? t.donate.copied.toLowerCase() : t.donate.copy.toLowerCase()}
                                </button>
                              </p>
                              <p className="font-mono font-semibold text-slate-800">00095-07758364-42</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                {t.donate.bankSwift}
                                <button 
                                  onClick={() => handleCopy("BKIGRWKGl", "swift")}
                                  className="text-primary text-[10px] hover:underline flex items-center gap-0.5 font-sans lowercase cursor-pointer"
                                >
                                  {copiedId === "swift" ? t.donate.copied.toLowerCase() : t.donate.copy.toLowerCase()}
                                </button>
                              </p>
                              <p className="font-mono font-semibold text-slate-800">BKIGRWKGl</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.donate.bankAddress}</p>
                              <p className="text-xs text-slate-600 leading-normal">
                                Bank of Kigali Plc, 6122 KN 4 Ave, Kigali, Rwanda
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* RWF Account Card */}
                        <div className="border border-border bg-surface-alt rounded-2xl p-5 relative">
                          <div className="flex items-center justify-between mb-4 border-b border-border/80 pb-2">
                            <span className="text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 px-2.5 py-0.5 rounded-full">
                              {t.donate.bankLocalLabel}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">Bank of Kigali</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.donate.bankAccountName}</p>
                              <p className="font-semibold text-slate-800">PEACE AND DURABLE DEVELOPMENT</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                {t.donate.bankAccountNumber}
                                <button 
                                  onClick={() => handleCopy("00095-07758364-41", "rwfbank")}
                                  className="text-primary text-[10px] hover:underline flex items-center gap-0.5 font-sans lowercase cursor-pointer"
                                >
                                  {copiedId === "rwfbank" ? t.donate.copied.toLowerCase() : t.donate.copy.toLowerCase()}
                                </button>
                              </p>
                              <p className="font-mono font-semibold text-slate-800">00095-07758364-41</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
                        {t.donate.bankNote}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Right Column: Transparency Banners & FAQS */}
            <div className="lg:col-span-5 space-y-10">
              
              {/* Trust Section */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-850 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="text-xl font-heading font-extrabold text-white mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-yellow-400" />
                  {t.donate.trustTitle}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 text-yellow-400">
                      <span className="font-heading font-extrabold text-sm">100%</span>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-yellow-400">{t.donate.trust1Title}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {t.donate.trust1Desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 text-yellow-400">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-yellow-400">{t.donate.trust2Title}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {t.donate.trust2Desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 text-yellow-400">
                      <Heart className="w-4.5 h-4.5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-yellow-400">{t.donate.trust3Title}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {t.donate.trust3Desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs Accordion */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-ink-heading mb-6 flex items-center gap-2">
                  <ChevronDown className="w-6 h-6 text-slate-600 rotate-90" />
                  {t.donate.faqTitle}
                </h3>
                
                <div className="space-y-3.5">
                  {faqs.map((faq: { q: string; a: string }, index: number) => (
                    <div 
                      key={index}
                      className="bg-white border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full px-6 py-4.5 flex items-center justify-between text-left font-heading font-bold text-sm text-slate-800 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        {faq.q}
                        {openFaq === index ? (
                          <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </button>
                      
                      <div 
                        className={`transition-all duration-300 overflow-hidden ${
                          openFaq === index ? "max-h-[300px] border-t border-border/60" : "max-h-0"
                        }`}
                      >
                        <p className="p-6 text-xs text-slate-600 leading-relaxed text-justify">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
