"use client";

import { useLedger } from "@/lib/ledger";
import { money } from "@/lib/money";

export default function BooksPage() {
  const { entries, remove } = useLedger();
  const known = entries.filter((row) => row.profit !== null);
  const spent = entries.reduce((sum, row) => sum + row.cost, 0);
  const profit = known.reduce((sum, row) => sum + (row.profit ?? 0), 0);
  const unknownCount = entries.length - known.length;

  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0c0d10] px-4 pt-4 pb-3">
        <p className="text-[12px] font-semibold tracking-[0.18em] text-amber-300 uppercase">
          Books
        </p>
        <h1 className="mt-1 text-[28px] leading-none font-bold tracking-tight">Ledger</h1>
        <p className="mt-2 text-[14px] text-zinc-400">
          Cost, store, date, fees, sale, cash in. Profit is after those. Stays on this phone.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <p className="rounded-xl bg-zinc-900 px-3 py-2 ring-1 ring-white/10">
            <span className="block text-[11px] tracking-wide text-zinc-500 uppercase">Spent</span>
            <span className="text-[20px] font-bold tabular-nums">{money(spent)}</span>
          </p>
          <p className="rounded-xl bg-zinc-900 px-3 py-2 ring-1 ring-white/10">
            <span className="block text-[11px] tracking-wide text-zinc-500 uppercase">
              Profit after costs
            </span>
            <span className="text-[20px] font-bold tabular-nums text-emerald-300">
              {known.length ? money(profit) : "—"}
            </span>
          </p>
        </div>
        {unknownCount ? (
          <p className="mt-2 text-[13px] text-zinc-500">
            {unknownCount} row{unknownCount === 1 ? "" : "s"} with unknown sale — not in profit.
          </p>
        ) : null}
      </header>

      <div className="space-y-3 px-4 pt-4">
        {entries.length === 0 ? (
          <p className="rounded-2xl bg-zinc-900 px-4 py-8 text-center text-[15px] text-zinc-400">
            No buys yet. Price it on Cash, then mark buy if leftover is real.
          </p>
        ) : (
          entries.map((row) => (
            <article key={row.id} className="rounded-2xl bg-card p-4 ring-1 ring-white/10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[17px] font-semibold">{row.name}</h2>
                  <p className="text-[13px] text-zinc-400">
                    {row.store} · {row.date}
                  </p>
                </div>
                <p
                  className={
                    row.profit === null
                      ? "text-[15px] font-semibold text-zinc-400"
                      : "text-[18px] font-bold tabular-nums text-emerald-300"
                  }
                >
                  {row.profit === null ? "unknown" : money(row.profit)}
                </p>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[14px]">
                <div className="flex justify-between gap-2">
                  <dt className="text-zinc-500">Cost</dt>
                  <dd className="tabular-nums">{money(row.cost)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-zinc-500">Ship</dt>
                  <dd className="tabular-nums">{money(row.shipping)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-zinc-500">Fees</dt>
                  <dd className="tabular-nums">{row.fees === null ? "unknown" : money(row.fees)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-zinc-500">Sale</dt>
                  <dd className="tabular-nums">{row.sale === null ? "unknown" : money(row.sale)}</dd>
                </div>
                <div className="flex justify-between gap-2 col-span-2 border-t border-white/10 pt-1">
                  <dt className="text-zinc-500">Cash in after fees</dt>
                  <dd className="tabular-nums font-semibold">
                    {row.cashIn === null ? "unknown" : money(row.cashIn)}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => remove(row.id)}
                className="mt-3 min-h-11 text-[14px] font-semibold text-rose-300"
              >
                Remove
              </button>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
