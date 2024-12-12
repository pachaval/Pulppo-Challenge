import { atom } from "jotai";

export type OperationRadioState = {
  operation: "sale" | "rent";
};

export const operationRadioAtom = atom<OperationRadioState>({
  operation: "sale",
});
