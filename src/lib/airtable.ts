import { cookies } from "next/headers";

export interface Program {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortOverview: string;
  fullDescription: string;
  order: number;
  cloudinaryImageUrl?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  cloudinaryPhotoUrl?: string;
  featured: boolean;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  icon: string;
  order: number;
}

export interface GalleryImage {
  id: string;
  cloudinaryImageUrl?: string;
  caption: string;
  category: string;
}

async function getLang(): Promise<"en" | "fr"> {
  try {
    const cookieStore = await cookies();
    return (cookieStore.get("lang")?.value || "en") as "en" | "fr";
  } catch {
    return "en";
  }
}

// Fallback data (English)
export const fallbackProgramsEN: Program[] = [
  {
    id: "1",
    title: "Peacebuilding & Conflict Resolution",
    slug: "peacebuilding",
    icon: "HeartHandshake",
    shortOverview: "We train community members in mediation, trauma healing, children's rights, and women's rights. By tackling illiteracy and fostering dialogue, we resolve conflicts at the grassroots level.",
    fullDescription: "We train community members in mediation, trauma healing, children's rights, and women's rights. By tackling illiteracy and fostering dialogue, we resolve conflicts at the grassroots level. This holistic approach ensures sustainable peace for generations to come.",
    order: 1,
  },
  {
    id: "2",
    title: "Food Security & Agriculture",
    slug: "food-security",
    icon: "Sprout",
    shortOverview: "Recognizing that hunger is a primary driver of domestic and community conflict, we train smallholder farmers in conservation agriculture and animal husbandry to ensure families have sustainable food sources.",
    fullDescription: "Recognizing that hunger is a primary driver of domestic and community conflict, we train smallholder farmers in conservation agriculture and animal husbandry to ensure families have sustainable food sources.",
    order: 2,
  },
  {
    id: "3",
    title: "Socio-Economic Development",
    slug: "socio-economic",
    icon: "Landmark",
    shortOverview: "We establish savings and loan groups (VSLAs) to help families build financial resilience, start small businesses, and lift themselves out of poverty.",
    fullDescription: "We establish savings and loan groups (VSLAs) to help families build financial resilience, start small businesses, and lift themselves out of poverty.",
    order: 3,
  },
  {
    id: "4",
    title: "Health & Wellbeing",
    slug: "health-wellbeing",
    icon: "Stethoscope",
    shortOverview: "We lobby for family health access and raise awareness about diseases that aren't well understood in rural communities, including HIV and gynecological health, ensuring individuals get the medical checkups they need.",
    fullDescription: "We lobby for family health access and raise awareness about diseases that aren't well understood in rural communities, including HIV and gynecological health, ensuring individuals get the medical checkups they need.",
    order: 4,
  },
  {
    id: "5",
    title: "Environmental Conservation",
    slug: "environmental-conservation",
    icon: "TreePine",
    shortOverview: "Humanity cannot achieve peace if the environment is neglected. We lead community discussions on climate care, advocate for forest protection, and organize tree-planting initiatives.",
    fullDescription: "Humanity cannot achieve peace if the environment is neglected. We lead community discussions on climate care, advocate for forest protection, and organize tree-planting initiatives.",
    order: 5,
  }
];

// Fallback data (French)
export const fallbackProgramsFR: Program[] = [
  {
    id: "1",
    title: "Consolidation de la paix & Résolution des conflits",
    slug: "peacebuilding",
    icon: "HeartHandshake",
    shortOverview: "Nous formons les membres de la communauté à la médiation, à la guérison des traumatismes, aux droits des enfants et aux droits des femmes. En luttant contre l'analphabétisme et en favorisant le dialogue, nous résolvons les conflits au niveau local.",
    fullDescription: "Nous formons les membres de la communauté à la médiation, à la guérison des traumatismes, aux droits des enfants et aux droits des femmes. En luttant contre l'analphabétisme et en favorisant le dialogue, nous résolvons les conflits au niveau local. Cette approche holistique garantit une paix durable pour les générations futures.",
    order: 1,
  },
  {
    id: "2",
    title: "Sécurité alimentaire & Agriculture",
    slug: "food-security",
    icon: "Sprout",
    shortOverview: "Reconnaissant que la faim est un facteur principal des conflits familiaux et communautaires, nous formons les petits agriculteurs à l'agriculture de conservation et à l'élevage pour garantir des sources de nourriture durables.",
    fullDescription: "Reconnaissant que la faim est un facteur principal des conflits familiaux et communautaires, nous formons les petits agriculteurs à l'agriculture de conservation et à l'élevage pour garantir des sources de nourriture durables.",
    order: 2,
  },
  {
    id: "3",
    title: "Développement socio-économique",
    slug: "socio-economic",
    icon: "Landmark",
    shortOverview: "Nous mettons en place des groupes d'épargne et de crédit (AVEC) pour aider les familles à renforcer leur résilience financière, à lancer de petites entreprises et à sortir de la pauvreté.",
    fullDescription: "Nous mettons en place des groupes d'épargne et de crédit (AVEC) pour aider les familles à renforcer leur résilience financière, à lancer de petites entreprises et à sortir de la pauvreté.",
    order: 3,
  },
  {
    id: "4",
    title: "Santé & Bien-être",
    slug: "health-wellbeing",
    icon: "Stethoscope",
    shortOverview: "Nous plaidons pour l'accès à la santé familiale et sensibilisons aux maladies mal comprises dans les zones rurales, notamment le VIH et la santé gynécologique, en veillant à ce que chacun bénéficie de bilans médicaux.",
    fullDescription: "Nous plaidons pour l'accès à la santé familiale et sensibilisons aux maladies mal comprises dans les zones rurales, notamment le VIH et la santé gynécologique, en veillant à ce que chacun bénéficie de bilans médicaux.",
    order: 4,
  },
  {
    id: "5",
    title: "Conservation de l'environnement",
    slug: "environmental-conservation",
    icon: "TreePine",
    shortOverview: "L'humanité ne peut pas parvenir à la paix si l'environnement est négligé. Nous menons des discussions communautaires sur le soin du climat, protégeons les forêts et organisons des initiatives de plantation d'arbres.",
    fullDescription: "L'humanité ne peut pas parvenir à la paix si l'environnement est négligé. Nous menons des discussions communautaires sur le soin du climat, protégeons les forêts et organisons des initiatives de plantation d'arbres.",
    order: 5,
  }
];

export const fallbackTestimonialsEN: Testimonial[] = [
  {
    id: "1",
    quote: "Through the conservation agriculture training, my crop yield doubled this season. My family no longer worries about where our next meal will come from.",
    name: "Farmer from Burera",
    location: "Burera District",
    cloudinaryPhotoUrl: "/ber.webp",
    featured: true,
  },
  {
    id: "2",
    quote: "The VSLA savings group gave me the capital to start a small tailoring business. I am now financially independent and can support my children's education.",
    name: "Savings Group Member",
    location: "Kicukiro District",
    cloudinaryPhotoUrl: "/boss.webp",
    featured: true,
  }
];

export const fallbackTestimonialsFR: Testimonial[] = [
  {
    id: "1",
    quote: "Grâce à la formation en agriculture de conservation, mon rendement a doublé cette saison. Ma famille ne s'inquiète plus de savoir d'où viendra notre prochain repas.",
    name: "Agriculteur de Burera",
    location: "District de Burera",
    cloudinaryPhotoUrl: "/ber.webp",
    featured: true,
  },
  {
    id: "2",
    quote: "Le groupe d'épargne AVEC m'a donné le capital pour démarrer un petit commerce de couture. Je suis maintenant financièrement indépendante et je peux financer les études de mes enfants.",
    name: "Membre de groupe d'épargne",
    location: "District de Kicukiro",
    cloudinaryPhotoUrl: "/boss.webp",
    featured: true,
  }
];

export const fallbackImpactStatsEN: ImpactStat[] = [
  { id: "1", label: "Years of Experience", value: 20, icon: "Calendar", order: 1 },
  { id: "2", label: "Families Empowered", value: 5000, icon: "Users", order: 2 },
  { id: "3", label: "Savings Groups Formed", value: 150, icon: "PiggyBank", order: 3 },
  { id: "4", label: "Trees Planted", value: 25000, icon: "TreePine", order: 4 },
];

export const fallbackImpactStatsFR: ImpactStat[] = [
  { id: "1", label: "Années d'expérience", value: 20, icon: "Calendar", order: 1 },
  { id: "2", label: "Familles autonomisées", value: 5000, icon: "Users", order: 2 },
  { id: "3", label: "Groupes d'épargne formés", value: 150, icon: "PiggyBank", order: 3 },
  { id: "4", label: "Arbres plantés", value: 25000, icon: "TreePine", order: 4 },
];

export const fallbackGalleryEN: GalleryImage[] = [
  { id: "1", caption: "Community members engaging in peace dialogue", category: "Peacebuilding", cloudinaryImageUrl: "/peace.webp" },
  { id: "2", caption: "Farmers learning conservation agriculture", category: "Agriculture", cloudinaryImageUrl: "/cons.webp" },
  { id: "3", caption: "A local savings group meeting and microfinance planning", category: "Economic Development", cloudinaryImageUrl: "/vsl.jpg" },
  { id: "4", caption: "Distributing bio-sand water filters to rural households", category: "Clean Water", cloudinaryImageUrl: "/fill.webp" },
  { id: "5", caption: "Maize production increase through conservation agriculture", category: "Agriculture", cloudinaryImageUrl: "/maize.webp" },
  { id: "6", caption: "Human rights advocacy workshops for community leaders", category: "Peacebuilding", cloudinaryImageUrl: "/human.webp" },
];

export const fallbackGalleryFR: GalleryImage[] = [
  { id: "1", caption: "Membres de la communauté engagés dans un dialogue de paix", category: "Consolidation de la paix", cloudinaryImageUrl: "/peace.webp" },
  { id: "2", caption: "Agriculteurs apprenant l'agriculture de conservation", category: "Agriculture", cloudinaryImageUrl: "/cons.webp" },
  { id: "3", caption: "Réunion d'un groupe d'épargne local et planification de microfinance", category: "Développement économique", cloudinaryImageUrl: "/vsl.jpg" },
  { id: "4", caption: "Distribution de filtres à eau bio-sable à des ménages ruraux", category: "Eau propre", cloudinaryImageUrl: "/fill.webp" },
  { id: "5", caption: "Augmentation de la production de maïs grâce à l'agriculture de conservation", category: "Agriculture", cloudinaryImageUrl: "/maize.webp" },
  { id: "6", caption: "Ateliers de plaidoyer pour les droits de l'homme destinés aux dirigeants locaux", category: "Consolidation de la paix", cloudinaryImageUrl: "/human.webp" },
];

// Helper to simulate network delay for mock data
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPrograms(): Promise<Program[]> {
  const lang = await getLang();
  await delay(100);
  return lang === "fr" ? fallbackProgramsFR : fallbackProgramsEN;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const lang = await getLang();
  await delay(100);
  return lang === "fr" ? fallbackTestimonialsFR : fallbackTestimonialsEN;
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  const lang = await getLang();
  await delay(100);
  return lang === "fr" ? fallbackImpactStatsFR : fallbackImpactStatsEN;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const lang = await getLang();
  await delay(100);
  return lang === "fr" ? fallbackGalleryFR : fallbackGalleryEN;
}
