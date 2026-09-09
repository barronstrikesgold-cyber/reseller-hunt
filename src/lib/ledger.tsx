"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "reseller-hunt-ledger-v1";
const SHIP_KEY = "reseller-hunt-ship-v1";

export type LedgerEntry = {
  id: string;
  itemId?: string;
  name: string;
  cost: number;
  store: string;
  date: string;
  shipping: number;
  fees: number | null;
  sale: number | null;
  cashIn: number | null;
  profit: number | null;
};

type LedgerContextValue = {
  entries: LedgerEntry[];
  shippingDefault: number;
  setShippingDefault: (n: number) => void;
  addBuy: (entry: Omit<LedgerEntry, "id">) => void;
  remove: (id: string) => void;
};

const LedgerContext = createContext<LedgerContextValue | null>(null);

function readList(): LedgerEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((row) => row && typeof row.id === "string" && typeof row.name === "string");
  } catch {
    return [];
  }
}

function readShip(): number {
  try {
    const raw = window.localStorage.getItem(SHIP_KEY);
    const n = raw ? Number.parseFloat(raw) : 5;
    return Number.isFinite(n) && n >= 0 ? n : 5;
  } catch {
    return 5;
  }
}

export function LedgerProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [shippingDefault, setShippingState] = useState(5);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage hydrate
    setEntries(readList());
    setShippingState(readShip());
  }, []);

  const setShippingDefault = useCallback((n: number) => {
    setShippingState(n);
    window.localStorage.setItem(SHIP_KEY, String(n));
  }, []);

  const addBuy = useCallback((entry: Omit<LedgerEntry, "id">) => {
    setEntries((prev) => {
      const next = [{ ...entry, id: `${Date.now()}-${Math.random().toString(16).slice(2)}` }, ...prev];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((row) => row.id !== id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ entries, shippingDefault, setShippingDefault, addBuy, remove }),
    [entries, shippingDefault, setShippingDefault, addBuy, remove]
  );

  return <LedgerContext.Provider value={value}>{children}</LedgerContext.Provider>;
}

export function useLedger() {
  const ctx = useContext(LedgerContext);
  if (!ctx) throw new Error("useLedger must be used inside LedgerProvider");
  return ctx;
}
