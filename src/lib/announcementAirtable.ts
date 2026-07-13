export interface Announcement {
  id: string;
  title: string;
  slug: string;
  category: string;
  body: string;
  coverImage?: string;
  date: string;
  published: boolean;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const token = process.env.ANNOUNCEMENT_AIRTABLE_TOKEN;
  const baseId = process.env.ANNOUNCEMENT_AIRTABLE_BASE_ID;
  const tableName = process.env.ANNOUNCEMENT_AIRTABLE_TABLE || "Announcements";

  if (!token || !baseId) {
    return [];
  }

  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Revalidate every 60 seconds
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch Announcement Airtable data", await res.text());
      return [];
    }

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapped: Announcement[] = data.records.map((record: any) => {
      const f = record.fields;
      
      const title = f.title || f.Title || "Untitled";
      const slug =
        f.slug ||
        f.Slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      let coverImage: string | undefined;
      const coverField = f.coverimage || f.CoverImage || f.Coverimage || f["Cover Image"];
      if (Array.isArray(coverField) && coverField.length > 0) {
        coverImage = coverField[0].url;
      }

      return {
        id: record.id,
        title,
        slug,
        category: f.category || f.Category || "General",
        body: f.body || f.Body || "",
        coverImage,
        date:
          f.date || f.Date || new Date().toISOString().split("T")[0],
        published: Boolean(f.published ?? f.Published ?? f["Published "] ?? false),
      };
    });

    // Sort by date descending in-code
    mapped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Only return strictly published announcements
    return mapped.filter((a) => a.published);
  } catch (error) {
    console.error("Error fetching from Announcement Airtable:", error);
    return [];
  }
}

export async function getAnnouncementBySlug(slug: string): Promise<Announcement | null> {
  const announcements = await getAnnouncements();
  return announcements.find((a) => a.slug === slug) || null;
}
