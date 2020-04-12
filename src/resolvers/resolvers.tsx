import { UserDB } from "../app";

export const resolvers = {
  Query: {
    hello: async (_, {}, { dataSources }) => {
      console.log("hello");
      const request = await dataSources.UserAPI.hello("test");
      return request;
    },
    getAllSchedules: async (_, { email }, { dataSources }) => {
      return await dataSources.NoteAPI.getAllNotes({ email });
    },
  },
  Mutation: {
    requestLogin: async (_, { email, password }, { dataSources }) => {
      const isDuplicated = await dataSources.UserAPI.CheckDuplication(email);
      console.log(`login requested : `);
      const user = await UserDB.collection(email)
        .findOne({ email: email, password: password })
        .then((result) => result);
      console.log(user);
      return { user: user };
    },
    requestSignup: async (_, { name, email, password }, { dataSources }) => {
      return await dataSources.UserAPI.RequestSignup(name, email, password);
    },
    createSchedule: async (_, { time, content, user }, { dataSources }) => {
      return await dataSources.NoteAPI.createSchedule({ time, user, content });
    },
  },
};

// export type User = {
//     name: string;
//     email: string;
//     password: string;
//     isLoggedIn: LoginState;
//   };

//   export type LoginState = "TRUE" | "FALSE" | undefined;

//   // Schedule Context
//   export type Schedule = {
//     _id?: string;
//     requestTime: Time;
//     time: Time;
//     content: Content;
//     user: requestUser;
//   };

//   type requestUser = {
//     email: string;
//     name: string;
//   };

//   type Content = {
//     text: string;
//     isImportant: boolean;
//     kind: ContentType;
//   };

//   type ContentType = "Schedule" | "undefined";

//   export type Time = {
//     year: number;
//     month: number;
//     date: number;
//     hour: number;
//     minute: number;
//     second: number;
//   };

//   export type SaveCookieProps = {
//     name: string;
//     email: string;
//     isLoggedIn: "TRUE" | "FALSE";
//     loginTime: Time;
//   };
