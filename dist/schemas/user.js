"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.userTypes = apollo_server_express_1.gql `
  type User {
    name: String
    email: String
    password: String
    isLoggedIn: String
  }

  type LoginUser {
    name: String
    email: String
  }

  type RequestUser {
    email: String
  }

  input RequestUserInput {
    email: String
  }

  type LoginResult {
    isPassed: Boolean
    user: LoginUser
    message: String
  }

  type SignupResult {
    isPassed: Boolean
    user: LoginUser
    message: String
  }
`;
