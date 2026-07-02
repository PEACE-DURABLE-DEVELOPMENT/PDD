"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  ChevronDown, 
  MessageSquare, 
  Send,
  HelpCircle
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function ContactForm() {
  const { language } = useLanguage();
  const t = translations[language];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("General Inquiry");
  const [customSubject, setCustomSubject] = useState("");

  const subjectOptions = [
    { value: "General Inquiry", label: language === "fr" ? "Demande Générale" : "General Inquiry" },
    { value: "Partnerships & Collaborations", label: language === "fr" ? "Partenariats & Collaborations" : "Partnerships & Collaborations" },
    { value: "Support & Donation", label: language === "fr" ? "Soutien & Don" : "Support & Donation" },
    { value: "Programs & Training", label: language === "fr" ? "Programmes & Formation" : "Programs & Training" },
    { value: "Other", label: language === "fr" ? "Autre (Préciser ci-dessous)" : "Other (Specify below)" }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    
    // Process subject
    let subjectVal = selectedSubject;
    if (selectedSubject === "Other") {
      subjectVal = formData.get("customSubject") as string || "Other Inquiry";
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: subjectVal,
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setSuccess(true);
      setCustomSubject("");
      setSelectedSubject("General Inquiry");
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : (language === "fr" ? "Échec de l'envoi. Veuillez réessayer." : "Failed to send message. Please try again.");
      setError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-emerald-50/50 border border-emerald-100/80 text-ink-body p-8 md:p-12 rounded-3xl text-center flex flex-col items-center gap-4 shadow-sm"
      >
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 border border-emerald-200 shadow-sm">
          <CheckCircle2 className="w-8 h-8 animate-bounce" />
        </div>
        <h3 className="text-2xl font-heading font-extrabold text-emerald-900">{t.contactForm.successTitle}</h3>
        <p className="max-w-md text-emerald-800 text-sm leading-relaxed text-justify">
          {t.contactForm.successDesc}
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-4 bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 px-6 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-sm shadow-sm"
        >
          {t.contactForm.sendAnother}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit} 
      className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-border/80 flex flex-col gap-6"
    >
      <div className="border-b border-border/60 pb-5">
        <h3 className="text-2xl font-heading font-bold text-ink-heading">
          {language === "fr" ? "Envoyez-nous un Message" : "Send Us a Message"}
        </h3>
        <p className="text-sm text-ink-body/80 mt-1">
          {language === "fr" ? "Veuillez remplir le formulaire ci-dessous et nous vous contacterons dès que possible." : "Please fill in the form below and we will contact you as soon as possible."}
        </p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm border border-red-100 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
          <div>
            <p className="font-semibold">{language === "fr" ? "Impossible d'envoyer le message" : "Unable to send message"}</p>
            <p className="mt-0.5 text-xs text-red-600">{error}</p>
          </div>
        </motion.div>
      )}
      
      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-ink-heading/85 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-secondary" />
            {t.contactForm.fullName} <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="px-4 py-3 rounded-xl border border-border bg-surface-alt hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-ink-body text-sm"
            placeholder="John Doe"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-ink-heading/85 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-secondary" />
            {t.contactForm.emailAddress} <span className="text-red-500">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="px-4 py-3 rounded-xl border border-border bg-surface-alt hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-ink-body text-sm"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Phone & Subject Select */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-ink-heading/85 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-secondary" />
            {t.contactForm.phoneNumber}
          </label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            className="px-4 py-3 rounded-xl border border-border bg-surface-alt hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-ink-body text-sm"
            placeholder="+250 788 000 000"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-ink-heading/85 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-secondary" />
            {t.contactForm.subject}
          </label>
          <div className="relative">
            <select 
              id="subject" 
              name="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-ink-body text-sm appearance-none cursor-pointer pr-10"
            >
              {subjectOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally reveal Custom Subject text input if "Other" is chosen */}
      <AnimatePresence>
        {selectedSubject === "Other" && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="flex flex-col gap-2 overflow-hidden"
          >
            <label htmlFor="customSubject" className="text-xs font-bold uppercase tracking-wider text-ink-heading/85">
              {language === "fr" ? "Veuillez Préciser le Sujet" : "Please Specify Subject"} <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="customSubject" 
              name="customSubject"
              required={selectedSubject === "Other"}
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border bg-surface-alt hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-ink-body text-sm"
              placeholder={t.contactForm.customSubjectPlaceholder}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Textarea */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-ink-heading/85 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-secondary" />
          {t.contactForm.yourMessage} <span className="text-red-500">*</span>
        </label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={5}
          className="px-4 py-3.5 rounded-xl border border-border bg-surface-alt hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none text-ink-body text-sm"
          placeholder={t.contactForm.messagePlaceholder}
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-primary text-white hover:bg-primary/95 active:scale-[0.98] hover:-translate-y-0.5 px-8 py-4 rounded-xl font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {t.contactForm.sending}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {t.contactForm.sendMessage}
          </>
        )}
      </button>
    </motion.form>
  );
}
