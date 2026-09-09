"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_SHIPPING, FEE_RATE, itemById, tonightBuyItems, type HuntItem } from "@/data/hunt";
import { useChecks } from "@/lib/checks";
import { useLedger } from "@/lib/ledger";
import { money, parseDollars, priceDeal, shelfDefault } from "@/lib/money";
import { cn } from "@/lib/utils";

const STORES = ["Walmart", "Target", "Grocery", "Goodwill", "GameStop", "Other"];

function todayIso() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function CashForm({ item }: { item: HuntItem }) {
  const router = useRouter();
  const items = tonightBuyItems();
  const { toggle } = useChecks();
  const { addBuy, shippingDefault, setShippingDefault } = useLedger();
  const [shelf, setShelf] = useState(String(shelfDefault(item)));
  const [ship, setShip] = useState(String(shippingDefault || DEFAULT_SHIPPING));
  const [store, setStore] = useState("Walmart");
  const [date, setDate] = useState(todayIso());

  const shelfN = parseDollars(shelf) ?? 0;
  const shipN = parseDollars(ship) ?? 0;
  const sold = item.sold?.dollars ?? null;
  const deal = useMemo(
    () => priceDeal({ sold, shelf: shelfN, shipping: shipN }),
    [sold, shelfN, shipN]
  );

  function markBuy() {
    if (deal.verdict !== "buy" || deal.cashLeft === null || deal.fees === null || deal.cashIn === null || sold === null) {
      return;
    }
    addBuy({
      itemId: item.id,
      name: item.name,
      cost: shelfN,
      store,
      date,
      shipping: shipN,
      fees: deal.fees,
      sale: sold,
      cashIn: deal.cashIn,
      profit: deal.cashLeft,
    });
    setShippingDefault(shipN);
    toggle(item.id, true);
    router.push("/books");
  }

  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0c0d10] px-4 pt-4 pb-3">
        <p className="text-[12px] font-semibold tracking-[0.18em] text-amber-300 uppercase">
          Spend
        </p>
        <h1 className="mt-1 text-[28px] leading-none font-bold tracking-tight">Buy or pass</h1>
        <p className="mt-2 text-[14px] text-zinc-400">
          Shelf vs stored sold. Fees {Math.round(FEE_RATE * 100)}%. Shipping is your estimate.
        </p>
      </header>

      <form
        className="space-y-4 px-4 pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          markBuy();
        }}
      >
        <label className="block space-y-1">
          <span className="text-[13px] font-semibold text-zinc-400">Tonight item</span>
          <select
            value={item.id}
            onChange={(e) => router.replace(`/cash?item=${e.target.value}`)}
            className="min-h-12 w-full rounded-xl bg-zinc-900 px-3 text-[16px] text-zinc-50 ring-1 ring-white/10"
          >
            {items.map((row) => (
              <option key={row.id} value={row.id}>
                {row.name}
                {row.sold ? ` · sold ${money(row.sold.dollars)}` : " · no settled sold"}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span className="text-[13px] font-semibold text-zinc-400">Shelf price</span>
            <input
              inputMode="decimal"
              value={shelf}
              onChange={(e) => setShelf(e.target.value)}
              className="min-h-12 w-full rounded-xl bg-zinc-900 px-3 text-[18px] font-semibold tabular-nums ring-1 ring-white/10"
            />
            <span className="text-[12px] text-zinc-500">
              {item.buyPrice ? `${item.buyPrice.amount} ${item.buyPrice.kind}` : "what you pay"}
            </span>
          </label>
          <label className="block space-y-1">
            <span className="text-[13px] font-semibold text-zinc-400">Ship estimate</span>
            <input
              inputMode="decimal"
              value={ship}
              onChange={(e) => setShip(e.target.value)}
              className="min-h-12 w-full rounded-xl bg-zinc-900 px-3 text-[18px] font-semibold tabular-nums ring-1 ring-white/10"
            />
            <span className="text-[12px] text-zinc-500">edit this · not a sold number</span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span className="text-[13px] font-semibold text-zinc-400">Store</span>
            <select
              value={store}
              onChange={(e) => setStore(e.target.value)}
              className="min-h-12 w-full rounded-xl bg-zinc-900 px-3 text-[16px] ring-1 ring-white/10"
            >
              {STORES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-[13px] font-semibold text-zinc-400">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="min-h-12 w-full rounded-xl bg-zinc-900 px-3 text-[16px] ring-1 ring-white/10"
            />
          </label>
        </div>

        <section className="rounded-2xl bg-[#16181f] p-4 ring-1 ring-white/10">
          {sold === null ? (
            <>
              <p className="text-[13px] font-semibold tracking-wide text-zinc-400 uppercase">Sold</p>
              <p className="mt-1 text-[28px] font-bold">unknown</p>
              <p className="mt-1 text-[15px] text-zinc-300">No settled sold. No profit number.</p>
            </>
          ) : (
            <>
              <p className="text-[13px] font-semibold tracking-wide text-zinc-400 uppercase">
                Stored sold · tracked average
              </p>
              <p className="mt-1 text-[28px] font-bold tabular-nums">{money(sold)}</p>
              <p className="mt-1 text-[13px] text-zinc-400">{item.sold?.note}</p>
              <dl className="mt-4 space-y-2 text-[15px]">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">eBay fees ~13%</dt>
                  <dd className="tabular-nums">{money(deal.fees ?? 0)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Ship estimate</dt>
                  <dd className="tabular-nums">{money(shipN)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Shelf</dt>
                  <dd className="tabular-nums">{money(shelfN)}</dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-white/10 pt-2">
                  <dt className="font-semibold">Cash left</dt>
                  <dd
                    className={cn(
                      "text-[22px] font-bold tabular-nums",
                      (deal.cashLeft ?? 0) > 0 ? "text-emerald-300" : "text-rose-300"
                    )}
                  >
                    {money(deal.cashLeft ?? 0)}
                  </dd>
                </div>
              </dl>
            </>
          )}
        </section>

        {deal.verdict === "unknown" ? (
          <p className="rounded-xl bg-zinc-900 px-4 py-3 text-[15px] text-zinc-200 ring-1 ring-white/10">
            PASS on a profit claim. You can still check it on Tonight if you saw it.
          </p>
        ) : deal.verdict === "buy" ? (
          <p className="rounded-xl bg-emerald-500/15 px-4 py-3 text-[16px] font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
            BUY. Leftover cash is real after fees and ship.
          </p>
        ) : (
          <p className="rounded-xl bg-rose-500/15 px-4 py-3 text-[16px] font-semibold text-rose-200 ring-1 ring-rose-400/30">
            PASS. Leftover cash is not real at this shelf price.
          </p>
        )}

        <button
          type="submit"
          disabled={deal.verdict !== "buy"}
          className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-amber-300 text-[17px] font-bold text-black disabled:bg-zinc-800 disabled:text-zinc-500"
        >
          {deal.verdict === "buy" ? "Mark buy · put on the books" : "Mark buy locked"}
        </button>
        <Link href="/books" className="block min-h-12 text-center text-[15px] font-semibold text-amber-300">
          Open books
        </Link>
      </form>
    </div>
  );
}

function CashBody() {
  const items = tonightBuyItems();
  const params = useSearchParams();
  const paramItem = params.get("item");
  const item = (paramItem && itemById(paramItem)) || items[0];
  if (!item) return <p className="px-4 pt-8 text-zinc-400">No tonight items.</p>;
  return <CashForm key={item.id} item={item} />;
}

export default function CashPage() {
  return (
    <Suspense fallback={<div className="px-4 pt-8 text-zinc-400">Loading cash…</div>}>
      <CashBody />
    </Suspense>
  );
}
