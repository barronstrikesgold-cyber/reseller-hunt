"use client";

import { CheckIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import { PackShot } from "@/components/pack-shot";
import { GoldFlame, SilverFlame, SuperChaseBar } from "@/components/id-marks";
import { Badge } from "@/components/ui/badge";
import {
  PRICE_KIND_LABEL,
  VERDICT_LABEL,
  type HuntItem,
  type Verdict,
} from "@/data/hunt";
import { useChecks } from "@/lib/checks";
import { cn } from "@/lib/utils";

const verdictClass: Record<Verdict, string> = {
  buy: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30",
  "if-seen": "bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30",
  leave: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30",
  skip: "bg-zinc-500/15 text-zinc-300 ring-1 ring-zinc-400/25",
};

function Mark({ item }: { item: HuntItem }) {
  if (item.mark === "gold-flame") return <GoldFlame className="size-10 shrink-0" />;
  if (item.mark === "silver-flame") return <SilverFlame className="size-10 shrink-0" />;
  if (item.mark === "super-chase") return <SuperChaseBar className="h-6 w-[148px] shrink-0" />;
  return null;
}

export function HuntCard({
  item,
  compact = false,
}: {
  item: HuntItem;
  compact?: boolean;
}) {
  const { isChecked, toggle } = useChecks();
  const checked = isChecked(item.id);
  const showVisual = Boolean(item.photo || item.paint);

  return (
    <article
      className={cn(
        "rounded-2xl bg-card ring-1 ring-white/10 transition-opacity",
        checked && "opacity-55"
      )}
    >
      <div className="flex gap-3 p-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          aria-label={`Mark ${item.name} found`}
          onClick={() => toggle(item.id)}
          className={cn(
            "mt-1 flex size-12 shrink-0 items-center justify-center rounded-xl border-2",
            checked
              ? "border-emerald-400 bg-emerald-500 text-black"
              : "border-white/25 bg-transparent text-transparent"
          )}
        >
          <CheckIcon className="size-6" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                "text-[17px] leading-snug font-semibold tracking-tight text-zinc-50",
                checked && "line-through"
              )}
            >
              {item.name}
            </h3>
            <Badge className={cn("h-6 px-2 text-[11px] font-bold", verdictClass[item.verdict])}>
              {VERDICT_LABEL[item.verdict]}
            </Badge>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] text-zinc-400">
            {item.caseCode ? <span>Case {item.caseCode}</span> : null}
            {item.series ? <span>{item.series}</span> : null}
            {item.category === "hot-wheels" && item.mark === "gold-flame" ? (
              <span>Super</span>
            ) : null}
            {item.category === "hot-wheels" && item.mark === "silver-flame" ? (
              <span>Regular TH</span>
            ) : null}
          </div>
        </div>
      </div>

      {!compact && showVisual ? (
        <div className="px-3 pb-3">
          <PackShot item={item} className="h-24 w-full" />
        </div>
      ) : null}

      <div className="space-y-2 px-3 pb-3">
        <div className="flex items-start gap-2">
          {!compact ? <Mark item={item} /> : null}
          <p className="text-[15px] leading-snug text-zinc-100">{item.idRule}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {item.buyPrice ? (
            <PriceChip
              amount={item.buyPrice.amount}
              kind={PRICE_KIND_LABEL[item.buyPrice.kind]}
              note={item.buyPrice.note}
            />
          ) : null}
          {item.secondary ? (
            <PriceChip
              amount={item.secondary.amount}
              kind={PRICE_KIND_LABEL[item.secondary.kind]}
              note={item.secondary.note}
            />
          ) : null}
          {item.soldUnknown && !item.sold ? (
            <PriceChip amount="no settled sold" kind="sold" />
          ) : null}
        </div>

        <Link
          href={`/cash?item=${item.id}`}
          className="flex min-h-12 items-center justify-center rounded-xl bg-zinc-800 text-[15px] font-semibold text-amber-300 ring-1 ring-white/10"
        >
          Price it · cash left
        </Link>

        <p className="text-[13px] text-zinc-400">{item.where}</p>

        {item.notes?.map((note) => (
          <p key={note} className="text-[13px] leading-snug text-zinc-300">
            {note}
          </p>
        ))}

        {item.links?.length ? (
          <ul className="space-y-1 pt-1">
            {item.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-amber-300 underline-offset-2 hover:underline"
                >
                  <ExternalLink className="size-3.5" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

function PriceChip({
  amount,
  kind,
  note,
}: {
  amount: string;
  kind: string;
  note?: string;
}) {
  return (
    <span
      title={note}
      className="inline-flex max-w-full items-baseline gap-1 rounded-md bg-zinc-800 px-2 py-1 text-[13px] text-zinc-100 ring-1 ring-white/8"
    >
      <span className="font-semibold">{amount}</span>
      <span className="text-[11px] tracking-wide text-zinc-400 uppercase">{kind}</span>
    </span>
  );
}

export function HuntGroup({
  title,
  items,
  compact,
}: {
  title: string;
  items: HuntItem[];
  compact?: boolean;
}) {
  return (
    <section className="space-y-2">
      <h2 className="px-1 py-2 text-[13px] font-semibold tracking-wider text-amber-200/90 uppercase">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <HuntCard key={item.id} item={item} compact={compact || item.compact} />
        ))}
      </div>
    </section>
  );
}
