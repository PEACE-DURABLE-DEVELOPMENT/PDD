import { cookies } from "next/headers";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl?: string;
  category?: string;
}

async function getLang(): Promise<"en" | "fr"> {
  try {
    const cookieStore = await cookies();
    return (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  } catch {
    return "en";
  }
}

// Fallback mock data in English
const MOCK_POSTS_EN: BlogPost[] = [
  {
    id: "1",
    title: "Bringing Clean Water to Rural Communities",
    slug: "bringing-clean-water-rural-communities",
    content: "Access to clean, safe drinking water is a fundamental human right, yet many rural communities still struggle with water scarcity. In our recent initiative, we traveled to the remote village of Gashaki, where the local water source was contaminated and over two miles away.\n\nWorking together with community leaders, we installed a state-of-the-art solar-powered water filtration system. The impact was immediate: children who previously spent hours fetching water can now attend school regularly, and waterborne illnesses have plummeted.\n\nThis project is more than just infrastructure; it's about giving back time, health, and dignity to the community. We're committed to expanding these efforts to neighboring villages in the coming year.",
    excerpt: "Learn how our recent initiative provided sustainable clean water access to 500 families, improving health and school attendance.",
    date: "2026-05-12",
    author: "Jane Doe",
    imageUrl: "/fill.webp",
  },
  {
    id: "2",
    title: "Empowering Women through Agricultural Training",
    slug: "empowering-women-agricultural-training",
    content: "In many regions of Rwanda, women form the backbone of the agricultural sector. However, they often lack access to modern farming techniques and resources. Our 'Grow Together' program aims to bridge this gap.\n\nLast month, we hosted a two-week intensive training camp for 50 women farmers. We covered topics ranging from sustainable crop rotation and organic pest control to basic financial literacy and market negotiation.\n\nThe results have been inspiring. Many participants have already formed cooperatives, pooling their resources to buy seeds and fertilizer in bulk. By empowering these women, we are not just improving their livelihoods but uplifting their entire families and communities.",
    excerpt: "Our new training program helps women farmers increase their crop yields and income through sustainable practices and financial literacy.",
    date: "2026-06-01",
    author: "John Smith",
    imageUrl: "/veg.webp",
  },
  {
    id: "3",
    title: "Rebuilding Hope: Trauma Healing Workshops",
    slug: "rebuilding-hope-trauma-healing-workshops",
    content: "The scars of conflict run deep, often lingering long after the physical violence has ended. At PDD, we recognize that true peace requires healing both the mind and the heart.\n\nOur recent series of trauma healing workshops provided a safe space for individuals to share their stories, guided by trained counselors. Through art therapy, group discussions, and community-building exercises, participants began the difficult journey of confronting their past and finding a path forward.\n\nWitnessing the transformation from pain to resilience is a powerful reminder of the human spirit's capacity for healing. We continue to prioritize mental health as a core component of our peace-building efforts.",
    excerpt: "Discover how our community-based counseling and workshops are helping individuals overcome the invisible scars of conflict.",
    date: "2026-06-10",
    author: "Alice Musoni",
    imageUrl: "/trouma.webp",
  }
];

// Fallback mock data in French
const MOCK_POSTS_FR: BlogPost[] = [
  {
    id: "1",
    title: "Apporter de l'eau propre aux communautés rurales",
    slug: "bringing-clean-water-rural-communities",
    content: "L'accès à une eau potable propre et saine est un droit humain fondamental, pourtant de nombreuses communautés rurales sont toujours confrontées à la pénurie d'eau. Dans le cadre de notre récente initiative, nous nous sommes rendus dans le village reculé de Gashaki, où la source d'eau locale était contaminée et située à plus de trois kilomètres.\n\nEn collaboration avec les dirigeants communautaires, nous avons installé un système de filtration d'eau solaire de pointe. L'impact a été immédiat : les enfants qui passaient auparavant des heures à aller chercher de l'eau peuvent désormais fréquenter l'école régulièrement, et les maladies d'origine hydrique ont chuté de manière spectaculaire.\n\nCe projet est plus qu'une simple infrastructure ; il s'agit de redonner du temps, de la santé et de la dignité à la communauté. Nous nous engageons à étendre ces efforts aux villages voisins au cours de l'année à venir.",
    excerpt: "Découvrez comment notre récente initiative a fourni un accès durable à l'eau potable à 500 familles, améliorant la santé et la fréquentation scolaire.",
    date: "2026-05-12",
    author: "Jane Doe",
    imageUrl: "/fill.webp",
    category: "Eau & Assainissement",
  },
  {
    id: "2",
    title: "Autonomiser les femmes grâce à la formation agricole",
    slug: "empowering-women-agricultural-training",
    content: "Dans de nombreuses régions du Rwanda, les femmes constituent la colonne vertébrale du secteur agricole. Cependant, elles manquent souvent d'accès aux techniques agricoles modernes et aux ressources. Notre programme « Grandir Ensemble » vise à combler ce fossé.\n\nLe mois dernier, nous avons organisé un camp de formation intensive de deux semaines pour 50 femmes agricultrices. Nous avons abordé des sujets allant de la rotation durable des cultures et de la lutte biologique contre les ravageurs à l'éducation financière de base et à la négociation sur les marchés.\n\nLes résultats sont inspirants. De nombreuses participantes ont déjà formé des coopératives, mettant en commun leurs ressources pour acheter des semences et des engrais en vrac. En autonomisant ces femmes, nous n'améliorons pas seulement leurs moyens de subsistance, mais nous élevons des familles et des communautés entières.",
    excerpt: "Notre nouveau programme de formation aide les agricultrices à accroître leurs rendements et leurs revenus grâce à des pratiques durables et à l'éducation financière.",
    date: "2026-06-01",
    author: "John Smith",
    imageUrl: "/veg.webp",
    category: "Agriculture Durable",
  },
  {
    id: "3",
    title: "Reconstruire l'espoir : Ateliers de guérison des traumatismes",
    slug: "rebuilding-hope-trauma-healing-workshops",
    content: "Les cicatrices des conflits sont profondes et persistent souvent longtemps après la fin de la violence physique. Chez PDD, nous reconnaissons que la paix véritable exige de guérir à la fois l'esprit et le cœur.\n\nNotre récente série d'ateliers de guérison des traumatismes a fourni un espace sûr aux personnes pour partager leurs histoires, guidées par des conseillers formés. Grâce à l'art-thérapie, à des discussions de groupe et à des exercices de renforcement de la communauté, les participants ont entamé le difficile chemin de la confrontation avec leur passé et de la recherche d'une voie d'avenir.\n\nTémoigner du passage de la douleur à la résilience est un puissant rappel de la capacité de guérison de l'esprit humain. Nous continuons à faire de la santé mentale une composante essentielle de nos efforts de consolidation de la paix.",
    excerpt: "Découvrez comment nos conseils et ateliers communautaires aident les individus à surmonter les cicatrices invisibles des conflits.",
    date: "2026-06-10",
    author: "Alice Musoni",
    imageUrl: "/trouma.webp",
    category: "Consolidation de la Paix",
  }
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  const lang = await getLang();
  const fallbackPosts = lang === "fr" ? MOCK_POSTS_FR : MOCK_POSTS_EN;

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_BLOG_TABLE_NAME || "Blog";

  if (!apiKey || !baseId || apiKey === 'your_airtable_api_key') {
    return fallbackPosts;
  }

  try {
    const filter = encodeURIComponent('{Published}=TRUE()');
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=${filter}&sort[0][field]=Date&sort[0][direction]=desc`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch Airtable data", await res.text());
      return fallbackPosts;
    }

    const data = await res.json();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.records.map((record: any) => {
      const title = record.fields.Title || "Untitled";
      return {
        id: record.id,
        title: title,
        slug: record.fields.Slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        content: record.fields.Content || "",
        excerpt: record.fields.Excerpt || (record.fields.Content ? record.fields.Content.substring(0, 150) + "..." : ""),
        date: record.fields.Date || new Date().toISOString().split('T')[0],
        author: record.fields.Author || "PDD Team",
        imageUrl: record.fields.Image && record.fields.Image.length > 0 ? record.fields.Image[0].url : undefined,
        category: record.fields.Category || undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching from Airtable:", error);
    return fallbackPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  return post || null;
}
