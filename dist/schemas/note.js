"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.scheduleTypes = apollo_server_express_1.gql `
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
exports.todoTypes = apollo_server_express_1.gql `
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
