import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  adminAtom,
  usersAtomLoadable,
  filteredAtomFamily,
} from "../store/usersAtom";
import { useState } from "react";
import { inputAtom, inputAtomFamily, searchAtom } from "../store/inputAtom";

export function AdminRenderer() {
  const [admin] = useAtom(adminAtom);

  return (
    <div>
      <h3>Admin</h3>
      <p>{admin.name}</p>
      <p>{admin.nat}</p>
      <p>{admin.email}</p>
      <p>{admin.cell}</p>
    </div>
  );
}

export function RenderInput() {
  const [input, setInput] = useAtom(inputAtom);
  const [searchEmail, setSearchEmail] = useAtom(searchAtom);

  const handleClick = () => {
    if (input) {
      setSearchEmail(input);
    }
  };

  return (
    <div>
      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="input the email of the user"
      />
      <button onClick={handleClick}>Show User</button>
      {searchEmail && <RenderById email={searchEmail} />}
    </div>
  );
}

function RenderById({ email }) {
  const [user] = useAtom(filteredAtomFamily(email));

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <p>{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
      <p>{user.nat}</p>
      <p>{user.email}</p>
      <p>{user.cell}</p>
    </div>
  );
}

export function UsersRenderer() {
  const [users] = useAtom(usersAtomLoadable);
  //   console.log(users);

  if (users.state === "hasError") return <p>{users.error}</p>;
  if (users.state === "loading") return <p>Loading...</p>;

  console.log(users.data.data);

  return users.data.data.results.map((user, idx) => {
    return (
      <div>
        <h3>{`user ${idx + 1}`}</h3>
        <p>{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
        <p>{user.nat}</p>
        <p>{user.email}</p>
        <p>{user.cell}</p>
      </div>
    );
  });
}
