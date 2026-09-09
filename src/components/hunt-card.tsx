"use client";

import Link from "next/link";
import { Chevron, CheckCircle, Group, Hairline } from "@/components/ios";
import { buyLine, itemPhoto, saleLine, type HuntItem } from "@/data/hunt";
import { useChecks } from "@/lib/checks";
import { cn } from "@/lib/utils";

export function HuntPhoto({ item, className }: { item: HuntItem; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, bundled JPEGs
    <img
      src={itemPhoto(item)}
      alt=""
      width={56}
      height={72}
      className={cn(
        "h-[72px] w-14 shrink-0 rounded-[8px] bg-[#E5E5EA] object-cover",
        className
      )}
    />
  );
}

export function HuntRow({ item }: { item: HuntItem }) {
  const { isChecked, toggle } = useChecks();
  const checked = isChecked(item.id);

  return (
    <div className="flex items-stretch">
      <CheckCircle
        checked={checked}
        label={`Mark ${item.name} found`}
        onClick={() => toggle(item.id)}
      />
      <Link
        href={`/cash?item=${item.id}`}
        className="flex min-h-[88px] min-w-0 flex-1 items-center gap-3 py-2 pr-4"
      >
        <HuntPhoto item={item} />
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-[17px] leading-tight text-black",
              checked && "text-[#8E8E93] line-through"
            )}
          >
            {item.name}
          </p>
          <p className="mt-0.5 text-[13px] leading-snug text-[#8E8E93]">{buyLine(item)}</p>
          <p className="mt-0.5 text-[13px] leading-snug text-[#8E8E93]">{saleLine(item)}</p>
        </div>
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
  title?: string;
  items: HuntItem[];
  footer?: string;
}) {
  return (
    <Group header={title} footer={footer}>
      {items.map((item, index) => (
        <div key={item.id}>
          {index > 0 ? <Hairline inset={108} /> : null}
          <HuntRow item={item} />
        </div>
      ))}
    </Group>
  );
}
