import { FEE_RATE, type HuntItem } from "@/data/hunt";

export function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function roundCents(n: number) {
  return Math.round(n * 100) / 100;
}

export function parseDollars(raw: string) {
  const n = Number.parseFloat(raw.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n < 0) return null;
  return roundCents(n);
}

export function shelfDefault(item: HuntItem | undefined) {
  if (!item) return 1;
  if (typeof item.shelfDollars === "number") return item.shelfDollars;
  return 1;
}

export function priceDeal(input: {
  sold: number | null;
  shelf: number;
  shipping: number;
}) {
  if (input.sold === null) {
    return {
      known: false as const,
      fees: null,
      cashIn: null,
      cashLeft: null,
      verdict: "unknown" as const,
    };
  }
  const fees = roundCents(input.sold * FEE_RATE);
  const cashIn = roundCents(input.sold - fees);
  const cashLeft = roundCents(cashIn - input.shipping - input.shelf);
  return {
    known: true as const,
    fees,
    cashIn,
    cashLeft,
    verdict: cashLeft > 0 ? ("buy" as const) : ("pass" as const),
  };
}
