import { atom } from "jotai";

export type Listing = {
  type: string;
  roofedSurface: number;
  price: number;
};

export const listingsAtom = atom<Listing[]>([]);
