import Image from "next/image";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  cloudinaryUrl?: string;
  label: string;
  aspectRatio: string; // e.g. "16/9", "1/1", "4/3"
  className?: string;
  objectFit?: "cover" | "contain";
}

export default function SmartImage({
  cloudinaryUrl,
  label,
  aspectRatio,
  className,
  objectFit = "cover",
}: SmartImageProps) {
  if (!cloudinaryUrl) {
    return (
      <div
        className={cn(
          "bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center rounded-xl overflow-hidden",
          className
        )}
        style={{ aspectRatio }}
      >
        <span className="text-slate-500 font-medium text-sm">{label}</span>
        <span className="text-slate-400 text-xs mt-1">
          Recommended ratio: {aspectRatio}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-xl", className)}
      style={{ aspectRatio }}
    >
      <Image
        src={cloudinaryUrl}
        alt={label}
        fill
        className={cn(objectFit === "contain" ? "object-contain" : "object-cover")}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
