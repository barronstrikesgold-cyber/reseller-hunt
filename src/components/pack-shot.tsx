import { GoldFlame, SilverFlame, SuperChaseBar } from "@/components/id-marks";
import type { HuntItem } from "@/data/hunt";
import { cn } from "@/lib/utils";

function CarBody({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 72" className="h-full w-full" aria-hidden>
      <ellipse cx="80" cy="64" rx="58" ry="5" fill="black" opacity="0.28" />
      <path
        d="M22 48c4-14 18-22 36-24 10-8 22-12 36-10 12 2 20 8 26 16 12 2 22 8 24 16H22z"
        fill={color}
      />
      <path
        d="M58 26c8-6 18-8 30-6 8 1 14 5 18 10H62z"
        fill="#111"
        opacity="0.45"
      />
      <rect x="70" y="28" width="22" height="8" rx="2" fill="#9ec9ff" opacity="0.55" />
      <circle cx="48" cy="52" r="10" fill="#1a1a1a" />
      <circle cx="48" cy="52" r="6" fill="#d0d4db" />
      <circle cx="48" cy="52" r="2" fill="#1a1a1a" />
      <circle cx="118" cy="52" r="10" fill="#1a1a1a" />
      <circle cx="118" cy="52" r="6" fill="#d0d4db" />
      <circle cx="118" cy="52" r="2" fill="#1a1a1a" />
    </svg>
  );
}

export function PackShot({ item, className }: { item: HuntItem; className?: string }) {
  const paint = item.paint ?? "#888";

  if (item.mark === "super-chase") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-white/10",
          className
        )}
      >
        <div className="absolute inset-x-0 top-0 p-1">
          <SuperChaseBar className="h-5 w-full" />
        </div>
        <div className="pt-7">
          <CarBody color={paint} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-[#1a1d24] ring-1 ring-white/10",
        className
      )}
    >
      {item.series ? (
        <div
          className={cn(
            "absolute top-0 right-0 z-10 max-w-[46%] px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase",
            item.series === "SCREEN TIME"
              ? "bg-[#163a6b] text-white"
              : item.series === "COOL CLASSICS"
                ? "bg-zinc-200 text-black"
                : "bg-orange-500 text-black"
          )}
        >
          {item.series}
        </div>
      ) : null}
      <div className="absolute top-1 left-1 z-10">
        {item.mark === "gold-flame" ? (
          <GoldFlame className="size-8" />
        ) : item.mark === "silver-flame" ? (
          <SilverFlame className="size-8" />
        ) : null}
      </div>
      <div className="h-full pt-4">
        <CarBody color={paint} />
      </div>
    </div>
  );
}
