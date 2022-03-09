import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER, GET_USERS } from "./graphql";
import User from "./User";

function WithoutOptimisticUI() {
  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = (username) => {
    createUser({
      variables: { username },
      refetchQueries: [{ query: GET_USERS }],
    }).catch((err) => err);
  };

  return <User title="Normal UI" onCreateUser={handleCreateUser} />;
}

export default WithoutOptimisticUI;
