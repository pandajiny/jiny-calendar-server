import { gql } from "apollo-server-express";

import { userTypes } from "./user";
import { scheduleTypes, todoTypes, diaryTypes, noteResultTypes } from "./note";
import { timeTypes } from "./time";

const schema = gql`
  type Query {
    getAllSchedules(email: String): GetSchedulesResult
    getDailyNotes(
      user: RequestUserInput
      scheduleTime: ScheduleTimeInput
    ): GetDailyNotesResult
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
    createTodo(
      scheduleTime: ScheduleTimeInput
      user: RequestUserInput
      content: TodoContentInput
    ): CreateTodoResult
  }

  enum ContentType {
    SCHEDULE
    DIARY
    TODO
  }
`;

export const typeDefs = [
  schema,
  timeTypes,
  userTypes,
  scheduleTypes,
  todoTypes,
  diaryTypes,
  noteResultTypes,
];
