"use client";

import { useMemo, useState } from "react";
import { HuntGroup } from "@/components/hunt-card";
import { GoldFlame, SilverFlame, SuperChaseBar } from "@/components/id-marks";
import { AS_OF, DECODER, groupItems, tonightItems } from "@/data/hunt";
import { useChecks } from "@/lib/checks";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "All" },
  { id: "buy", label: "Buy" },
  { id: "super", label: "Super" },
  { id: "th", label: "TH" },
  { id: "matchbox", label: "Matchbox" },
  { id: "pokemon", label: "Pokémon" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export default function TonightPage() {
  const items = tonightItems();
  const { countFor } = useChecks();
  const [filter, setFilter] = useState<FilterId>("all");
  const { done, total } = countFor(items.map((item) => item.id));
  const remaining = total - done;

  const visible = useMemo(() => {
    return items.filter((item) => {
      if (filter === "buy") return item.verdict === "buy" || item.verdict === "if-seen";
      if (filter === "super") return item.mark === "gold-flame";
      if (filter === "th") return item.mark === "silver-flame";
      if (filter === "matchbox") return item.category === "matchbox";
      if (filter === "pokemon") return item.category === "pokemon";
      return true;
    });
  }, [filter, items]);

  const groups = groupItems(visible);

  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0c0d10]/95 px-4 pt-4 pb-3 backdrop-blur-sm">
        <p className="text-[12px] font-semibold tracking-[0.18em] text-amber-300 uppercase">
          Reseller Hunt
        </p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-[28px] leading-none font-bold tracking-tight">Tonight&apos;s pegs</h1>
            <p className="mt-2 text-[14px] text-zinc-400">
          {AS_OF} · tap Price it before you spend
        </p>
          </div>
          <p className="rounded-xl bg-zinc-900 px-3 py-2 text-right ring-1 ring-white/10">
            <span className="block text-[22px] leading-none font-bold tabular-nums text-amber-300">
              {remaining}
            </span>
            <span className="text-[11px] tracking-wide text-zinc-400 uppercase">
              still open
            </span>
          </p>
        </div>
        <p className="mt-2 text-[13px] text-zinc-500">
          {done} checked · {total} on tonight
        </p>
      </header>

      <div className="space-y-5 px-4 pt-4">
        <section className="rounded-2xl bg-[#16181f] p-3 ring-1 ring-white/10">
          <p className="mb-2 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            Aisle ID
          </p>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-3 text-[14px] leading-snug text-zinc-100">
              <GoldFlame className="size-9 shrink-0" />
              <span>{DECODER.hw[0]}</span>
            </li>
            <li className="flex items-center gap-3 text-[14px] leading-snug text-zinc-100">
              <SilverFlame className="size-9 shrink-0" />
              <span>{DECODER.hw[1]}</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] leading-snug text-zinc-100">
              <SuperChaseBar className="mt-0.5 h-6 w-28 shrink-0" />
              <span>{DECODER.mb[0]}</span>
            </li>
            <li className="text-[13px] text-zinc-400">{DECODER.hw[2]}</li>
          </ul>
        </section>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {filters.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFilter(chip.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-4 text-[14px] font-semibold ring-1",
                filter === chip.id
                  ? "bg-amber-300 text-black ring-amber-200"
                  : "bg-zinc-900 text-zinc-200 ring-white/10"
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {groups.length === 0 ? (
          <p className="rounded-xl bg-zinc-900 px-4 py-8 text-center text-[15px] text-zinc-400">
            Nothing in this filter.
          </p>
        ) : (
          groups.map((group) => (
            <HuntGroup key={group.name} title={group.name} items={group.items} />
          ))
        )}
      </div>
    </div>
  );
}
