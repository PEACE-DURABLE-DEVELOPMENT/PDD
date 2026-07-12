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

// Fallback mock announcements shown when Airtable has no data yet
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    title: "PDD Rwanda Launches New Water Initiative in Burera",
    slug: "pdd-launches-water-initiative-burera",
    category: "Programs",
    body: "We are proud to announce the launch of our new clean water initiative in Burera District. This program will provide sustainable access to clean water for over 2,000 families.\n\nThe initiative is supported by our long-standing partners and will be implemented over the next 18 months. Community leaders have been actively involved in the planning process to ensure the project meets the most pressing needs of the region.\n\nStay tuned for updates on the progress of this transformative program.",
    coverImage: "/fill.webp",
    date: "2026-07-01",
    published: true,
  },
  {
    id: "a2",
    title: "Annual Peacebuilding Conference — July 2026",
    slug: "annual-peacebuilding-conference-july-2026",
    category: "Events",
    body: "PDD Rwanda is hosting its Annual Peacebuilding Conference in Kigali this July. The event will bring together community leaders, NGO representatives, and government officials to discuss sustainable peace strategies.\n\nThe conference will feature keynote speakers, panel discussions, and interactive workshops. Registration is open to all stakeholders committed to building durable peace in Rwanda.",
    coverImage: "/trouma.webp",
    date: "2026-06-20",
    published: true,
  },
  {
    id: "a3",
    title: "New Partnership with International Agricultural Network",
    slug: "partnership-international-agricultural-network",
    category: "Partnerships",
    body: "PDD Rwanda is pleased to announce a new strategic partnership with the International Agricultural Network. This collaboration will expand our conservation agriculture programs to reach 500 additional farming families in Rubavu District.\n\nThe partnership includes knowledge-sharing, technical training, and co-funding of demonstration projects that showcase sustainable, climate-resilient farming practices.",
    coverImage: "/veg.webp",
    date: "2026-06-05",
    published: true,
  },
];

export async function getAnnouncements(): Promise<Announcement[]> {
  const token = process.env.ANNOUNCEMENT_AIRTABLE_TOKEN;
  const baseId = process.env.ANNOUNCEMENT_AIRTABLE_BASE_ID;
  // Accept both table name and table ID
  const tableName = process.env.ANNOUNCEMENT_AIRTABLE_TABLE || "Announcements";

  if (!token || !baseId) {
    return MOCK_ANNOUNCEMENTS;
  }

  try {
    // Fetch all records — no sort filter to avoid field-name issues across different Airtable configs
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch Announcement Airtable data", await res.text());
      return MOCK_ANNOUNCEMENTS;
    }

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapped: Announcement[] = data.records.map((record: any) => {
      const f = record.fields;
      // Support both Title and title field naming
      const title = f.title || f.Title || "Untitled";
      const slug =
        f.slug ||
        f.Slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      // Cover image — Airtable attachment field
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
        published: Boolean(f.published ?? f.Published ?? true),
      };
    });

    // Sort by date descending in-code
    mapped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Only return published ones, but if none are published yet show all (to handle empty state gracefully)
    const published = mapped.filter((a) => a.published);
    if (published.length > 0) return published;

    // If no published ones yet but records exist with no data, return mock
    const hasRealData = mapped.some((a) => a.title !== "Untitled" && a.body !== "");
    return hasRealData ? mapped : MOCK_ANNOUNCEMENTS;
  } catch (error) {
    console.error("Error fetching from Announcement Airtable:", error);
    return MOCK_ANNOUNCEMENTS;
  }
}

export async function getAnnouncementBySlug(slug: string): Promise<Announcement | null> {
  const announcements = await getAnnouncements();
  return announcements.find((a) => a.slug === slug) || null;
}
