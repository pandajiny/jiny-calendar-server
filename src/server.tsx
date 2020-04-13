import app, { UserDB } from "./app";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./schemas/schema";
import { resolvers } from "./resolvers/resolvers";

import { UserAPI } from "./datasourses/user";
import { NoteAPI } from "./datasourses/note";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log(
    `App is running at http://localhost${app.get("port")}${server.graphqlPath}`
  );
});

export default server;
