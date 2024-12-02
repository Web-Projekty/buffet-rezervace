import {
  Egg,
  Fish,
  Flower2,
  Leaf,
  Milk,
  Nut,
  Shell,
  Snail,
  Sprout,
  Wheat,
} from "lucide-react";
import { Allergen } from "./types";

export const allergens: Allergen[] = [
  {
    id: 1,
    name: "Lepek",
    description: "Tento produkt obsahuje lepek",
    icon: Wheat,
  },
  {
    id: 2,
    name: "Mléko",
    description: "Tento produkt obsahuje mléko",
    icon: Milk,
  },
  {
    id: 3,
    name: "Vejce",
    description: "Tento produkt obsahuje vejce",
    icon: Egg,
  },
  {
    id: 4,
    name: "Ořechy",
    description: "Tento produkt obsahuje ořechy",
    icon: Nut,
  },
  {
    id: 5,
    name: "Arašídové ořechy",
    description: "Tento produkt obsahuje arašídy",
    icon: Nut,
  },
  {
    id: 6,
    name: "Ryby",
    description: "Tento produkt obsahuje ryby",
    icon: Fish,
  },
  {
    id: 7,
    name: "Korýši",
    description: "Tento produkt obsahuje korýše",
    icon: Shell,
  },
  {
    id: 8,
    name: "Sója",
    description: "Tento produkt obsahuje sóju",
    icon: Leaf,
  },
  {
    id: 9,
    name: "Sezam",
    description: "Tento produkt obsahuje sezam",
    icon: Sprout,
  },
  {
    id: 10,
    name: "Celer",
    description: "Tento produkt obsahuje celer",
  },
  {
    id: 11,
    name: "Hořčice",
    description: "Tento produkt obsahuje hořčici",
  },
  {
    id: 12,
    name: "Oxid siřičitý a siřičitany",
    description: "Tento produkt obsahuje oxid siřičitý a siřičitany",
  },
  {
    id: 13,
    name: "Vlčí bob",
    description: "Tento produkt obsahuje vlčí bob",
    icon: Flower2,
  },
  {
    id: 14,
    name: "Měkkýši",
    description: "Tento produkt obsahuje měkkýše",
    icon: Snail,
  },
];
