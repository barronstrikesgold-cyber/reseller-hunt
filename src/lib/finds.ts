import { SPORTS } from "./sports";
import type { FindItem } from "./item";

export type { AisleId, FindItem, Sale } from "./item";

const CAR_ROWS: Omit<FindItem, "aisle">[] = [
  {
    id: "cuda",
    name: "'70 AAR Cuda",
    group: "case",
    groupLabel: "Case P and Q",
    badge: "Super · case P",
    detail: "Gold Super. Case P.",
    superColor: "Spectraflame gold Super",
    aliases: [
      "cuda",
      "aar",
      "aar cuda",
      "plymouth",
      "70 aar",
      "'70 aar",
      "70 plymouth",
      "jjm28",
    ],
    photo: "/photos/cuda.jpg",
    photoAlt: "Gold 2026 Super '70 Plymouth AAR Cuda",
    shelf: 1,
    shelfLabel: "About $1",
    sale: { kind: "none" },
  },
  {
    id: "firebird",
    name: "'67 Firebird 400",
    group: "case",
    groupLabel: "Case P and Q",
    badge: "Super · case Q",
    detail: "Blue Super. Case Q.",
    superColor: "Spectraflame blue Super",
    aliases: [
      "firebird",
      "firebird 400",
      "67 firebird",
      "'67 firebird",
      "pontiac",
      "jjm29",
    ],
    photo: "/photos/firebird.jpg",
    photoAlt: "Blue 2026 Super '67 Pontiac Firebird 400",
    shelf: 1,
    shelfLabel: "About $1",
    sale: { kind: "none" },
  },
  {
    id: "skyline",
    name: "Nissan Skyline HT 2000GT-X",
    group: "case",
    groupLabel: "Case P and Q",
    badge: "Regular TH · case P",
    detail: "Black regular Treasure Hunt. Case P.",
    superColor: "Black regular TH — silver flame, not Super",
    aliases: [
      "skyline",
      "2000gt",
      "2000gt-x",
      "2000gtx",
      "gt-x",
      "gtx",
      "nissan skyline",
      "ht 2000",
    ],
    photo: "/photos/skyline.jpg",
    photoAlt: "Black 2026 regular Treasure Hunt Nissan Skyline HT 2000GT-X",
    shelf: 1,
    shelfLabel: "About $1",
    sale: { kind: "none" },
  },
  {
    id: "f40",
    name: "Ferrari F40 Competizione",
    group: "supers",
    groupLabel: "Supers with a settled sale",
    badge: "Super",
    detail: "Ferrari F40 Competizione Super.",
    superColor: "Super — Spectraflame dark finish",
    aliases: ["f40", "ferrari f40", "competizione", "f40 competizione"],
    photo: "/photos/f40.jpg",
    photoAlt: "Ferrari F40 Competizione Super Treasure Hunt",
    shelf: 1,
    shelfLabel: "About $1",
    sale: {
      kind: "settled",
      amount: 122,
      line: "August 2026 tracked average $122",
    },
  },
  {
    id: "civic",
    name: "Honda Civic Custom",
    group: "supers",
    groupLabel: "Supers with a settled sale",
    badge: "Super",
    detail: "Teal Super.",
    superColor: "Teal Super",
    aliases: ["civic", "honda civic", "civic custom"],
    photo: "/photos/civic.jpg",
    photoAlt: "Teal Honda Civic Custom Super Treasure Hunt",
    shelf: 1,
    shelfLabel: "About $1",
    sale: {
      kind: "settled",
      amount: 73,
      line: "About $73 on one tracker",
    },
  },
  {
    id: "lotus",
    name: "Lotus Sport Elise",
    group: "supers",
    groupLabel: "Supers with a settled sale",
    badge: "Super",
    detail: "Orange Super. Elise, not Elite.",
    superColor: "Orange Super",
    aliases: ["lotus", "elise", "sport elise", "lotus elise", "lotus sport"],
    photo: "/photos/lotus.jpg",
    photoAlt: "Orange Lotus Sport Elise Super Treasure Hunt",
    shelf: 1,
    shelfLabel: "About $1",
    sale: {
      kind: "settled",
      amount: 50,
      line: "Closer to $50",
    },
  },
  {
    id: "mustang",
    name: "Ford Mustang GTD",
    group: "supers",
    groupLabel: "Supers with a settled sale",
    badge: "Super",
    detail: "Ford Mustang GTD Super.",
    superColor: "Super",
    aliases: ["mustang", "gtd", "mustang gtd", "ford mustang"],
    photo: "/photos/mustang.jpg",
    photoAlt: "Ford Mustang GTD Super Treasure Hunt",
    shelf: 1,
    shelfLabel: "About $1",
    sale: {
      kind: "settled",
      amount: 53,
      line: "About $53 in May 2026",
    },
  },
  {
    id: "impala",
    name: "'64 Impala",
    group: "supers",
    groupLabel: "Supers with a settled sale",
    badge: "Super",
    detail: "Teal Super.",
    superColor: "Teal Super",
    aliases: ["impala", "64 impala", "'64 impala", "chevy impala"],
    photo: "/photos/impala.jpg",
    photoAlt: "Teal '64 Impala Super Treasure Hunt",
    shelf: 1,
    shelfLabel: "About $1",
    sale: {
      kind: "settled",
      amount: 51,
      line: "About $51",
    },
  },
  {
    id: "porsche",
    name: "Porsche 911 Carrera RS 2.7",
    group: "open",
    groupLabel: "Super — no settled sale",
    badge: "Super",
    detail: "Brown Super.",
    superColor: "Brown Super",
    aliases: [
      "carrera rs",
      "rs 2.7",
      "rs2.7",
      "911 carrera",
      "brown porsche",
      "brown 911",
    ],
    photo: "/photos/porsche.jpg",
    photoAlt: "Brown Porsche 911 Carrera RS 2.7 Super Treasure Hunt",
    shelf: 1,
    shelfLabel: "About $1",
    sale: { kind: "none" },
    note: "No settled sale. Do not treat an asking price as a sale.",
  },
  {
    id: "matchbox",
    name: "Matchbox Super Chase",
    group: "chase",
    groupLabel: "Matchbox — card must say SUPER CHASE",
    badge: "SUPER CHASE only",
    detail:
      "Yellow Integra, '85 Porsche 911 Rally, '78 Bronco, 2020 GT-R NISMO.",
    superColor: "Only if the card says SUPER CHASE",
    aliases: [
      "super chase",
      "matchbox super chase",
      "integra",
      "acura integra",
      "yellow integra",
      "911 rally",
      "85 porsche",
      "'85 porsche",
      "bronco",
      "78 bronco",
      "'78 bronco",
      "nismo",
      "gt-r nismo",
      "gtr nismo",
    ],
    photo: "/photos/matchbox.jpg",
    photoAlt: "Matchbox Super Chase card for the '78 Bronco",
    shelf: 1,
    shelfLabel: "About $1",
    sale: { kind: "none" },
    note: "Pass any Matchbox that does not print SUPER CHASE on the card.",
  },
  {
    id: "etb",
    name: "Pokémon 30th Celebration ETB",
    group: "sept16",
    groupLabel: "September 16",
    badge: "Printed $49.99 only",
    detail: "Elite Trainer Box. Sept 16. Buy only at printed $49.99.",
    superColor: "Retail box — printed $49.99",
    aliases: [
      "pokemon",
      "pokémon",
      "etb",
      "elite trainer",
      "elite trainer box",
      "30th",
      "30th celebration",
      "celebration etb",
    ],
    photo: "/photos/etb.jpg",
    photoAlt: "Pokémon 30th Celebration Elite Trainer Box",
    shelf: 49.99,
    shelfLabel: "Printed $49.99",
    sale: { kind: "none" },
    note: "Leave it if the shelf is anything other than $49.99.",
  },
];

export const CARS: FindItem[] = CAR_ROWS.map((item) => ({
  ...item,
  aisle: "cars",
}));

export const FINDS: FindItem[] = [...CARS, ...SPORTS];

const PASS_BLOCK = [
  "fast foodie",
  "knight rider",
  "monopoly",
  "ferrari 365",
  "365 gtb",
  "sf90",
  "928s",
  "928 s",
  "904",
  "pink 911",
  "pink porsche",
  "hobby box",
  "hobby boxes",
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[^a-z0-9'.+\-\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchFinds(query: string): FindItem[] {
  const q = normalize(query);
  if (!q) return [];
  if (PASS_BLOCK.some((blocked) => q.includes(blocked))) return [];

  return FINDS.filter((item) => {
    const hay = normalize(
      [
        item.name,
        item.detail,
        item.badge,
        item.superColor,
        item.sport,
        item.packType,
        item.lookFor,
        ...item.aliases,
      ].join(" "),
    );
    if (hay.includes(q) || q.includes(normalize(item.name))) return true;
    return item.aliases.some((alias) => {
      const a = normalize(alias);
      return q.includes(a) || a.includes(q);
    });
  });
}

export function saleLine(item: FindItem) {
  return item.sale.kind === "settled" ? item.sale.line : "No settled sale.";
}

export function packTypeLabel(item: FindItem) {
  if (item.packType === "hanger") return "Hanger";
  if (item.packType === "blaster") return "Blaster";
  if (item.packType === "value") return "Value";
  if (item.packType === "mega") return "Mega";
  return item.badge;
}

export function cashLeft(
  item: FindItem,
  shelf: number,
  shipping: number,
  feeRate = 0.13,
) {
  if (item.sale.kind !== "settled") return null;
  const proceeds = item.sale.amount * (1 - feeRate);
  return proceeds - shipping - shelf;
}

export function isBuy(
  item: FindItem,
  leftover: number | null,
) {
  return leftover !== null && leftover > 0;
}
