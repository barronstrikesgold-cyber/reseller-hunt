"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HuntGroup } from "@/components/hunt-card";
import {
  CATEGORY_LABEL,
  ITEMS,
  groupItems,
  itemsByCategory,
  type Category,
} from "@/data/hunt";
import { useChecks } from "@/lib/checks";
import { cn } from "@/lib/utils";

const cats: Category[] = ["hot-wheels", "matchbox", "pokemon", "goodwill"];

function isCategory(value: string | null): value is Category {
  return value === "hot-wheels" || value === "matchbox" || value === "pokemon" || value === "goodwill";
}

function ListsBody() {
  const searchParams = useSearchParams();
  const param = searchParams.get("cat");
  const cat: Category = isCategory(param) ? param : "hot-wheels";
  const { countFor } = useChecks();
  const items = itemsByCategory(cat);
  const { done, total } = countFor(items.map((item) => item.id));
  const all = countFor(ITEMS.map((item) => item.id));
  const groups = groupItems(items);

  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0c0d10] px-4 pt-4 pb-3">
        <p className="text-[12px] font-semibold tracking-[0.18em] text-amber-300 uppercase">
          Checkable lists
        </p>
        <h1 className="mt-1 text-[28px] leading-none font-bold tracking-tight">By aisle</h1>
        <p className="mt-2 text-[14px] text-zinc-400">
          {all.done}/{all.total} checked on this phone
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {cats.map((id) => (
            <Link
              key={id}
              href={`/lists?cat=${id}`}
              className={cn(
                "flex min-h-12 items-center justify-center rounded-xl px-2 text-[14px] font-semibold ring-1",
                cat === id
                  ? "bg-amber-300 text-black ring-amber-200"
                  : "bg-zinc-900 text-zinc-200 ring-white/10"
              )}
            >
              {CATEGORY_LABEL[id]}
            </Link>
          ))}
        </div>
        <p className="mt-2 text-[13px] text-zinc-500">
          {CATEGORY_LABEL[cat]} · {done} of {total} checked
        </p>
        <Link href="/releases" className="mt-2 inline-flex min-h-11 items-center text-[14px] font-semibold text-amber-300">
          Dated Pokémon releases →
        </Link>
      </header>

      <div className="space-y-5 px-4 pt-4">
        {groups.map((group) => (
          <HuntGroup key={`${cat}-${group.name}`} title={group.name} items={group.items} />
        ))}
      </div>
    </div>
  );
}

export default function ListsPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 pt-8 text-[15px] text-zinc-400">Loading lists…</div>
      }
    >
      <ListsBody />
    </Suspense>
  );
}
