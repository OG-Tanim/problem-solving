import { useAtom } from "jotai";
import { adminAtom, usersAtomLoadable } from "../store/usersAtom";

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
