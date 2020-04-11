"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
  type Query {
    hello: String!
    getAllSchedules(email: String): [Schedule]
  }

  type Mutation {
    requestLogin(email: String, password: String): LoginResult
    requestSignup(name: String, email: String, password: String): SignupResult
    createSchedule(
      time: ScheduleTimeInput
      content: ScheduleContentInput
      user: RequestUserInput
    ): CreateScheduleResult
  }

  # Schedule Type definition
  type Schedule {
    requestTime: Time
    time: ScheduleTime
    user: RequestUser
    content: ScheduleContent
  }

  type ScheduleContent {
    body: String
  }

  input ScheduleTimeInput {
    year: Int
    month: Int
    date: Int
  }

  input ScheduleUserInput {
    email: String
  }

  input ScheduleContentInput {
    body: String
  }

  # Time type definition
  type Time {
    year: Int
    month: Int
    date: Int
    hour: Int
    minute: Int
    seconds: Int
  }

  type ScheduleTime {
    year: Int
    month: Int
    date: Int
  }

  # User Type Definition
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

  input RequestUserInput {
    name: String
    email: String
  }

  # Result Type Definition
  type LoginResult {
    isPassed: Boolean
    user: RequestUser
    message: String
  }

  type SignupResult {
    isPassed: Boolean
    user: RequestUser
    message: String
  }

  type CreateScheduleResult {
    isPassed: Boolean
    requestTime: Time
    time: ScheduleTime
    user: RequestUser
    content: ScheduleContent
  }
`;
