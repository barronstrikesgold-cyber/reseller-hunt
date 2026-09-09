"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ITEMS } from "@/data/hunt";

const STORAGE_KEY = "reseller-hunt-checks-v1";

type ChecksState = Record<string, true>;

type ChecksContextValue = {
  checked: ChecksState;
  isChecked: (id: string) => boolean;
  toggle: (id: string, next?: boolean) => void;
  countFor: (ids: string[]) => { done: number; total: number };
};

const ChecksContext = createContext<ChecksContextValue | null>(null);

function read(): ChecksState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    const out: ChecksState = {};
    if (Array.isArray(parsed)) {
      for (const id of parsed) {
        if (typeof id === "string") out[id] = true;
      }
    } else if (parsed && typeof parsed === "object") {
      for (const [key, value] of Object.entries(parsed)) {
        if (value) out[key] = true;
      }
    }
    return out;
  } catch {
    return {};
  }
}

function persist(state: ChecksState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.keys(state)));
}

export function ChecksProvider({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState<ChecksState>({});

  useEffect(() => {
    // Hydrate from localStorage after mount so SSR markup stays empty.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is a client store
    setChecked(read());
  }, []);

  const toggle = useCallback((id: string, next?: boolean) => {
    setChecked((prev) => {
      const shouldCheck = typeof next === "boolean" ? next : !prev[id];
      const out: ChecksState = { ...prev };
      if (shouldCheck) out[id] = true;
      else delete out[id];
      persist(out);
      return out;
    });
  }, []);

  const value = useMemo<ChecksContextValue>(
    () => ({
      checked,
      isChecked: (id) => Boolean(checked[id]),
      toggle,
      countFor: (ids) => ({
        done: ids.filter((id) => checked[id]).length,
        total: ids.length,
      }),
    }),
    [checked, toggle]
  );

  return <ChecksContext.Provider value={value}>{children}</ChecksContext.Provider>;
}

export function useChecks() {
  const ctx = useContext(ChecksContext);
  if (!ctx) throw new Error("useChecks must be used inside ChecksProvider");
  return ctx;
}

export function useItemCount(ids?: string[]) {
  const { countFor } = useChecks();
  return countFor(ids ?? ITEMS.map((item) => item.id));
}
