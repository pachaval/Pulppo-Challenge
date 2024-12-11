import { atom } from "jotai";

export const cityAtom = atom<Record<string, number>>({
  Departamento: 0,
  Casa: 0,
});
