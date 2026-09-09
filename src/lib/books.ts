export type BookEntry = {
  id: string;
  name: string;
  cost: number;
  date: string;
};

const KEY = "finds-books-v1";

export function loadBooks(): BookEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BookEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row) =>
        typeof row.id === "string" &&
        typeof row.name === "string" &&
        typeof row.cost === "number" &&
        typeof row.date === "string",
    );
  } catch {
    return [];
  }
}

export function saveBooks(entries: BookEntry[]) {
  window.localStorage.setItem(KEY, JSON.stringify(entries));
}
