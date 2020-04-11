"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
exports.resolvers = {
    Query: {
        hello: (_, {}, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("hello");
            const request = yield dataSources.UserAPI.hello("test");
            return request;
        }),
        getAllSchedules: () => __awaiter(void 0, void 0, void 0, function* () {
            return "hi";
        }),
    },
    Mutation: {
        requestLogin: (_, { email, password }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const isDuplicated = yield dataSources.UserAPI.CheckDuplication(email);
            console.log(`login requested : `);
            const user = yield app_1.UserDB.collection(email)
                .findOne({ email: email, password: password })
                .then((result) => result);
            console.log(user);
            return { user: user };
        }),
        requestSignup: (_, { name, email, password }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield dataSources.UserAPI.RequestSignup(name, email, password);
        }),
        createSchedule: (_, { time, content, user }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield dataSources.NoteAPI.createSchedule({ time, user, content });
        }),
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
