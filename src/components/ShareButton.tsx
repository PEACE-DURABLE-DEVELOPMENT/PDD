"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: title,
      text: `Read this story from PDD Rwanda: ${title}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="group inline-flex items-center gap-2 text-slate-700 hover:text-blue-700 transition-all bg-white hover:bg-slate-50 px-5 py-2.5 rounded-full border border-slate-200 shadow-sm font-medium text-sm cursor-pointer"
      title="Share this article"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-500" />
          <span className="text-emerald-600 font-semibold">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Share Article</span>
        </>
      )}
    </button>
  );
}
