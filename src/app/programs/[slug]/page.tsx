import { notFound } from "next/navigation";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import { getPrograms } from "@/lib/airtable";
import { ArrowLeft, ArrowRight, HeartHandshake, Sprout, Landmark, Stethoscope, TreePine } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const programs = await getPrograms();
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) return { title: "Program Not Found" };
  return {
    title: `${program.title} | PDD Rwanda`,
    description: program.shortOverview,
  };
}

const getIconComponent = (iconName: string, className: string = "w-8 h-8") => {
  switch (iconName) {
    case "HeartHandshake": return <HeartHandshake className={className} />;
    case "Sprout": return <Sprout className={className} />;
    case "Landmark": return <Landmark className={className} />;
    case "Stethoscope": return <Stethoscope className={className} />;
    case "TreePine": return <TreePine className={className} />;
    default: return <HeartHandshake className={className} />;
  }
};

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const programs = await getPrograms();
  const program = programs.find((p) => p.slug === params.slug);

  if (!program) {
    notFound();
  }

  const relatedPrograms = programs.filter((p) => p.slug !== params.slug).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-surface">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <SmartImage
            label={`Hero — ${program.title}`}
            aspectRatio="16/9"
            className="w-full h-full object-cover rounded-none"
            cloudinaryUrl={program.cloudinaryImageUrl}
          />
          <div className="absolute inset-0 bg-ink-heading/40 z-10" />
        </div>
        <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
          <Link href="/programs" className="inline-flex items-center gap-2 text-surface/80 hover:text-surface mb-6 w-fit transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Programs
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-surface shadow-lg">
              {getIconComponent(program.icon, "w-8 h-8")}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface max-w-4xl leading-tight drop-shadow-sm">
            {program.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg prose-slate text-ink-body">
            <p className="lead text-xl text-ink-heading font-medium mb-8">
              {program.shortOverview}
            </p>
            <div className="whitespace-pre-wrap">
              {program.fullDescription}
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-24 bg-surface-alt border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-ink-heading mb-12 text-center">
            Other Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPrograms.map((p) => (
              <Link href={`/programs/${p.slug}`} key={p.id} className="group bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {getIconComponent(p.icon, "w-6 h-6")}
                </div>
                <h3 className="text-lg font-heading font-semibold text-ink-heading mb-2">
                  {p.title}
                </h3>
                <p className="text-ink-body text-sm flex-grow line-clamp-3 mb-4">
                  {p.shortOverview}
                </p>
                <div className="text-primary text-sm font-medium flex items-center gap-1 mt-auto">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
