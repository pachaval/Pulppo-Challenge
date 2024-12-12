import { atom } from "jotai";

export type SearchBarState = {
  loading: boolean;
  error: string;
  city: string;
};

export const searchBarAtom = atom<SearchBarState>({
  loading: false,
  error: "",
  city: "",
});
