const express = require("express");
const path = require("path");
const cors = require("cors");
const { v4 } = require("uuid");
const { ApolloServer, gql } = require("apollo-server-express");

const port = 5000;
const app = express();
app.use(cors());

const users = [
  { id: 1324, username: "Sean" },
  { id: 8744, username: "Henry" },
  { id: 9876, username: "Peter" },
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(username: String!): User
  }
`;

const resolvers = {
  User: {
    id: (parent) => parent.id,
    username: (parent) => parent.username,
  },
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser: (parent, { username }) => {
      const newUser = {
        id: v4(),
        username,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

// Fake network lag
app.use((req, res, next) => {
  setTimeout(() => next(), 2000);
});

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.use(express.static(path.resolve("./build")));
app.use("/", (req, res) => res.sendFile(path.resolve("./build/index.html")));

app.listen(port, () => {
  console.log(`Graphql server running on ${port}`);
});
