"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
  type Query {
    hello: String!
  }

  type Mutation {
    requestLogin(email: String, password: String): LoginResult
    requestSignup(name: String, email: String, password: String): SignupResult
    createSchedule(
      schedule: ScheduleInput
      requestUser: RequestUserInput
    ): Schedule
  }

  input ScheduleInput {
    title: String
  }

  input RequestUserInput {
    name: String
    email: String
  }

  type Schedule {
    CreateTime: Time
  }

  type Time {
    year: Number
  }

  type User {
    name: String
    email: String
    password: String
    isLoggedIn: String
  }

  type RequestUser {
    name: String
    email: String
  }

  type LoginResult {
    user: RequestUser
  }

  type SignupResult {
    user: RequestUser
  }
`;
