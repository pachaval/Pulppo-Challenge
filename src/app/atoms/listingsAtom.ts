import { atom } from "jotai";
import { Listing } from "../types";

export const listingsAtom = atom<Listing[]>([]);
