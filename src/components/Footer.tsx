import Link from "next/link";
import SmartImage from "./SmartImage";
import { Mail, MapPin, Phone } from "lucide-react";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";

export default async function Footer() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  return (
    <footer className="bg-[#020617] text-slate-300 border-t border-slate-900 mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative">
                <SmartImage
                  cloudinaryUrl="/logo.jpeg"
                  label="PDD Logo"
                  aspectRatio="1/1"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="font-heading font-bold text-xl text-blue-600">
                PDD
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold !text-blue-600 mb-6">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-blue-600 transition-colors">
                  {t.common.about}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-blue-600 transition-colors">
                  {t.common.projects}
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-slate-400 hover:text-blue-600 transition-colors">
                  {t.common.impact}
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-slate-400 hover:text-blue-600 transition-colors">
                  {t.common.donate}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-blue-600 transition-colors">
                  {t.common.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading font-semibold !text-blue-600 mb-6">
              {t.footer.contactUs}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-600">{t.footer.headquarters}</p>
                  <p className="text-slate-400">{t.footer.hqAddress}</p>
                  <p className="font-medium text-blue-600 mt-3">{t.footer.fieldOffice}</p>
                  <p className="text-slate-400">{t.footer.fieldAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-slate-400">
                  (+250) 788 476 168 / 782 894 008 / 725 218 780
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-slate-400">info@pddrwanda.org</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Peace and Durable Development (PDD). {t.footer.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
}
