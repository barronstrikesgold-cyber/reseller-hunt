"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, Group, Hairline, IosScreen, PrimaryButton, fieldControl } from "@/components/ios";
import { DEFAULT_SHIPPING, FEE_RATE, itemById, tonightBuyItems, type HuntItem } from "@/data/hunt";
import { useChecks } from "@/lib/checks";
import { useLedger } from "@/lib/ledger";
import { money, parseDollars, priceDeal, shelfDefault } from "@/lib/money";

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

  const caption =
    deal.verdict === "unknown"
      ? "Unknown. No settled sold. No profit number."
      : deal.verdict === "buy"
        ? "Buy. Leftover cash is real after fees and ship."
        : "Leave. Leftover cash is not real at this shelf price.";

  return (
    <IosScreen title="Cash" subtitle={`Shelf vs stored sold. Fees ${Math.round(FEE_RATE * 100)}%. Shipping is your estimate.`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          markBuy();
        }}
      >
        <Group header="Deal">
          <Field label="Item">
            <select
              value={item.id}
              onChange={(e) => router.replace(`/cash?item=${e.target.value}`)}
              className={fieldControl}
            >
              {items.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.name}
                  {row.sold ? ` · sold ${money(row.sold.dollars)}` : " · no settled sold"}
                </option>
              ))}
            </select>
          </Field>
          <Hairline inset={16} />
          <Field label="Shelf">
            <input
              inputMode="decimal"
              value={shelf}
              onChange={(e) => setShelf(e.target.value)}
              className={`${fieldControl} tabular-nums`}
              aria-label="Shelf price"
            />
          </Field>
          <Hairline inset={16} />
          <Field label="Ship">
            <input
              inputMode="decimal"
              value={ship}
              onChange={(e) => setShip(e.target.value)}
              className={`${fieldControl} tabular-nums`}
              aria-label="Shipping estimate"
            />
          </Field>
        </Group>
        <p className="px-8 text-[13px] text-[#8E8E93]">
          {item.buyPrice ? `${item.buyPrice.amount} ${item.buyPrice.kind}. ` : ""}
          Ship is an estimate, not a sold number.
        </p>

        <Group header="Trip">
          <Field label="Store">
            <select value={store} onChange={(e) => setStore(e.target.value)} className={fieldControl}>
              {STORES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Hairline inset={16} />
          <Field label="Date">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={fieldControl} />
          </Field>
        </Group>

        <Group header="Result" footer={caption}>
          {sold === null ? (
            <div className="flex min-h-14 items-center justify-between px-4">
              <span className="text-[17px] text-black">Sold</span>
              <span className="text-[17px] text-[#8E8E93]">Unknown</span>
            </div>
          ) : (
            <>
              <div className="flex min-h-11 items-center justify-between px-4">
                <span className="text-[17px] text-black">Sold</span>
                <span className="text-[17px] tabular-nums text-black">{money(sold)}</span>
              </div>
              <Hairline inset={16} />
              <div className="flex min-h-11 items-center justify-between px-4">
                <span className="text-[17px] text-black">Fees ~13%</span>
                <span className="text-[17px] tabular-nums text-[#8E8E93]">{money(deal.fees ?? 0)}</span>
              </div>
              <Hairline inset={16} />
              <div className="flex min-h-11 items-center justify-between px-4">
                <span className="text-[17px] text-black">Ship</span>
                <span className="text-[17px] tabular-nums text-[#8E8E93]">{money(shipN)}</span>
              </div>
              <Hairline inset={16} />
              <div className="flex min-h-11 items-center justify-between px-4">
                <span className="text-[17px] text-black">Shelf</span>
                <span className="text-[17px] tabular-nums text-[#8E8E93]">{money(shelfN)}</span>
              </div>
              <Hairline inset={16} />
              <div className="flex min-h-[52px] items-center justify-between px-4">
                <span className="text-[17px] font-semibold text-black">Cash left</span>
                <span className="text-[22px] font-semibold tabular-nums text-black">
                  {money(deal.cashLeft ?? 0)}
                </span>
              </div>
            </>
          )}
        </Group>
        {item.sold?.note ? (
          <p className="px-8 pb-1 text-[13px] text-[#8E8E93]">{item.sold.note}</p>
        ) : null}

        <div className="px-4 pt-4 pb-6">
          <PrimaryButton type="submit" disabled={deal.verdict !== "buy"}>
            {deal.verdict === "buy" ? "Mark Buy" : "Mark Buy Locked"}
          </PrimaryButton>
        </div>
      </form>
    </IosScreen>
  );
}

function CashBody() {
  const items = tonightBuyItems();
  const params = useSearchParams();
  const paramItem = params.get("item");
  const item = (paramItem && itemById(paramItem)) || items[0];
  if (!item) return <p className="px-4 pt-8 text-[#8E8E93]">No tonight items.</p>;
  return <CashForm key={item.id} item={item} />;
}

export default function CashPage() {
  return (
    <Suspense fallback={<div className="px-4 pt-8 text-[#8E8E93]">Loading cash…</div>}>
      <CashBody />
    </Suspense>
  );
}
