import React from "react";
import { useMutation } from "@apollo/client";
import { v4 } from "uuid";
import { CREATE_USER, GET_USERS } from "./graphql";
import User from "./User";

function WithOptimisticUI() {
  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = (username) => {
    createUser({
      variables: { username },
      optimisticResponse: {
        __typename: "Mutation",
        createUser: { __typename: "User", id: v4(), username },
      },
      update: (proxy, { data: { createUser } }) => {
        const data = proxy.readQuery({ query: GET_USERS });
        proxy.writeQuery({
          query: GET_USERS,
          data: { ...data, users: [...data.users, createUser] },
        });
      },
    }).catch((err) => err);
  };

  return <User title="Optimistic UI" onCreateUser={handleCreateUser} />;
}

export default WithOptimisticUI;
