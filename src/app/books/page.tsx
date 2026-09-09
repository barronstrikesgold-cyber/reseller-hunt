"use client";

import { Group, Hairline, IosScreen } from "@/components/ios";
import { useLedger } from "@/lib/ledger";
import { money } from "@/lib/money";

export default function BooksPage() {
  const { entries, remove } = useLedger();
  const known = entries.filter((row) => row.profit !== null);
  const spent = entries.reduce((sum, row) => sum + row.cost, 0);
  const profit = known.reduce((sum, row) => sum + (row.profit ?? 0), 0);
  const unknownCount = entries.length - known.length;

  return (
    <IosScreen
      title="Books"
      subtitle="Cost, store, date, fees, sale, cash in. Profit is after those. Stays on this phone."
    >
      <Group
        header="Totals"
        footer={
          unknownCount
            ? `${unknownCount} with unknown sale — not in profit.`
            : "Profit is only counted when a stored sold exists."
        }
      >
        <div className="flex min-h-11 items-center justify-between px-4">
          <span className="text-[17px] text-black">Spent</span>
          <span className="text-[17px] tabular-nums text-black">{money(spent)}</span>
        </div>
        <Hairline inset={16} />
        <div className="flex min-h-11 items-center justify-between px-4">
          <span className="text-[17px] text-black">Profit after costs</span>
          <span className="text-[17px] tabular-nums text-black">
            {known.length ? money(profit) : "—"}
          </span>
        </div>
      </Group>

      {entries.length === 0 ? (
        <p className="px-8 py-12 text-center text-[15px] text-[#8E8E93]">
          No buys yet. Price it on Cash, then mark buy if leftover is real.
        </p>
      ) : (
        entries.map((row) => (
          <Group key={row.id} header={row.name}>
            <div className="flex min-h-11 items-center justify-between px-4">
              <span className="text-[17px] text-[#8E8E93]">Store</span>
              <span className="text-[17px] text-black">{row.store}</span>
            </div>
            <Hairline inset={16} />
            <div className="flex min-h-11 items-center justify-between px-4">
              <span className="text-[17px] text-[#8E8E93]">Date</span>
              <span className="text-[17px] tabular-nums text-black">{row.date}</span>
            </div>
            <Hairline inset={16} />
            <div className="flex min-h-11 items-center justify-between px-4">
              <span className="text-[17px] text-[#8E8E93]">Cost</span>
              <span className="text-[17px] tabular-nums text-black">{money(row.cost)}</span>
            </div>
            <Hairline inset={16} />
            <div className="flex min-h-11 items-center justify-between px-4">
              <span className="text-[17px] text-[#8E8E93]">Ship</span>
              <span className="text-[17px] tabular-nums text-black">{money(row.shipping)}</span>
            </div>
            <Hairline inset={16} />
            <div className="flex min-h-11 items-center justify-between px-4">
              <span className="text-[17px] text-[#8E8E93]">Fees</span>
              <span className="text-[17px] tabular-nums text-black">
                {row.fees === null ? "Unknown" : money(row.fees)}
              </span>
            </div>
            <Hairline inset={16} />
            <div className="flex min-h-11 items-center justify-between px-4">
              <span className="text-[17px] text-[#8E8E93]">Sale</span>
              <span className="text-[17px] tabular-nums text-black">
                {row.sale === null ? "Unknown" : money(row.sale)}
              </span>
            </div>
            <Hairline inset={16} />
            <div className="flex min-h-11 items-center justify-between px-4">
              <span className="text-[17px] text-[#8E8E93]">Cash in</span>
              <span className="text-[17px] tabular-nums text-black">
                {row.cashIn === null ? "Unknown" : money(row.cashIn)}
              </span>
            </div>
            <Hairline inset={16} />
            <div className="flex min-h-12 items-center justify-between px-4">
              <span className="text-[17px] text-black">Profit</span>
              <span className="text-[17px] font-semibold tabular-nums text-black">
                {row.profit === null ? "Unknown" : money(row.profit)}
              </span>
            </div>
            <Hairline inset={16} />
            <button
              type="button"
              onClick={() => remove(row.id)}
              className="flex min-h-11 w-full items-center px-4 text-[17px] text-[#FF3B30]"
            >
              Remove
            </button>
          </Group>
        ))
      )}
    </IosScreen>
  );
}
