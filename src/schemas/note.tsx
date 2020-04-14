import { gql } from "apollo-server-express";

export const noteResultTypes = gql`
  type GetDailyNotesResult {
    isPassed: Boolean
    requestTime: RequestTime
    user: RequestUser
    diary: [Diary]

    message: String
  }

  type GetSchedulesResult {
    isPassed: Boolean
    requestTime: RequestTime
    user: RequestUser
    result: [Schedule]
    message: String
  }

  type CreateScheduleResult {
    isPassed: Boolean
    requestTime: RequestTime
    scheduleTime: ScheduleTime
    user: RequestUser
    content: ScheduleContent
  }

  type CreateDiaryResult {
    isPassed: Boolean
    requestTime: RequestTime
    scheduleTime: ScheduleTime
    user: RequestUser
    content: DiaryContent
  }
`;

export const scheduleTypes = gql`
  type Schedule {
    requestTime: RequestTime
    scheduleTime: ScheduleTime
    user: RequestUser
    content: ScheduleContent
  }

  type ScheduleContent {
    body: String
    type: ContentType
  }

  input ScheduleTimeInput {
    year: Int
    month: Int
    date: Int
  }

  input ScheduleContentInput {
    body: String
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
    option: TodoOption
  }

  input TodoContentInput {
    option: TodoOptionInput
    body: String
  }

  input TodoOptionInput {
    isImportant: Boolean
    deadline: ScheduleContentInput
    scheduleTime: ScheduleTimeInput
  }

  type TodoOption {
    isImportant: Boolean
    scheduleTime: ScheduleTime
    deadline: ScheduleTime
  }

  type CreateTodoResult {
    isPassed: Boolean
    requestTime: RequestTime
    user: RequestUser
    content: TodoContent
  }
`;

export const diaryTypes = gql`
  type Diary {
    requestTime: RequestTime
    user: RequestUser
    content: DiaryContent
  }

  type DiaryContent {
    body: String
    type: ContentType
  }

  input DiaryContentInput {
    body: String
  }
`;
