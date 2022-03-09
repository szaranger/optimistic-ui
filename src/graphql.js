import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

export const CREATE_USER = gql`
  mutation($username: String!) {
    createUser(username: $username) {
      id
      username
    }
  }
`;
