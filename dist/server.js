"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schemas/schema");
const resolvers_1 = require("./resolvers/resolvers");
const user_1 = require("./datasourses/user");
const note_1 = require("./datasourses/note");
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    dataSources: () => ({
        UserAPI: new user_1.UserAPI(),
        NoteAPI: new note_1.NoteAPI(),
    }),
});
server.applyMiddleware({ app: app_1.default });
app_1.default.listen(4000, () => {
    console.log(`App is running at http://localhost${app_1.default.get("port")}${server.graphqlPath}`);
});
exports.default = server;
