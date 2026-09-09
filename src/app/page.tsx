"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HuntGroup } from "@/components/hunt-card";
import { Chevron, Group, Hairline, IosScreen } from "@/components/ios";
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
  { id: "pokemon", label: "Pok\u00e9mon" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export default function FindsPage() {
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
    <IosScreen
      title="Finds"
      subtitle={`${remaining} open \u00b7 ${done} checked \u00b7 ${AS_OF}`}
    >
      <div className="px-4 pb-1">
        <div className="flex gap-1 overflow-x-auto pb-1">
          {filters.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFilter(chip.id)}
              className={cn(
                "min-h-11 shrink-0 px-2.5 text-[15px]",
                filter === chip.id ? "font-semibold text-black" : "text-[#8E8E93]"
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <Group header="Aisle ID" footer={DECODER.hw[2]}>
        <div className="flex min-h-14 items-center gap-3 px-4 py-2">
          <GoldFlame className="size-7 shrink-0" />
          <p className="text-[15px] leading-snug text-black">{DECODER.hw[0]}</p>
        </div>
        <Hairline inset={16} />
        <div className="flex min-h-14 items-center gap-3 px-4 py-2">
          <SilverFlame className="size-7 shrink-0" />
          <p className="text-[15px] leading-snug text-black">{DECODER.hw[1]}</p>
        </div>
        <Hairline inset={16} />
        <div className="flex min-h-14 items-center gap-3 px-4 py-2">
          <SuperChaseBar className="h-5 w-[108px] shrink-0" />
          <p className="text-[15px] leading-snug text-black">{DECODER.mb[0]}</p>
        </div>
      </Group>

      {groups.length === 0 ? (
        <p className="px-8 py-10 text-center text-[15px] text-[#8E8E93]">Nothing in this filter.</p>
      ) : (
        groups.map((group) => <HuntGroup key={group.name} title={group.name} items={group.items} />)
      )}

      <Group header="More">
        <Link href="/lists" className="flex min-h-11 items-center gap-3 px-4">
          <span className="flex-1 text-[17px] text-black">All lists</span>
          <Chevron />
        </Link>
        <Hairline inset={16} />
        <Link href="/releases" className="flex min-h-11 items-center gap-3 px-4">
          <span className="flex-1 text-[17px] text-black">Retail drops</span>
          <Chevron />
        </Link>
      </Group>
    </IosScreen>
  );
}
