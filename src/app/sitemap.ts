import { getBlogPosts } from "@/lib/blogAirtable";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pddrwanda.org";

  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/donate",
    "/impact",
    "/partners",
    "/programs",
    "/projects",
  ];

  const staticMaps: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const programIds = [
    "filter-distribution",
    "fight-malnutrition",
    "mediation-and-conflict-resolution",
    "trauma-healing",
    "empowered-families-literacy",
    "vsla",
    "reserving-forests",
  ];

  const programMaps: MetadataRoute.Sitemap = programIds.map((id) => ({
    url: `${baseUrl}/programs/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
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

  return [...staticMaps, ...programMaps, ...blogMaps];
}
