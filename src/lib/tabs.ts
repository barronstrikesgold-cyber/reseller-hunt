import type { AisleId } from "./item";

export type { AisleId };
export type TabId = "finds" | "cash" | "books";
export type FindsView = "home" | AisleId;

export const TABS: { id: TabId; label: string }[] = [
  { id: "finds", label: "Finds" },
  { id: "cash", label: "Cash" },
  { id: "books", label: "Books" },
];

export const AISLES: {
  id: AisleId;
  title: string;
  sub: string;
}[] = [
  {
    id: "cars",
    title: "Cars",
    sub: "Hot Wheels Super, TH, Matchbox Super Chase",
  },
  {
    id: "sports",
    title: "Sports",
    sub: "Hang-tab, blaster, value, mega only",
  },
  {
    id: "sneakers",
    title: "Sneakers",
    sub: "Clean pair, size tag on, sole not crushed",
  },
  {
    id: "tech",
    title: "Tech",
    sub: "Apple, Switch, Sony or Bose, cameras that power on",
  },
  {
    id: "streetwear",
    title: "Streetwear",
    sub: "Tag in, not an obvious fake",
  },
];

const AISLE_IDS: AisleId[] = [
  "cars",
  "sports",
  "sneakers",
  "tech",
  "streetwear",
];

export function aisleTitle(id: AisleId) {
  return AISLES.find((row) => row.id === id)?.title ?? id;
}

export function routeFromHash(): { tab: TabId; view: FindsView } {
  if (typeof window === "undefined") return { tab: "finds", view: "home" };
  const value = window.location.hash.replace("#", "");
  if (value === "cash" || value === "books") {
    return { tab: value, view: "home" };
  }
  if ((AISLE_IDS as string[]).includes(value)) {
    return { tab: "finds", view: value as AisleId };
  }
  return { tab: "finds", view: "home" };
}

export function tabFromHash(): TabId {
  return routeFromHash().tab;
}
