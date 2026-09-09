export type TabId = "finds" | "cash" | "books";

export const TABS: { id: TabId; label: string }[] = [
  { id: "finds", label: "Finds" },
  { id: "cash", label: "Cash" },
  { id: "books", label: "Books" },
];

export function tabFromHash(): TabId {
  if (typeof window === "undefined") return "finds";
  const value = window.location.hash.replace("#", "");
  if (value === "cash" || value === "books" || value === "finds") return value;
  return "finds";
}
