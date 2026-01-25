import { atom } from "jotai";
import { atomFamily } from "jotai-family";

export const inputAtom = atom("");
export const searchAtom = atom("");

export const inputAtomFamily = atomFamily((input) => {
  return atom(input);
});
