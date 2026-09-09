"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HuntPhoto } from "@/components/hunt-card";
import { Group, Hairline, IosScreen, PrimaryButton } from "@/components/ios";
import { DEFAULT_SHIPPING, tonightItems, type HuntItem } from "@/data/hunt";
import { useChecks } from "@/lib/checks";
import { useLedger } from "@/lib/ledger";
import { priceDeal, shelfDefault } from "@/lib/money";
import { cn } from "@/lib/utils";

function todayIso() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function ScanPage() {
  const router = useRouter();
  const items = tonightItems();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggle } = useChecks();
  const { addBuy, shippingDefault } = useLedger();
  const [shot, setShot] = useState<string | null>(null);
  const [picked, setPicked] = useState<HuntItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onFile(file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setShot(url);
    setError(null);
  }

  function saveBuy() {
    if (!picked) {
      setError("Pick which find it is.");
      return;
    }
    const shelf = shelfDefault(picked);
    const ship = shippingDefault || DEFAULT_SHIPPING;
    const sold = picked.sold?.dollars ?? null;
    const deal = priceDeal({ sold, shelf, shipping: ship });
    addBuy({
      itemId: picked.id,
      name: picked.name,
      cost: shelf,
      store: "Aisle scan",
      date: todayIso(),
      shipping: ship,
      fees: deal.fees,
      sale: sold,
      cashIn: deal.cashIn,
      profit: deal.cashLeft,
    });
    toggle(picked.id, true);
    router.push("/books");
  }

  return (
    <IosScreen title="Scan" subtitle="Open the camera, then buy or pass. Buy saves to Books.">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => onFile(e.target.files?.[0])}
      />

      <div className="px-4 pb-2">
        <PrimaryButton onClick={() => inputRef.current?.click()}>
          {shot ? "Retake" : "Open camera"}
        </PrimaryButton>
      </div>

      {shot ? (
        <div className="px-4 pb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shot}
            alt="Aisle scan"
            className="h-48 w-full rounded-[10px] bg-black object-cover"
          />
        </div>
      ) : (
        <p className="px-8 pb-3 text-[15px] text-[#8E8E93]">
          iPhone opens the camera from this page. Snap the card, pick the match, then Buy or Pass.
        </p>
      )}

      <Group header="What is it">
        {items.map((item, index) => (
          <div key={item.id}>
            {index > 0 ? <Hairline inset={108} /> : null}
            <button
              type="button"
              onClick={() => {
                setPicked(item);
                setError(null);
              }}
              className="flex min-h-[88px] w-full items-center gap-3 px-3 py-2 text-left"
            >
              <HuntPhoto item={item} />
              <span
                className={cn(
                  "min-w-0 flex-1 text-[17px] leading-tight",
                  picked?.id === item.id ? "font-semibold text-[#007AFF]" : "text-black"
                )}
              >
                {item.name}
              </span>
            </button>
          </div>
        ))}
      </Group>

      {error ? <p className="px-8 text-[15px] text-[#FF3B30]">{error}</p> : null}

      <div className="flex gap-3 px-4 pt-2 pb-6">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex min-h-12 flex-1 items-center justify-center rounded-[14px] bg-white text-[17px] font-semibold text-black"
        >
          Pass
        </button>
        <div className="flex-1">
          <PrimaryButton onClick={saveBuy}>Buy</PrimaryButton>
        </div>
      </div>
    </IosScreen>
  );
}
