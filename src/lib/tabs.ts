export type TabId = "finds" | "cash" | "books";
export type AisleId = "cars" | "sports";

export const TABS: { id: TabId; label: string }[] = [
  { id: "finds", label: "Finds" },
  { id: "cash", label: "Cash" },
  { id: "books", label: "Books" },
];

export function routeFromHash(): { tab: TabId; aisle: AisleId } {
  if (typeof window === "undefined") return { tab: "finds", aisle: "cars" };
  const value = window.location.hash.replace("#", "");
  if (value === "cash" || value === "books") {
    return { tab: value, aisle: "cars" };
  }
  if (value === "sports") return { tab: "finds", aisle: "sports" };
  return { tab: "finds", aisle: "cars" };
}

export function tabFromHash(): TabId {
  return routeFromHash().tab;
}
