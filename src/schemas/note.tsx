import { gql } from "apollo-server-express";

export const scheduleTypes = gql`
  # Schedule Type definition
  type Schedule {
    requestTime: RequestTime
    scheduleTime: ScheduleTime
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

  input ScheduleContentInput {
    body: String
  }

  # Schedule Request
  type CreateScheduleResult {
    isPassed: Boolean
    requestTime: RequestTime
    scheduleTime: ScheduleTime
    user: RequestUser
    content: ScheduleContent
  }

  type GetSchedulesResult {
    isPassed: Boolean
    requestTime: RequestTime
    user: RequestUser
    result: [Schedule]
    message: String
  }
`;

export const todoTypes = gql`
  type Todo {
    requestTime: RequestTime
    user: RequestUser
    content: TodoContent
  }

  type TodoContent {
    body: String
    isImportant: Boolean
    deadline: ScheduleTime
  }
`;
