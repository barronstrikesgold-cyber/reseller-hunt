"use client";

import { HuntCard } from "@/components/hunt-card";
import { RELEASES, itemById } from "@/data/hunt";
import { ExternalLink } from "lucide-react";

export default function ReleasesPage() {
  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0c0d10]/95 px-4 pt-4 pb-3 backdrop-blur-sm">
        <p className="text-[12px] font-semibold tracking-[0.18em] text-amber-300 uppercase">
          Dated board
        </p>
        <h1 className="mt-1 text-[28px] leading-none font-bold tracking-tight">Retail drops</h1>
        <p className="mt-2 text-[14px] text-zinc-400">
          Pokémon 30th and later waves. Printed prices only — no guessed sold.
        </p>
      </header>

      <ol className="space-y-6 px-4 pt-4">
        {RELEASES.map((drop) => (
          <li key={drop.id} className="space-y-3">
            <div className="rounded-2xl bg-[#16181f] p-4 ring-1 ring-white/10">
              <p className="text-[13px] font-semibold tracking-wide text-amber-300 uppercase">
                {drop.dateLabel}
              </p>
              <h2 className="mt-1 text-[20px] font-bold tracking-tight">{drop.title}</h2>
              <p className="mt-1 text-[15px] leading-snug text-zinc-200">{drop.blurb}</p>
              <p className="mt-2 text-[13px] text-zinc-400">{drop.where}</p>
              {drop.links?.length ? (
                <ul className="mt-2 space-y-1">
                  {drop.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-amber-300"
                      >
                        <ExternalLink className="size-3.5" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {drop.products.map((id) => {
              const item = itemById(id);
              if (!item) return null;
              return <HuntCard key={id} item={item} />;
            })}
          </li>
        ))}
      </ol>
    </div>
  );
}
