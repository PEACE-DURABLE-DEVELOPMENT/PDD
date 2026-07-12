import { getBlogPosts } from "@/lib/blogAirtable";
import { getAnnouncements } from "@/lib/announcementAirtable";
import { cookies } from "next/headers";
import { translations } from "@/lib/translations";
import NewsClient from "./NewsClient";

export const metadata = {
  title: "News & Announcements | PDD Rwanda",
  description:
    "Stay informed with the latest announcements, field reports, and stories from Peace and Durable Development Rwanda.",
};

export default async function NewsPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  const t = translations[lang];

  const [blogPosts, announcements] = await Promise.all([
    getBlogPosts(),
    getAnnouncements(),
  ]);

  return (
    <NewsClient
      blogPosts={blogPosts}
      announcements={announcements}
      lang={lang}
      t={t}
    />
  );
}
