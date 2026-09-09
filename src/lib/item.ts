export type Sale =
  | { kind: "settled"; amount: number; line: string }
  | { kind: "none" };

export type AisleId =
  | "cars"
  | "sports"
  | "sneakers"
  | "tech"
  | "streetwear";

export type FindItem = {
  id: string;
  aisle: AisleId;
  name: string;
  group:
    | "case"
    | "supers"
    | "open"
    | "chase"
    | "sept16"
    | "football"
    | "baseball"
    | "basketball"
    | "hockey"
    | "soccer"
    | "jordan"
    | "dunk"
    | "newbalance"
    | "adidas"
    | "yeezy"
    | "apple"
    | "electronics"
    | "supreme"
    | "street"
    | "collab";
  groupLabel: string;
  badge: string;
  detail: string;
  superColor: string;
  aliases: string[];
  photo: string;
  photoAlt: string;
  photoNote?: string;
  sport?: string;
  packType?: "hanger" | "blaster" | "value" | "mega";
  lookFor?: string;
  shelf: number;
  shelfLabel: string;
  sale: Sale;
  note?: string;
};
