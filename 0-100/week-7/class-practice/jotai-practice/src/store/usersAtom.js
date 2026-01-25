import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { atomFamily } from "jotai-family";
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

export const filteredAtomFamily = atomFamily((email) => {
  return atom((get) => {
    const usersLoadable = get(usersAtomLoadable);
    if (usersLoadable.state === "hasData") {
      return usersLoadable.data.data.results.find(
        (user) => user.email === email,
      ); //returns atom([])
    }
    return null;
  });
});

const atomFam = atomFamily((param) => {
  return atom(param);
});
