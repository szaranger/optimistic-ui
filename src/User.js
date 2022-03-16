import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./graphql";

function User({ title, onCreateUser }) {
  const [username, setUsername] = useState("");
  const { data, loading } = useQuery(GET_USERS);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleAddClick = () => {
    onCreateUser(username);
    setUsername("");
  };

  if (loading || !data?.users) return <>Loading...</>;

  const { users } = data;

  return (
    <div>
      <h2>{title}</h2>
      Username:
      <div>
        <input type={"text"} value={username} onChange={handleChangeUsername} />
        <button onClick={handleAddClick}>Add</button>
      </div>
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.username}</div>
        </div>
      ))}
    </div>
  );
}

export default User;
