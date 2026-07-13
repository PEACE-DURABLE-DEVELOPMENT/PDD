export interface Publication {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
  author: string;
  attachmentUrl?: string;
  published: boolean;
}

export async function getPublications(): Promise<Publication[]> {
  const token = process.env.PUBLICATIONS_AIRTABLE_TOKEN;
  const baseId = process.env.PUBLICATIONS_AIRTABLE_BASE_ID;
  const tableName = process.env.PUBLICATIONS_AIRTABLE_TABLE || "pdf";

  if (!token || !baseId) {
    return [];
  }

  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch Publications Airtable data", await res.text());
      return [];
    }

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapped: Publication[] = data.records.map((record: any) => {
      const f = record.fields;
      
      const title = f.Title || f.title || "Untitled Publication";
      const type = f.Type || f.type || "Document";
      const date = f.Date || f.date || new Date().toISOString().split("T")[0];
      const description = f.Discription || f.Description || f.discription || f.description || "";
      const author = f.Author || f.author || "PDD Rwanda";
      
      let attachmentUrl: string | undefined;
      const attachmentField = f.Attachment || f.attachment;
      if (Array.isArray(attachmentField) && attachmentField.length > 0) {
        attachmentUrl = attachmentField[0].url;
      }

      return {
        id: record.id,
        title,
        type,
        date,
        description,
        author,
        attachmentUrl,
        published: Boolean(f.Published ?? f.published ?? true),
      };
    });

    mapped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return mapped.filter((p) => p.published);
  } catch (error) {
    console.error("Error fetching from Publications Airtable:", error);
    return [];
  }
}
