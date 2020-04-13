import { gql } from "apollo-server-express";

import { userTypes } from "./user";
import { scheduleTypes, todoTypes } from "./note";
import { timeTypes } from "./time";

const schema = gql`
  type Query {
    getAllSchedules(email: String): GetSchedulesResult
  }

  type Mutation {
    requestLogin(email: String, password: String): LoginResult
    requestSignup(name: String, email: String, password: String): SignupResult
    createSchedule(
      scheduleTime: ScheduleTimeInput
      content: ScheduleContentInput
      user: RequestUserInput
    ): CreateScheduleResult
  }
`;

export const typeDefs = [
  schema,
  timeTypes,
  userTypes,
  scheduleTypes,
  todoTypes,
];
