'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { BookMarked, Camera, DollarSign, Search } from "lucide-react";
import { BookEntry, loadBooks, saveBooks } from "@/lib/books";
import {
  CARS,
  FINDS,
  FindItem,
  cashLeft,
  isBuy,
  matchFinds,
  packTypeLabel,
  saleLine,
} from "@/lib/finds";
import { SPORT_GROUPS } from "@/lib/sports";
import { AisleId, TabId, TABS, routeFromHash } from "@/lib/tabs";
import { cn } from "@/lib/utils";

const CAR_GROUPS: FindItem["group"][] = [
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
  const [aisle, setAisle] = useState<AisleId>("cars");
  const [query, setQuery] = useState("");
  const [scanName, setScanName] = useState("");
  const [scanPreview, setScanPreview] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState(FINDS[0].id);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [shelfInput, setShelfInput] = useState("1.00");
  const [shippingInput, setShippingInput] = useState("5.00");
  const [books, setBooks] = useState<BookEntry[]>([]);
  const [bookName, setBookName] = useState("");
  const [bookCost, setBookCost] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookError, setBookError] = useState("");
  const cameraRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const route = routeFromHash();
    setTab(route.tab);
    setAisle(route.aisle);
    setBooks(loadBooks());
    setBookDate(new Date().toISOString().slice(0, 10));
    const onHash = () => {
      const next = routeFromHash();
      setTab(next.tab);
      if (next.tab === "finds") setAisle(next.aisle);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function go(next: TabId, nextAisle: AisleId = aisle) {
    setTab(next);
    setReviewId(null);
    if (next === "finds") {
      setAisle(nextAisle);
      window.location.hash = nextAisle === "sports" ? "sports" : "finds";
      return;
    }
    window.location.hash = next;
  }

  function setFindsAisle(next: AisleId) {
    setAisle(next);
    window.location.hash = next === "sports" ? "sports" : "finds";
  }

  const selected = FINDS.find((item) => item.id === selectedId) ?? FINDS[0];
  const reviewing = FINDS.find((item) => item.id === reviewId) ?? null;
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

  function openReview(item: FindItem) {
    setSelectedId(item.id);
    setShelfInput(item.shelf.toFixed(2));
    setReviewId(item.id);
  }

  function openCash(item: FindItem) {
    setSelectedId(item.id);
    setShelfInput(item.shelf.toFixed(2));
    setReviewId(null);
    go("cash");
  }

  function onCamera(file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setScanPreview(url);
    setScanName("");
  }

  function addBook() {
    const cost = Number.parseFloat(bookCost.replace(/[^0-9.]/g, ""));
    const name = bookName.trim();
    if (!name || !Number.isFinite(cost) || cost < 0 || !bookDate) {
      setBookError("Name, cost, and date are required.");
      return;
    }
    const next = [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name,
        cost,
        date: bookDate,
      },
      ...books,
    ];
    setBooks(next);
    saveBooks(next);
    setBookName("");
    setBookCost("");
    setBookError("");
  }

  function removeBook(id: string) {
    const next = books.filter((row) => row.id !== id);
    setBooks(next);
    saveBooks(next);
  }

  return (
    <div className={cn("ios-shell", reviewing && "is-reviewing")}>
      {reviewing ? (
        <ReviewScreen
          item={reviewing}
          shipping={Number.isFinite(shipping) ? shipping : 5}
          onBack={() => setReviewId(null)}
          onBuy={() => openCash(reviewing)}
          onPass={() => setReviewId(null)}
        />
      ) : (
        <>
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
              <p className="ios-rule">
                Saved buys stay on this phone after reload.
              </p>
            )}
          </header>

          <main className="ios-main">
            {tab === "finds" ? (
              <FindsTab
                aisle={aisle}
                setAisle={setFindsAisle}
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
                onReview={openReview}
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
                bookError={bookError}
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
                  onClick={() => go(item.id, aisle)}
                >
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </>
      )}
    </div>
  );
}

function FindsTab({
  aisle,
  setAisle,
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
  onReview,
}: {
  aisle: AisleId;
  setAisle: (value: AisleId) => void;
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
  onReview: (item: FindItem) => void;
}) {
  const source = aisle === "sports" ? SPORT_GROUPS : CAR_GROUPS;
  const pool = aisle === "sports" ? FINDS.filter((item) => item.aisle === "sports") : CARS;
  const grouped = source
    .map((group) => ({
      group,
      label: pool.find((item) => item.group === group)?.groupLabel ?? "",
      items: pool.filter((item) => item.group === group),
    }))
    .filter((block) => block.items.length > 0);

  return (
    <>
      <div className="ios-segment" role="tablist" aria-label="Aisle">
        <button
          type="button"
          role="tab"
          aria-selected={aisle === "cars"}
          className={cn(aisle === "cars" && "is-active")}
          onClick={() => setAisle("cars")}
        >
          Cars
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={aisle === "sports"}
          className={cn(aisle === "sports" && "is-active")}
          onClick={() => setAisle("sports")}
        >
          Sports
        </button>
      </div>

      <section className="ios-search-row">
        <label className="ios-search">
          <Search aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Card or pack name"
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
              <p className="ios-row-title">Type the name on the pack</p>
              <input
                value={scanName}
                onChange={(event) => setScanName(event.target.value)}
                placeholder="Exact name on the pack"
              />
              {scanName.trim() ? (
                scanHits.length ? (
                  scanHits.map((item) => (
                    <MatchLine key={item.id} item={item} onReview={onReview} />
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

      {(query.trim()
        ? [{ group: "hits", label: "On the list", items: hits }]
        : grouped
      ).map((block) =>
        block.items.length ? (
          <section key={block.group} className="ios-group">
            <p className="ios-group-title">{block.label}</p>
            <div className="ios-card">
              {block.items.map((item, index) =>
                item.aisle === "sports" ? (
                  <SportRow
                    key={item.id}
                    item={item}
                    last={index === block.items.length - 1}
                    onReview={onReview}
                  />
                ) : (
                  <FindRow
                    key={item.id}
                    item={item}
                    last={index === block.items.length - 1}
                    onReview={onReview}
                  />
                ),
              )}
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
  onReview,
}: {
  item: FindItem;
  last: boolean;
  onReview: (item: FindItem) => void;
}) {
  return (
    <button
      type="button"
      className={cn("ios-find-row", !last && "has-line")}
      onClick={() => onReview(item)}
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

function SportRow({
  item,
  last,
  onReview,
}: {
  item: FindItem;
  last: boolean;
  onReview: (item: FindItem) => void;
}) {
  return (
    <button
      type="button"
      className={cn("ios-find-row ios-sport-row", !last && "has-line")}
      onClick={() => onReview(item)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.photo} alt={item.photoAlt} className="ios-thumb" />
      <span className="ios-find-copy">
        <span className="ios-row-title">{item.name}</span>
        <span className="ios-pass-kicker">Pass</span>
        <span className="ios-shelf">{item.shelfLabel}</span>
      </span>
      <span className="ios-chevron" aria-hidden="true">
        〉
      </span>
    </button>
  );
}

function MatchLine({
  item,
  onReview,
}: {
  item: FindItem;
  onReview: (item: FindItem) => void;
}) {
  return (
    <button type="button" className="ios-match" onClick={() => onReview(item)}>
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
        <p>
          If it is not on this list, leave it. That is how they stop wasting
          money.
        </p>
      </div>
    </section>
  );
}

function ReviewScreen({
  item,
  shipping,
  onBack,
  onBuy,
  onPass,
}: {
  item: FindItem;
  shipping: number;
  onBack: () => void;
  onBuy: () => void;
  onPass: () => void;
}) {
  const leftover = cashLeft(item, item.shelf, shipping);
  const buy = isBuy(item, leftover);
  return (
    <section className="ios-review" aria-label="Product review">
      <header className="ios-review-top">
        <button type="button" className="ios-back" onClick={onBack}>
          ‹ Finds
        </button>
        <h1 className="ios-review-title">{item.name}</h1>
      </header>
      <div className="ios-review-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.photo} alt={item.photoAlt} />
      </div>
      <div className="ios-review-copy">
        <p className="ios-rule">If it is not on this list, leave it.</p>
        <p className="ios-review-meta">
          {item.sport ?? "Hot Wheels / retail"}
          {" · "}
          {packTypeLabel(item)}
        </p>
        {item.lookFor ? <p className="ios-review-look">{item.lookFor}</p> : null}
        {item.photoNote ? <p className="ios-footnote">{item.photoNote}</p> : null}
        <p className="ios-shelf">{item.shelfLabel}</p>
        <p className="ios-sale">{saleLine(item)}</p>
        {item.note ? <p className="ios-review-note">{item.note}</p> : null}
      </div>
      <div className="ios-review-bar">
        {buy ? (
          <button type="button" className="ios-review-cta is-buy" onClick={onBuy}>
            Buy
          </button>
        ) : (
          <button type="button" className="ios-review-cta is-pass" onClick={onPass}>
            Pass
          </button>
        )}
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
            <span>Car or pack</span>
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
            <input
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
            <input
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
  bookError,
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
  bookError: string;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  return (
    <>
      <section className="ios-group">
        <p className="ios-group-title">Log a buy</p>
        <form
          className="ios-card ios-form"
          onSubmit={(event) => {
            event.preventDefault();
            onAdd();
          }}
        >
          <label className="ios-field">
            <span>Name</span>
            <input
              value={bookName}
              onChange={(event) => setBookName(event.target.value)}
              placeholder="Gold ’70 AAR Cuda Super"
              autoComplete="off"
            />
          </label>
          <label className="ios-field">
            <span>Cost</span>
            <input
              inputMode="decimal"
              value={bookCost}
              onChange={(event) => setBookCost(event.target.value)}
              placeholder="1.00"
            />
          </label>
          <label className="ios-field">
            <span>Date</span>
            <input
              type="date"
              value={bookDate}
              onChange={(event) => setBookDate(event.target.value)}
            />
          </label>
          {bookError ? <p className="ios-book-error">{bookError}</p> : null}
          <button className="ios-save" type="submit">
            Save buy
          </button>
        </form>
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
