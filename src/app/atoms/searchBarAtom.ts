import { atom } from "jotai";

export type SearchBarState = {
  loading: boolean;
  error: string;
};

export const searchBarAtom = atom<SearchBarState>({
  loading: false,
  error: "",
});
