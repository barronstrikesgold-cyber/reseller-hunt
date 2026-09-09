"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HuntGroup } from "@/components/hunt-card";
import { Chevron, Group, Hairline, IosScreen } from "@/components/ios";
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
    <IosScreen title="Lists" subtitle={`${all.done} of ${all.total} checked on this phone`}>
      <Group header="Aisle">
        {cats.map((id, index) => (
          <div key={id}>
            {index > 0 ? <Hairline inset={16} /> : null}
            <Link
              href={`/lists?cat=${id}`}
              className="flex min-h-11 items-center justify-between px-4"
            >
              <span className={cn("text-[17px]", cat === id ? "font-semibold text-black" : "text-black")}>
                {CATEGORY_LABEL[id]}
              </span>
              {cat === id ? <span className="text-[15px] text-[#8E8E93]">Selected</span> : <Chevron />}
            </Link>
          </div>
        ))}
      </Group>
      <p className="px-8 text-[13px] text-[#8E8E93]">
        {CATEGORY_LABEL[cat]} · {done} of {total} checked
      </p>
      <Group>
        <Link href="/releases" className="flex min-h-11 items-center px-4">
          <span className="flex-1 text-[17px] text-black">Retail drops</span>
          <Chevron />
        </Link>
      </Group>
      {groups.map((group) => (
        <HuntGroup key={`${cat}-${group.name}`} title={group.name} items={group.items} />
      ))}
    </IosScreen>
  );
}

export default function ListsPage() {
  return (
    <Suspense fallback={<div className="px-4 pt-8 text-[#8E8E93]">Loading lists…</div>}>
      <ListsBody />
    </Suspense>
  );
}
