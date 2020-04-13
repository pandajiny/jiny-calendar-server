"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const user_1 = require("./user");
const note_1 = require("./note");
const time_1 = require("./time");
const schema = apollo_server_express_1.gql `
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
    createDiary(
      user: RequestUserInput
      content: DiaryContentInput
    ): CreateDiaryResult
  }

  enum ContentType {
    SCHEDULE
    DIARY
    TODO
  }
`;
exports.typeDefs = [
    schema,
    time_1.timeTypes,
    user_1.userTypes,
    note_1.scheduleTypes,
    note_1.todoTypes,
    note_1.diaryTypes,
];
