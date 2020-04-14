import * as UserAPI from "./UserAPI";
import * as NoteAPI from "./NoteAPI";

import { GraphQLScalarType } from "graphql";

export const resolvers = {
  Query: {
    getAllSchedules: async (_, { email }, { dataSources }) => {
      return await NoteAPI.getAllSchedules({ email });
    },
  },
  Mutation: {
    requestLogin: async (_, { email, password }, ___) => {
      return await UserAPI.RequestLogin({ email, password });
      // return await dataSources.UserAPI.RequestLogin({ email, password });
    },
    requestSignup: async (_, { name, email, password }, ___) => {
      return await UserAPI.RequestSignup({ name, email, password });
    },
    createSchedule: async (_, { scheduleTime, content, user }, ___) => {
      return await NoteAPI.createSchedule({
        scheduleTime,
        user,
        content: { body: content.body, type: "SCHEDULE" },
      });
    },
    createDiary: async (_, { user, content, scheduleTime }, ___) => {
      return await NoteAPI.createDiary({
        user,
        content: {
          body: content.body,
          type: "DIARY",
        },
      });
    },
    createTodo: async (_, { user, content }, ___) => {
      return await NoteAPI.createTodo({ user, content });
    },
  },
};
