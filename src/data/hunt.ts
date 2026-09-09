export type Category = "hot-wheels" | "matchbox" | "pokemon" | "goodwill";

export type Verdict = "buy" | "leave" | "if-seen" | "skip";

export type PriceKind = "peg" | "printed-msrp" | "tracked-average" | "shop-ask";

export type IdMark = "gold-flame" | "silver-flame" | "super-chase" | "stamp" | "label" | "print";

export type Price = {
  amount: string;
  kind: PriceKind;
  note?: string;
};

export type HuntLink = {
  label: string;
  href: string;
};

export type HuntItem = {
  id: string;
  name: string;
  category: Category;
  group: string;
  tonight: boolean;
  tonightRank?: number;
  compact?: boolean;
  verdict: Verdict;
  idRule: string;
  mark?: IdMark;
  paint?: string;
  series?: string;
  caseCode?: string;
  buyPrice?: Price;
  secondary?: Price;
  profit?: {
    amount: string;
    note: string;
  };
  soldUnknown?: boolean;
  sold?: {
    dollars: number;
    kind: "tracked-average";
    note: string;
  };
  shelfDollars?: number;
  buyLine?: string;
  saleLine?: string;
  where: string;
  links?: HuntLink[];
  notes?: string[];
};

export type ReleaseDrop = {
  id: string;
  date?: string;
  dateLabel: string;
  title: string;
  blurb: string;
  where: string;
  products: string[];
  links?: HuntLink[];
};

export const AS_OF = "early September 2026";
export const AS_OF_SHORT = "Sep 2026";
export const FEE_NOTE = "gross before eBay fees (~13%) and shipping";

export const PRICE_KIND_LABEL: Record<PriceKind, string> = {
  peg: "shelf",
  "printed-msrp": "printed MSRP",
  "tracked-average": "tracked average",
  "shop-ask": "shop ask",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  "hot-wheels": "Hot Wheels",
  matchbox: "Matchbox",
  pokemon: "Pokémon",
  goodwill: "Goodwill",
};

export const VERDICT_LABEL: Record<Verdict, string> = {
  buy: "BUY",
  leave: "LEAVE IT",
  "if-seen": "IF SEEN",
  skip: "SKIP",
};

const PEG: Price = {
  amount: "about $1",
  kind: "peg",
  note: "same as a regular mainline",
};

const HW_WHERE = "Walmart, Target, grocery toy aisle";
const SUPER_ID =
  "Gold flame on the card + Spectraflame paint + rubber Real Riders + tiny TH on the car";
const TH_ID = "Silver flame on the card + plastic wheels = regular Treasure Hunt";
const CHASE_ID =
  "Yellow SUPER CHASE bar on the card, rubber tires, SC on the car";
