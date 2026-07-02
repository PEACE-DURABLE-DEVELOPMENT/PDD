"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SmartImage from "./SmartImage";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { Globe, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t.common.home, href: "/" },
    { name: t.common.about, href: "/about" },
    { name: t.common.projects, href: "/projects" },
    { name: t.common.programs, href: "/programs" },
    { name: t.common.impact, href: "/impact" },
    { name: t.common.blog, href: "/blog" },
    { name: t.common.partners, href: "/partners" },
    { name: t.common.contact, href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-12 h-12 relative">
            <SmartImage
              cloudinaryUrl="/logo.jpeg"
              label="PDD Logo"
              aspectRatio="1/1"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="font-heading font-bold text-xl text-black hidden sm:inline-block">
            {t.navbar.logoName}
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  isActive
                    ? "text-yellow-500 font-bold"
                    : "text-ink-body hover:text-yellow-500"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Desktop/Mobile) */}
        <div className="flex items-center gap-4">
          {/* Language Toggle - Hidden on small screen headers, accessible via mobile drawer */}
          <button
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700 cursor-pointer"
            aria-label="Switch language"
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span className="uppercase">{language === "en" ? "FR" : "EN"}</span>
          </button>

          {/* Support Work Button - Hidden on mobile screen headers to prevent crowding */}
          <Link
            href="/donate"
            className="hidden sm:inline-block bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-2.5 rounded-full font-bold transition-colors shadow-sm"
          >
            {t.common.supportWork}
          </Link>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors md:hidden cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-2xl border-l border-slate-100 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <span className="font-heading font-bold text-lg text-black">
              {t.navbar.logoName}
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-8 text-base font-bold flex-grow overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-yellow-500 font-bold"
                      : "text-ink-body hover:text-yellow-500"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
            {/* Language Switcher in Drawer */}
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm font-bold">Language</span>
              <button
                onClick={() => {
                  setLanguage(language === "en" ? "fr" : "en");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="uppercase">{language === "en" ? "FR" : "EN"}</span>
              </button>
            </div>

            {/* Donate/Support in Drawer */}
            <Link
              href="/donate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 py-3 rounded-full font-bold text-center transition-colors shadow-sm block text-sm uppercase tracking-wider"
            >
              {t.common.supportWork}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

