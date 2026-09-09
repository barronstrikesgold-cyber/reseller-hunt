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
  where: string;
  links?: HuntLink[];
  notes?: string[];
  photo?: "cuda" | "skyline" | "firebird" | "f40" | "chase" | "swatch";
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

export const ITEMS: HuntItem[] = [
  {
    id: "hw-cuda-sth",
    name: "'70 Plymouth AAR Cuda",
    category: "hot-wheels",
    group: "Just landed · case P",
    tonight: true,
    tonightRank: 1,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#c9a227",
    series: "HW TORQUE",
    caseCode: "P",
    buyPrice: PEG,
    soldUnknown: true,
    shelfDollars: 1,
    where: HW_WHERE,
    photo: "cuda",
    notes: [
      "Gold Spectraflame Super. Card numbers in the 240s/250s means this just landed.",
      "Regular yellow Cuda next to it: leave it.",
      "No checkout link for a Super.",
      "Factory-wrecked card is still a shelf buy. List as damaged; expect well under clean.",
    ],
  },
  {
    id: "hw-cuda-yellow",
    name: "'70 Plymouth AAR Cuda (yellow regular)",
    category: "hot-wheels",
    group: "Leave it",
    tonight: false,
    verdict: "leave",
    idRule: "Flat yellow paint, no gold flame, plastic wheels. Sitting next to the Super.",
    mark: "silver-flame",
    paint: "#e8d44d",
    series: "HW TORQUE",
    caseCode: "P",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["The Super is gold Spectraflame. This yellow one is the decoy."],
  },
  {
    id: "hw-skyline-th",
    name: "Nissan Skyline HT 2000GT-X",
    category: "hot-wheels",
    group: "Just landed · case P",
    tonight: true,
    tonightRank: 2,
    verdict: "buy",
    idRule: `${TH_ID}. Black car. SCREEN TIME series stripe.`,
    mark: "silver-flame",
    paint: "#141414",
    series: "SCREEN TIME",
    caseCode: "P",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    photo: "skyline",
    notes: [
      "Only regular Treasure Hunt worth a special stop right now.",
      "Black coupe, SCREEN TIME / GRAND ÉCRAN on the card.",
    ],
  },
  {
    id: "hw-firebird-sth",
    name: "'67 Firebird 400",
    category: "hot-wheels",
    group: "Just landed · case Q",
    tonight: true,
    tonightRank: 3,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#1b6f78",
    series: "COOL CLASSICS",
    caseCode: "Q",
    buyPrice: PEG,
    soldUnknown: true,
    secondary: {
      amount: "as high as $143",
      kind: "shop-ask",
      note: "August writeup. Ask, not a sale.",
    },
    where: HW_WHERE,
    photo: "firebird",
    notes: [
      "Blue Spectraflame. Last Super of 2026. Not in every store.",
      "Case Q regular TH Gazella GT: skip.",
    ],
  },
  {
    id: "hw-porsche-sth",
    name: "Porsche 911 Carrera RS 2.7",
    category: "hot-wheels",
    group: "Leftover supers · M / N",
    tonight: true,
    tonightRank: 4,
    verdict: "if-seen",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#6a4328",
    caseCode: "M",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Brown Super. Case M leftover. Buy if seen."],
  },
  {
    id: "hw-ram-sth",
    name: "'23 Ram 1500",
    category: "hot-wheels",
    group: "Leftover supers · M / N",
    tonight: true,
    tonightRank: 5,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#5c3d78",
    caseCode: "N",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Purple Super. Case N leftover. Buy at about $1, don't expect much."],
  },
  {
    id: "hw-f40-sth",
    name: "Ferrari F40 Competizione",
    category: "hot-wheels",
    group: "Leftover supers · tracked",
    tonight: true,
    tonightRank: 6,
    verdict: "buy",
    idRule: `${SUPER_ID}. Tiny TH on the lower side panel.`,
    mark: "gold-flame",
    paint: "#3a3a3d",
    caseCode: "C",
    buyPrice: PEG,
    secondary: {
      amount: "$122",
      kind: "tracked-average",
      note: "August, across 8 sales. Down from the $140s in spring.",
    },
    sold: {
      dollars: 122,
      kind: "tracked-average",
      note: "August tracked average across 8 sales. Down from the $140s in spring.",
    },
    shelfDollars: 1,
    where: HW_WHERE,
    photo: "f40",
    notes: ["Black/gray Spectraflame. A–L cases are picked over, still buy any Super at about $1."],
  },
  {
    id: "hw-civic-sth",
    name: "Honda Civic Custom",
    category: "hot-wheels",
    group: "Leftover supers · tracked",
    tonight: true,
    tonightRank: 7,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#12827a",
    caseCode: "F",
    buyPrice: PEG,
    secondary: {
      amount: "about $73",
      kind: "tracked-average",
      note: "one tracker",
    },
    sold: {
      dollars: 73,
      kind: "tracked-average",
      note: "About $73 on one tracker.",
    },
    shelfDollars: 1,
    where: HW_WHERE,
  },
  {
    id: "hw-elise-sth",
    name: "Lotus Sport Elise",
    category: "hot-wheels",
    group: "Leftover supers · tracked",
    tonight: true,
    tonightRank: 8,
    verdict: "buy",
    idRule: `${SUPER_ID}. Card says Lotus Sport Elise, not Elite.`,
    mark: "gold-flame",
    paint: "#e85d04",
    caseCode: "H",
    buyPrice: PEG,
    secondary: {
      amount: "closer to $50",
      kind: "tracked-average",
      note: "not the earlier $67",
    },
    sold: {
      dollars: 50,
      kind: "tracked-average",
      note: "Closer to $50 now, not the earlier $67.",
    },
    shelfDollars: 1,
    where: HW_WHERE,
  },
  {
    id: "hw-mustang-gtd-sth",
    name: "Ford Mustang GTD",
    category: "hot-wheels",
    group: "Leftover supers · tracked",
    tonight: true,
    tonightRank: 9,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#1d4e89",
    caseCode: "B",
    buyPrice: PEG,
    secondary: {
      amount: "about $53",
      kind: "tracked-average",
      note: "May tracked average",
    },
    sold: {
      dollars: 53,
      kind: "tracked-average",
      note: "May tracked average about $53.",
    },
    shelfDollars: 1,
    where: HW_WHERE,
  },
  {
    id: "hw-impala-sth",
    name: "'64 Impala",
    category: "hot-wheels",
    group: "Leftover supers · tracked",
    tonight: true,
    tonightRank: 10,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#2a9d8f",
    caseCode: "D",
    buyPrice: PEG,
    secondary: {
      amount: "about $51",
      kind: "tracked-average",
    },
    sold: {
      dollars: 51,
      kind: "tracked-average",
      note: "About $51 tracked average.",
    },
    shelfDollars: 1,
    where: HW_WHERE,
  },
  {
    id: "hw-drift-ender-sth",
    name: "Drift-Ender",
    category: "hot-wheels",
    group: "Slower supers · still a shelf buy",
    tonight: true,
    tonightRank: 20,
    compact: true,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#c1121f",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Red. Slower flip. Still grab at $1 if it is a Super."],
  },
  {
    id: "hw-sierra-sth",
    name: "'87 Sierra Cosworth",
    category: "hot-wheels",
    group: "Slower supers · still a shelf buy",
    tonight: true,
    tonightRank: 21,
    compact: true,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#e91e8c",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Pink. Slower flip. Still grab at $1 if it is a Super."],
  },
  {
    id: "hw-otto-sth",
    name: "Custom Otto",
    category: "hot-wheels",
    group: "Slower supers · still a shelf buy",
    tonight: true,
    tonightRank: 22,
    compact: true,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#3a7bd5",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Blue. Slower flip. Still grab at $1 if it is a Super."],
  },
  {
    id: "hw-impreza-sth",
    name: "Subaru Impreza",
    category: "hot-wheels",
    group: "Slower supers · still a shelf buy",
    tonight: true,
    tonightRank: 23,
    compact: true,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#2c5aa0",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Blue. Slower flip. Still grab at $1 if it is a Super."],
  },
  {
    id: "hw-supra-sth",
    name: "Tooned '94 Supra",
    category: "hot-wheels",
    group: "Slower supers · still a shelf buy",
    tonight: true,
    tonightRank: 24,
    compact: true,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#111111",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Black tooned. Slower flip. Still grab at $1 if it is a Super."],
  },
  {
    id: "hw-maxima-sth",
    name: "Nissan Maxima",
    category: "hot-wheels",
    group: "Slower supers · still a shelf buy",
    tonight: true,
    tonightRank: 25,
    compact: true,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    paint: "#161616",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Black. Slower flip. Still grab at $1 if it is a Super."],
  },
  {
    id: "hw-gnx-th",
    name: "'87 Buick GNX",
    category: "hot-wheels",
    group: "Regular TH · only if in front",
    tonight: false,
    verdict: "if-seen",
    idRule: TH_ID,
    mark: "silver-flame",
    paint: "#4a2c6a",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Purple. Regular TH only if it is right in front of you."],
  },
  {
    id: "hw-viper-th",
    name: "'92 Viper",
    category: "hot-wheels",
    group: "Regular TH · only if in front",
    tonight: false,
    verdict: "if-seen",
    idRule: TH_ID,
    mark: "silver-flame",
    paint: "#ececec",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["White. Regular TH only if it is right in front of you."],
  },
  {
    id: "hw-ford-gt-th",
    name: "2016 Ford GT Race",
    category: "hot-wheels",
    group: "Regular TH · only if in front",
    tonight: false,
    verdict: "if-seen",
    idRule: TH_ID,
    mark: "silver-flame",
    paint: "#f4d35e",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Yellow. Regular TH only if it is right in front of you."],
  },
  {
    id: "hw-hot-wheengs",
    name: "Hot Wheengs",
    category: "hot-wheels",
    group: "Skip fantasy regulars",
    tonight: false,
    verdict: "skip",
    idRule: "Fantasy mainline / regular TH. No gold flame, no Spectraflame.",
    paint: "#888888",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
  },
  {
    id: "hw-cone-shaker",
    name: "Cone Shaker",
    category: "hot-wheels",
    group: "Skip fantasy regulars",
    tonight: false,
    verdict: "skip",
    idRule: "Fantasy mainline / regular TH. No gold flame, no Spectraflame.",
    paint: "#ff6b35",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
  },
  {
    id: "hw-sweet-driver",
    name: "Sweet Driver",
    category: "hot-wheels",
    group: "Skip fantasy regulars",
    tonight: false,
    verdict: "skip",
    idRule: "Fantasy mainline / regular TH. No gold flame, no Spectraflame.",
    paint: "#ff4d6d",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
  },
  {
    id: "hw-fast-fish",
    name: "Fast Fish",
    category: "hot-wheels",
    group: "Skip fantasy regulars",
    tonight: false,
    verdict: "skip",
    idRule: "Fantasy mainline / regular TH. No gold flame, no Spectraflame.",
    paint: "#4cc9f0",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
  },
  {
    id: "hw-gazella",
    name: "Gazella GT",
    category: "hot-wheels",
    group: "Skip fantasy regulars",
    tonight: false,
    verdict: "skip",
    idRule: "Case Q regular Treasure Hunt. Silver flame, plastic wheels. Skip.",
    mark: "silver-flame",
    paint: "#7cb518",
    caseCode: "Q",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: ["Do not confuse with the Firebird Super in the same case."],
  },
  {
    id: "hw-drift-box",
    name: "Drift Box",
    category: "hot-wheels",
    group: "Leave it",
    tonight: false,
    verdict: "leave",
    idRule: "2026 HW Euro #65. Regular mainline, not a Super. No gold flame.",
    paint: "#2b2d42",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
  },
  {
    id: "hw-rule-wrecked-super",
    name: "Factory-wrecked Super card",
    category: "hot-wheels",
    group: "Card rules",
    tonight: false,
    verdict: "buy",
    idRule: SUPER_ID,
    mark: "gold-flame",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    notes: [
      "Still buy a Super at about $1. List it as damaged. Expect well under a clean card.",
    ],
  },
  {
    id: "hw-rule-bad-rivet",
    name: "Regular mainline, bad rivet",
    category: "hot-wheels",
    group: "Card rules",
    tonight: false,
    verdict: "leave",
    idRule: "Cracked or bad rivet on a regular mainline. Not a Super.",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
  },
  {
    id: "mb-integra",
    name: "'97 Acura Integra Type R",
    category: "matchbox",
    group: "Super Chase",
    tonight: true,
    tonightRank: 30,
    verdict: "buy",
    idRule: CHASE_ID,
    mark: "super-chase",
    paint: "#f0c400",
    buyPrice: PEG,
    secondary: {
      amount: "$40–$50",
      kind: "shop-ask",
      note: "Sold out at shops. Those are asks, not sold.",
    },
    soldUnknown: true,
    where: HW_WHERE,
    photo: "chase",
    notes: [
      "Yellow Integra. Don't buy from collector sites — that price is already the flip.",
    ],
  },
  {
    id: "mb-porsche-rally",
    name: "'85 Porsche 911 Rally",
    category: "matchbox",
    group: "Super Chase",
    tonight: true,
    tonightRank: 31,
    verdict: "buy",
    idRule: CHASE_ID,
    mark: "super-chase",
    paint: "#1a1a1a",
    buyPrice: PEG,
    secondary: {
      amount: "about $30",
      kind: "shop-ask",
      note: "Sold out at shops. Ask, not sold. Early-year leftover.",
    },
    soldUnknown: true,
    where: HW_WHERE,
    photo: "chase",
    notes: ["Matte black. Don't buy from collector sites."],
  },
  {
    id: "mb-bronco",
    name: "'78 Ford Bronco",
    category: "matchbox",
    group: "Super Chase",
    tonight: true,
    tonightRank: 32,
    verdict: "if-seen",
    idRule: CHASE_ID,
    mark: "super-chase",
    paint: "#8d6e4c",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    photo: "chase",
    notes: ["Later mix. Still worth a walk. Don't buy from collector sites."],
  },
  {
    id: "mb-gtr",
    name: "2020 Nissan GT-R NISMO",
    category: "matchbox",
    group: "Super Chase",
    tonight: true,
    tonightRank: 33,
    verdict: "if-seen",
    idRule: CHASE_ID,
    mark: "super-chase",
    paint: "#cfd4da",
    buyPrice: PEG,
    soldUnknown: true,
    where: HW_WHERE,
    photo: "chase",
    notes: ["Later mix. Still worth a walk. Don't buy from collector sites."],
  },
  {
    id: "pk-30th-etb",
    name: "30th Celebration Elite Trainer Box",
    category: "pokemon",
    group: "Sept 16 drop",
    tonight: true,
    tonightRank: 40,
    verdict: "buy",
    idRule: "Buy only at the price printed on the box. Sell sealed. Do not open.",
    mark: "print",
    buyPrice: {
      amount: "$49.99",
      kind: "printed-msrp",
    },
    soldUnknown: true,
    shelfDollars: 49.99,
    where: "Target, Walmart, GameStop, Pokémon Center",
    links: [
      {
        label: "September 2026 TCG releases",
        href: "https://www.pokemon.com/us/news/check-out-every-pokemon-tcg-product-release-in-september-2026",
      },
      {
        label: "Pokémon Center",
        href: "https://www.pokemoncenter.com/",
      },
      {
        label: "Target search: pokemon 30th celebration",
        href: "https://www.target.com/s?searchTerm=pokemon+30th+celebration",
      },
      {
        label: "Walmart search: pokemon 30th celebration",
        href: "https://www.walmart.com/search?q=pokemon+30th+celebration",
      },
      {
        label: "GameStop search: pokemon 30th celebration",
        href: "https://www.gamestop.com/search/?q=pokemon%2030th%20celebration",
      },
    ],
    notes: [
      "Drops Sept 16, 2026. If the shelf is over printed price, leave it.",
      "Pokémon Center exclusive has two extra packs.",
      "No verified secondary sold — no profit number.",
    ],
  },
  {
    id: "pk-wave2-bundle",
    name: "30th Wave 2 booster bundle",
    category: "pokemon",
    group: "Oct 2 wave",
    tonight: false,
    verdict: "buy",
    idRule: "Buy only at the price printed on the box. Sell sealed. Do not open.",
    mark: "print",
    buyPrice: {
      amount: "$26.94",
      kind: "printed-msrp",
    },
    soldUnknown: true,
    where: "Target, Walmart, GameStop",
    notes: ["Oct 2, 2026. If the shelf is over printed price, leave it."],
  },
  {
    id: "pk-ditto",
    name: "Ditto Premium Collection",
    category: "pokemon",
    group: "Nov 6 wave",
    tonight: false,
    verdict: "buy",
    idRule: "Buy only at the price printed on the box. Sell sealed. Do not open.",
    mark: "print",
    buyPrice: {
      amount: "$39.99",
      kind: "printed-msrp",
    },
    soldUnknown: true,
    where: "Target, Walmart, GameStop",
    notes: ["Nov 6, 2026 Wave 3. If the shelf is over printed price, leave it."],
  },
  {
    id: "pk-mewtwo-fig",
    name: "Mewtwo figure collection",
    category: "pokemon",
    group: "Nov 6 wave",
    tonight: false,
    verdict: "buy",
    idRule: "Buy only at the price printed on the box. Sell sealed. Do not open.",
    mark: "print",
    buyPrice: {
      amount: "$29.99",
      kind: "printed-msrp",
    },
    soldUnknown: true,
    where: "Target, Walmart, GameStop",
    notes: ["Nov 6, 2026 Wave 3. Each figure collection is $29.99 printed."],
  },
  {
    id: "pk-mew-fig",
    name: "Mew figure collection",
    category: "pokemon",
    group: "Nov 6 wave",
    tonight: false,
    verdict: "buy",
    idRule: "Buy only at the price printed on the box. Sell sealed. Do not open.",
    mark: "print",
    buyPrice: {
      amount: "$29.99",
      kind: "printed-msrp",
    },
    soldUnknown: true,
    where: "Target, Walmart, GameStop",
    notes: ["Nov 6, 2026 Wave 3. Each figure collection is $29.99 printed."],
  },
  {
    id: "pk-chaos-etb",
    name: "Chaos Rising Elite Trainer Box",
    category: "pokemon",
    group: "On Target shelves",
    tonight: true,
    tonightRank: 41,
    verdict: "buy",
    idRule: "Buy only at the $59.99 printed on the box. Over that, leave it. Sell sealed.",
    mark: "print",
    buyPrice: {
      amount: "$59.99",
      kind: "printed-msrp",
      note: "Target. Printed price, not a confirmed flip.",
    },
    soldUnknown: true,
    where: "Target",
    notes: ["No verified secondary sold — no profit number."],
  },
  {
    id: "gw-golf-grab",
    name: "Golf clubs — grab these",
    category: "goodwill",
    group: "Golf",
    tonight: false,
    verdict: "buy",
    idRule: "Read the hosel and sole stamp. Matching set, no cracks, no junior.",
    mark: "stamp",
    where: "Goodwill sports",
    notes: [
      "Scotty Cameron. Titleist Vokey and T/AP irons plus TSR/TSi/GT. Ping G410/G425/G430 and i-series. TaylorMade SIM/Stealth/Qi10 and P770/P790. Callaway Paradym/Rogue/Apex. Mizuno JPX/MP. Odyssey/Bettinardi/Cleveland. Recent Cobra/Srixon/PXG. Rare Honma/XXIO/Miura.",
      "Ram only if it is a matching Golden Ram / Ram Tour Grind forged set (FLC, Axial).",
    ],
  },
  {
    id: "gw-golf-skip",
    name: "Golf clubs — walk past",
    category: "goodwill",
    group: "Golf",
    tonight: false,
    verdict: "skip",
    idRule: "Wilson, Top Flite, Strata, Dunlop, Knight, Pinemeadow, Golden Bear, junior, mismatched, box sets.",
    mark: "stamp",
    where: "Goodwill sports",
    notes: ["Single modern Ram and Tour Grind wedges: leave."],
  },
  {
    id: "gw-ties",
    name: "Ties — silk, clean, label on the wide end",
    category: "goodwill",
    group: "Ties",
    tonight: false,
    verdict: "buy",
    idRule: "Flip the wide end. Hand-rolled hem and Hermès-Paris first.",
    mark: "label",
    where: "Goodwill mens",
    notes: [
      "Hermès first (hand-rolled, Hermès-Paris). Then Zegna, Brioni, Kiton, Canali, Ferragamo, Charvet, Turnbull and Asser, Robert Talbott estate, vintage Burberrys (old spelling).",
      "Brooks Brothers only Golden Fleece or Own Make, not 346. Polo only Purple Label or a clean 90s silk for a lot.",
    ],
  },
  {
    id: "gw-clothes",
    name: "Clothes worth a second look",
    category: "goodwill",
    group: "Clothes / shoes",
    tonight: false,
    verdict: "buy",
    idRule: "Tag, tab, and zipper. Orange tab or big E on Levi's. Working zipper on Carhartt.",
    mark: "label",
    where: "Goodwill apparel",
    notes: [
      "Real band tee, vintage Nike or Starter jacket, Levi's orange tab or big E, Patagonia, Arc'teryx, clean Carhartt with a working zipper.",
    ],
  },
  {
    id: "gw-shoes",
    name: "Shoes — only these, and only clean",
    category: "goodwill",
    group: "Clothes / shoes",
    tonight: false,
    verdict: "buy",
    idRule: "Tongue and heel label. Clean Jordans, Dunks, SBs, New Balance 990s only.",
    mark: "label",
    where: "Goodwill shoes",
  },
  {
    id: "gw-sports",
    name: "Local sports — authentic only",
    category: "goodwill",
    group: "Sports",
    tonight: false,
    verdict: "buy",
    idRule: "Jock tag and stitching. Nike or Mitchell & Ness, not a screen print.",
    mark: "label",
    where: "Goodwill sports",
    notes: [
      "Authentic Blues or Cardinals. Unsigned photos only if a few dollars.",
    ],
  },
  {
    id: "gw-nintendo",
    name: "Nintendo hardware and carts",
    category: "goodwill",
    group: "Electronics",
    tonight: false,
    verdict: "buy",
    idRule: "NES, SNES, N64, GameCube, Game Boy — if it powers on or the cart is clean.",
    mark: "label",
    where: "Goodwill electronics",
    notes: ["Skip scratched Xbox/PS discs."],
  },
  {
    id: "gw-cameras",
    name: "Cameras and iPod Classic",
    category: "goodwill",
    group: "Electronics",
    tonight: false,
    verdict: "buy",
    idRule: "Body stamp: Polaroid SX-70, Nikon, Canon AE-1, working iPod Classic.",
    mark: "stamp",
    where: "Goodwill electronics",
  },
  {
    id: "gw-kitchen",
    name: "Kitchen — stamped pieces",
    category: "goodwill",
    group: "Housewares",
    tonight: false,
    verdict: "buy",
    idRule: "Flip it. Bottom stamp Le Creuset, Staub, Griswold, Wagner, old Lodge, patterned Pyrex, Fire-King jadeite.",
    mark: "stamp",
    where: "Goodwill housewares",
    notes: ["Chip or crack, leave."],
  },
  {
    id: "gw-jewelry",
    name: "Jewelry — marked only",
    category: "goodwill",
    group: "Jewelry",
    tonight: false,
    verdict: "buy",
    idRule: "925, 14k, 18k, or signed Trifari / Haskell / Weiss. No mark, no buy.",
    mark: "stamp",
    where: "Goodwill jewelry",
  },
  {
    id: "gw-tools",
    name: "Tools and knives",
    category: "goodwill",
    group: "Tools",
    tonight: false,
    verdict: "buy",
    idRule: "Stamp on the handle or blade: Snap-on, Mac, Milwaukee, DeWalt, Benchmade, Spyderco, Case if not broken.",
    mark: "stamp",
    where: "Goodwill tools",
  },
  {
    id: "gw-vinyl",
    name: "Vinyl — known name, original pressing",
    category: "goodwill",
    group: "Media",
    tonight: false,
    verdict: "buy",
    idRule: "Read the center label. Known name, original pressing, cover not wrecked.",
    mark: "label",
    where: "Goodwill media",
  },
  {
    id: "gw-diecast",
    name: "1/18 diecast — Bburago Italy only",
    category: "goodwill",
    group: "Toys",
    tonight: false,
    verdict: "if-seen",
    idRule: "Base stamp: Bburago made-in-Italy. Only if cheap and loose.",
    mark: "stamp",
    where: "Goodwill toys",
    notes: ["No-box is common and bulky to ship."],
  },
  {
    id: "gw-walk-past",
    name: "Walk past",
    category: "goodwill",
    group: "Walk past",
    tonight: false,
    verdict: "skip",
    idRule: "Funko commons, Beanie Babies, books, plates, no-name glass, random jeans, costume jewelry, loose Hot Wheels, anything cracked / stained / missing a piece.",
    where: "Goodwill, any aisle",
  },
];

export const RELEASES: ReleaseDrop[] = [
  {
    id: "rel-30th",
    date: "2026-09-16",
    dateLabel: "Wed Sep 16, 2026",
    title: "Pokémon TCG 30th Celebration",
    blurb: "Buy only at printed price. Sell sealed. Pokémon Center exclusive has two extra packs.",
    where: "Target, Walmart, GameStop, Pokémon Center",
    products: ["pk-30th-etb"],
    links: [
      {
        label: "September 2026 TCG releases",
        href: "https://www.pokemon.com/us/news/check-out-every-pokemon-tcg-product-release-in-september-2026",
      },
      { label: "Pokémon Center", href: "https://www.pokemoncenter.com/" },
      {
        label: "Target search",
        href: "https://www.target.com/s?searchTerm=pokemon+30th+celebration",
      },
      {
        label: "Walmart search",
        href: "https://www.walmart.com/search?q=pokemon+30th+celebration",
      },
      {
        label: "GameStop search",
        href: "https://www.gamestop.com/search/?q=pokemon%2030th%20celebration",
      },
    ],
  },
  {
    id: "rel-wave2",
    date: "2026-10-02",
    dateLabel: "Fri Oct 2, 2026",
    title: "30th Wave 2",
    blurb: "Booster bundle at printed MSRP. Over printed, leave it.",
    where: "Target, Walmart, GameStop",
    products: ["pk-wave2-bundle"],
  },
  {
    id: "rel-wave3",
    date: "2026-11-06",
    dateLabel: "Fri Nov 6, 2026",
    title: "30th Wave 3",
    blurb: "Ditto Premium Collection and Mewtwo / Mew figure collections. Printed prices only.",
    where: "Target, Walmart, GameStop",
    products: ["pk-ditto", "pk-mewtwo-fig", "pk-mew-fig"],
  },
  {
    id: "rel-chaos",
    dateLabel: "On Target shelves now",
    title: "Chaos Rising Elite Trainer Box",
    blurb: "Printed $59.99 at Target. Not a confirmed flip. No settled sold.",
    where: "Target",
    products: ["pk-chaos-etb"],
  },
];

export const DECODER = {
  hw: [
    "Gold flame + Spectraflame + rubber tires + tiny TH = Super. Buy at about $1.",
    "Silver flame + plastic wheels = regular Treasure Hunt.",
    "Card 240s/250s = just landed. 200s = leftover M or N. A–L picked over; still buy any Super.",
  ],
  mb: ["Yellow SUPER CHASE bar, rubber tires, SC on the car. About $1. Do not buy from collector sites."],
  pk: ["Printed price only. Shelf over printed = leave it. Sell sealed."],
};

export function itemById(id: string) {
  return ITEMS.find((item) => item.id === id);
}

export function tonightBuyItems() {
  return tonightItems().filter(
    (item) => item.verdict === "buy" || item.verdict === "if-seen"
  );
}

export const FEE_RATE = 0.13;
export const DEFAULT_SHIPPING = 5;

export function tonightItems() {
  return ITEMS.filter((item) => item.tonight).sort(
    (a, b) => (a.tonightRank ?? 99) - (b.tonightRank ?? 99)
  );
}

export function itemsByCategory(category: Category) {
  return ITEMS.filter((item) => item.category === category);
}

export function groupItems(items: HuntItem[]) {
  const groups: { name: string; items: HuntItem[] }[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.name === item.group) {
      last.items.push(item);
    } else {
      groups.push({ name: item.group, items: [item] });
    }
  }
  return groups;
}
