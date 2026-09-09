"use client";

import Link from "next/link";
import { Chevron, CheckCircle, Group, Hairline } from "@/components/ios";
import type { HuntItem } from "@/data/hunt";
import { useChecks } from "@/lib/checks";
import { cn } from "@/lib/utils";

export function quietStatus(item: HuntItem) {
  if (!item.sold) return "Unknown";
  if (item.verdict === "leave" || item.verdict === "skip") return "Leave";
  return "Buy";
}

function rowDetail(item: HuntItem) {
  const bits: string[] = [];
  if (item.caseCode) bits.push(`Case ${item.caseCode}`);
  if (item.category === "hot-wheels" && item.mark === "gold-flame") bits.push("Super");
  if (item.category === "hot-wheels" && item.mark === "silver-flame") bits.push("TH");
  if (item.buyPrice) bits.push(item.buyPrice.amount);
  else if (item.sold) bits.push(`sold $${item.sold.dollars}`);
  return bits.join(" · ");
}

export function HuntRow({ item }: { item: HuntItem }) {
  const { isChecked, toggle } = useChecks();
  const checked = isChecked(item.id);
  const status = quietStatus(item);

  return (
    <div className="flex items-stretch">
      <CheckCircle
        checked={checked}
        label={`Mark ${item.name} found`}
        onClick={() => toggle(item.id)}
      />
      <Link
        href={`/cash?item=${item.id}`}
        className="flex min-h-14 min-w-0 flex-1 items-center gap-2 py-2 pr-4"
      >
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate text-[17px] leading-tight text-black",
              checked && "text-[#8E8E93] line-through"
            )}
          >
            {item.name}
          </p>
          <p className="mt-0.5 truncate text-[13px] text-[#8E8E93]">{rowDetail(item)}</p>
        </div>
        <span className="shrink-0 text-[15px] text-[#8E8E93]">{status}</span>
        <Chevron />
      </Link>
    </div>
  );
}

export function HuntGroup({
  title,
  items,
  footer,
}: {
  title: string;
  items: HuntItem[];
  footer?: string;
}) {
  return (
    <Group header={title} footer={footer}>
      {items.map((item, index) => (
        <div key={item.id}>
          {index > 0 ? <Hairline inset={44} /> : null}
          <HuntRow item={item} />
        </div>
      ))}
    </Group>
  );
}
