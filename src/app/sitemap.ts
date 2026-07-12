import { getBlogPosts } from "@/lib/blogAirtable";
import { getAnnouncements } from "@/lib/announcementAirtable";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pddrwanda.org";

  const staticRoutes = [
    "",
    "/about",
    "/news",
    "/blog",
    "/contact",
    "/donate",
    "/impact",
    "/partners",
    "/projects",
  ];

  const staticMaps: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  let blogMaps: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogMaps = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error generating dynamic blog sitemap:", error);
  }

  let announcementMaps: MetadataRoute.Sitemap = [];
  try {
    const announcements = await getAnnouncements();
    announcementMaps = announcements.map((a) => ({
      url: `${baseUrl}/news/announcement/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating dynamic announcement sitemap:", error);
  }

  return [...staticMaps, ...blogMaps, ...announcementMaps];
}
