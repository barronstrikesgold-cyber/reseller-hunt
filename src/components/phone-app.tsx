"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BookMarked, Camera, DollarSign, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookEntry, loadBooks, saveBooks } from "@/lib/books";
import {
  FINDS,
  FindItem,
  cashLeft,
  matchFinds,
  saleLine,
} from "@/lib/finds";
import { TabId, TABS, tabFromHash } from "@/lib/tabs";
import { cn } from "@/lib/utils";

const GROUPS: FindItem["group"][] = [
  "case",
  "supers",
  "open",
  "chase",
  "sept16",
];

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function PhoneApp() {
  const [tab, setTab] = useState<TabId>("finds");
  const [query, setQuery] = useState("");
  const [scanName, setScanName] = useState("");
  const [scanPreview, setScanPreview] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState(FINDS[0].id);
  const [shelfInput, setShelfInput] = useState("1.00");
  const [shippingInput, setShippingInput] = useState("5.00");
  const [books, setBooks] = useState<BookEntry[]>([]);
  const [bookName, setBookName] = useState("");
  const [bookCost, setBookCost] = useState("");
  const [bookDate, setBookDate] = useState("");
  const cameraRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTab(tabFromHash());
    setBooks(loadBooks());
    setBookDate(new Date().toISOString().slice(0, 10));
    const onHash = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function go(next: TabId) {
    setTab(next);
    window.location.hash = next;
  }

  const selected = FINDS.find((item) => item.id === selectedId) ?? FINDS[0];
  const shelf = Number.parseFloat(shelfInput);
  const shipping = Number.parseFloat(shippingInput);
  const leftover =
    Number.isFinite(shelf) && Number.isFinite(shipping)
      ? cashLeft(selected, shelf, shipping)
      : null;

  const searchActive = query.trim().length > 0;
  const searchHits = useMemo(() => matchFinds(query), [query]);
  const scanHits = useMemo(() => matchFinds(scanName), [scanName]);
  const showPass = searchActive && searchHits.length === 0;

  function openCash(item: FindItem) {
    setSelectedId(item.id);
    setShelfInput(item.shelf.toFixed(2));
    go("cash");
  }

  function onCamera(file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setScanPreview(url);
    setScanName("");
  }

  function addBook() {
    const cost = Number.parseFloat(bookCost);
    const name = bookName.trim();
    if (!name || !Number.isFinite(cost) || !bookDate) return;
    const next = [
      { id: crypto.randomUUID(), name, cost, date: bookDate },
      ...books,
    ];
    setBooks(next);
    saveBooks(next);
    setBookName("");
    setBookCost("");
  }

  function removeBook(id: string) {
    const next = books.filter((row) => row.id !== id);
    setBooks(next);
    saveBooks(next);
  }

  return (
    <div className="ios-shell">
      <header className="ios-header">
        <p className="ios-eyebrow">Aisle list</p>
        <h1 className="ios-large-title">
          {tab === "finds" ? "Finds" : tab === "cash" ? "Cash" : "Books"}
        </h1>
        {tab === "finds" ? (
          <p className="ios-rule">If it is not on this list, leave it.</p>
        ) : tab === "cash" ? (
          <p className="ios-rule">
            Buy only if leftover cash is real. Unknown is not a buy.
          </p>
        ) : (
          <p className="ios-rule">Saved buys stay on this phone after reload.</p>
        )}
      </header>

      <main className="ios-main">
        {tab === "finds" ? (
          <FindsTab
            query={query}
            setQuery={setQuery}
            showPass={showPass}
            hits={searchHits}
            scanName={scanName}
            setScanName={setScanName}
            scanPreview={scanPreview}
            scanHits={scanHits}
            cameraRef={cameraRef}
            onCamera={onCamera}
            onCash={openCash}
          />
        ) : null}
        {tab === "cash" ? (
          <CashTab
            selected={selected}
            setSelectedId={setSelectedId}
            shelfInput={shelfInput}
            setShelfInput={setShelfInput}
            shippingInput={shippingInput}
            setShippingInput={setShippingInput}
            leftover={leftover}
          />
        ) : null}
        {tab === "books" ? (
          <BooksTab
            books={books}
            bookName={bookName}
            setBookName={setBookName}
            bookCost={bookCost}
            setBookCost={setBookCost}
            bookDate={bookDate}
            setBookDate={setBookDate}
            onAdd={addBook}
            onRemove={removeBook}
          />
        ) : null}
      </main>

      <nav className="ios-tabbar" aria-label="Tabs">
        {TABS.map((item) => {
          const Icon =
            item.id === "finds"
              ? Search
              : item.id === "cash"
                ? DollarSign
                : BookMarked;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={cn("ios-tab", active && "is-active")}
              onClick={() => go(item.id)}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function FindsTab({
  query,
  setQuery,
  showPass,
  hits,
  scanName,
  setScanName,
  scanPreview,
  scanHits,
  cameraRef,
  onCamera,
  onCash,
}: {
  query: string;
  setQuery: (value: string) => void;
  showPass: boolean;
  hits: FindItem[];
  scanName: string;
  setScanName: (value: string) => void;
  scanPreview: string | null;
  scanHits: FindItem[];
  cameraRef: React.RefObject<HTMLInputElement | null>;
  onCamera: (file: File | undefined) => void;
  onCash: (item: FindItem) => void;
}) {
  const grouped = GROUPS.map((group) => ({
    group,
    label: FINDS.find((item) => item.group === group)?.groupLabel ?? "",
    items: FINDS.filter((item) => item.group === group),
  })).filter((block) => block.items.length > 0);

  return (
    <>
      <section className="ios-search-row">
        <label className="ios-search">
          <Search aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Card name"
            enterKeyHint="search"
            autoCapitalize="words"
          />
        </label>
        <button
          type="button"
          className="ios-camera"
          onClick={() => cameraRef.current?.click()}
          aria-label="Scan with camera"
        >
          <Camera aria-hidden="true" />
        </button>
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(event) => onCamera(event.target.files?.[0])}
        />
      </section>

      {scanPreview ? (
        <section className="ios-group">
          <p className="ios-group-title">Scan</p>
          <div className="ios-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={scanPreview} alt="Scan from camera" className="ios-scan-photo" />
            <div className="ios-row-stack">
              <p className="ios-row-title">Type the name on the card</p>
              <Input
                value={scanName}
                onChange={(event) => setScanName(event.target.value)}
                placeholder="Exact casting name"
              />
              {scanName.trim() ? (
                scanHits.length ? (
                  scanHits.map((item) => (
                    <MatchLine key={item.id} item={item} onCash={onCash} />
                  ))
                ) : (
                  <PassCard />
                )
              ) : (
                <p className="ios-footnote">
                  Camera does not guess. If the typed name is not on this list,
                  it is Pass.
                </p>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {showPass ? <PassCard /> : null}

      {(query.trim() ? [{ group: "hits", label: "On the list", items: hits }] : grouped).map(
        (block) =>
          block.items.length ? (
            <section key={block.group} className="ios-group">
              <p className="ios-group-title">{block.label}</p>
              <div className="ios-card">
                {block.items.map((item, index) => (
                  <FindRow
                    key={item.id}
                    item={item}
                    last={index === block.items.length - 1}
                    onCash={onCash}
                  />
                ))}
              </div>
            </section>
          ) : null,
      )}
    </>
  );
}

function FindRow({
  item,
  last,
  onCash,
}: {
  item: FindItem;
  last: boolean;
  onCash: (item: FindItem) => void;
}) {
  return (
    <button
      type="button"
      className={cn("ios-find-row", !last && "has-line")}
      onClick={() => onCash(item)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.photo} alt={item.photoAlt} className="ios-thumb" />
      <span className="ios-find-copy">
        <span className="ios-row-title">{item.name}</span>
        <span className="ios-row-sub">{item.detail}</span>
        <span className="ios-row-sub">{item.superColor}</span>
        <span className="ios-sale">{saleLine(item)}</span>
        <span className="ios-shelf">{item.shelfLabel}</span>
        {item.note ? <span className="ios-row-sub">{item.note}</span> : null}
      </span>
      <span className="ios-chevron" aria-hidden="true">
        〉
      </span>
    </button>
  );
}

function MatchLine({
  item,
  onCash,
}: {
  item: FindItem;
  onCash: (item: FindItem) => void;
}) {
  return (
    <button type="button" className="ios-match" onClick={() => onCash(item)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.photo} alt="" className="ios-thumb sm" />
      <span>
        <strong>{item.name}</strong>
        <em>On the list. {saleLine(item)}</em>
      </span>
    </button>
  );
}

function PassCard() {
  return (
    <section className="ios-group">
      <div className="ios-card ios-pass">
        <p className="ios-pass-kicker">Not on the list</p>
        <h2>Pass</h2>
        <p>If it is not on this list, leave it. That is how they stop wasting money.</p>
      </div>
    </section>
  );
}

function CashTab({
  selected,
  setSelectedId,
  shelfInput,
  setShelfInput,
  shippingInput,
  setShippingInput,
  leftover,
}: {
  selected: FindItem;
  setSelectedId: (id: string) => void;
  shelfInput: string;
  setShelfInput: (value: string) => void;
  shippingInput: string;
  setShippingInput: (value: string) => void;
  leftover: number | null;
}) {
  const hasSold = selected.sale.kind === "settled";
  const canBuy = leftover !== null && leftover > 0;
  const fees =
    selected.sale.kind === "settled" ? selected.sale.amount * 0.13 : null;

  return (
    <>
      <section className="ios-group">
        <p className="ios-group-title">Find</p>
        <div className="ios-card">
          <label className="ios-field">
            <span>Car or box</span>
            <select
              value={selected.id}
              onChange={(event) => {
                const next = FINDS.find((item) => item.id === event.target.value);
                setSelectedId(event.target.value);
                if (next) setShelfInput(next.shelf.toFixed(2));
              }}
            >
              {FINDS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <div className="ios-cash-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected.photo} alt={selected.photoAlt} />
            <p>
              {selected.superColor}
              <br />
              {saleLine(selected)}
            </p>
          </div>
        </div>
      </section>

      <section className="ios-group">
        <p className="ios-group-title">Math</p>
        <div className="ios-card">
          <label className="ios-field">
            <span>Shelf price</span>
            <Input
              inputMode="decimal"
              value={shelfInput}
              onChange={(event) => setShelfInput(event.target.value)}
            />
          </label>
          <label className="ios-field">
            <span>Fees · about 13%</span>
            <p className="ios-static">
              {fees === null ? "Unknown until a sold exists" : money(fees)}
            </p>
          </label>
          <label className="ios-field">
            <span>Shipping</span>
            <Input
              inputMode="decimal"
              value={shippingInput}
              onChange={(event) => setShippingInput(event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="ios-group">
        <p className="ios-group-title">Cash left</p>
        <div className={cn("ios-card ios-verdict", canBuy ? "is-buy" : "is-hold")}>
          <p className="ios-pass-kicker">{canBuy ? "Buy" : "Do not buy"}</p>
          <h2>
            {hasSold
              ? leftover === null
                ? "Unknown"
                : money(leftover)
              : "Unknown"}
          </h2>
          <p>
            {hasSold
              ? leftover === null
                ? "Enter shelf and shipping."
                : canBuy
                  ? "Leftover cash is real after about 13% fees and shipping."
                  : "Leftover is not a real profit. Leave it."
              : "No settled sale is stored. Cash left stays unknown. Never use an asking price."}
          </p>
        </div>
      </section>
    </>
  );
}

function BooksTab({
  books,
  bookName,
  setBookName,
  bookCost,
  setBookCost,
  bookDate,
  setBookDate,
  onAdd,
  onRemove,
}: {
  books: BookEntry[];
  bookName: string;
  setBookName: (value: string) => void;
  bookCost: string;
  setBookCost: (value: string) => void;
  bookDate: string;
  setBookDate: (value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  return (
    <>
      <section className="ios-group">
        <p className="ios-group-title">Log a buy</p>
        <div className="ios-card ios-form">
          <label className="ios-field">
            <span>Name</span>
            <Input
              value={bookName}
              onChange={(event) => setBookName(event.target.value)}
              placeholder="Gold ’70 AAR Cuda Super"
            />
          </label>
          <label className="ios-field">
            <span>Cost</span>
            <Input
              inputMode="decimal"
              value={bookCost}
              onChange={(event) => setBookCost(event.target.value)}
              placeholder="1.00"
            />
          </label>
          <label className="ios-field">
            <span>Date</span>
            <Input
              type="date"
              value={bookDate}
              onChange={(event) => setBookDate(event.target.value)}
            />
          </label>
          <Button className="ios-save" type="button" onClick={onAdd}>
            Save buy
          </Button>
        </div>
      </section>

      <section className="ios-group">
        <p className="ios-group-title">
          {books.length ? "On the books" : "Empty"}
        </p>
        <div className="ios-card">
          {books.length === 0 ? (
            <p className="ios-empty">No buys saved yet.</p>
          ) : (
            books.map((row, index) => (
              <div
                key={row.id}
                className={cn("ios-book-row", index < books.length - 1 && "has-line")}
              >
                <div>
                  <p className="ios-row-title">{row.name}</p>
                  <p className="ios-row-sub">
                    {row.date} · {money(row.cost)}
                  </p>
                </div>
                <button type="button" onClick={() => onRemove(row.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
