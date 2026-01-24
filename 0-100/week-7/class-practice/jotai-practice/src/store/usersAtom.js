import { atom } from "jotai";
import { loadable } from "jotai/utils";
import axios from "axios";

const usersAtom = atom(async () => {
  const response = await axios.get(
    "https://randomuser.me/api/?results=10&inc=name,nat,email,cell",
  );
  return response;
});

export const usersAtomLoadable = loadable(usersAtom);

export const adminAtom = atom({
  name: "Atomic Jotai",
  nat: "USA",
  email: "atomic.jotai@example.com",
  cell: "(01) 33221-1678",
});
