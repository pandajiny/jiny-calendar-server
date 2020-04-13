import { gql } from "apollo-server-express";

export const timeTypes = gql`
  type RequestTime {
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
`;
