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
const UserAPI_1 = require("./UserAPI");
const utils_1 = require("../utils");
const util_1 = require("util");
function createSchedule({ scheduleTime, user, content, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`${user.email} request Create Schedule`);
        const requestTime = utils_1.getCurrentTime();
        if (yield new Promise((resolve) => resolve(!UserAPI_1.CheckExist({ email: user.email })))) {
            console.log(`not exist user : ${user.email}`);
            return {
                isPassed: false,
                requestTime: requestTime,
                scheduleTime: null,
                content: { body: "wrong request, not exist User", type: "SCHEDULE" },
                user: { email: user.email },
            };
        }
        else {
            return new Promise((resolve) => {
                app_1.NoteDB.collection(user.email)
                    .insertOne({ requestTime, scheduleTime, user, content })
                    .catch((error) => {
                    resolve({
                        requestTime,
                        isPassed: false,
                        user: user,
                        content: { body: "Creating Schedule is failed", type: "SCHEDULE" },
                        scheduleTime: scheduleTime,
                    });
                })
                    .then((result) => {
                    if (result && result.result.ok && result.ops) {
                        resolve({
                            requestTime,
                            isPassed: true,
                            user,
                            content,
                            scheduleTime: scheduleTime,
                        });
                    }
                    else {
                        resolve({
                            requestTime,
                            isPassed: false,
                            user: user,
                            content: {
                                body: "Creating Schedule is failed",
                                type: "SCHEDULE",
                            },
                            scheduleTime: scheduleTime,
                        });
                    }
                });
            });
        }
    });
}
exports.createSchedule = createSchedule;
function getAllSchedules({ email, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`${email} : get all schedules`);
        const requestTime = utils_1.getCurrentTime();
        if (new Promise((resolve) => resolve(UserAPI_1.CheckExist({ email })))) {
            return new Promise((resolve) => {
                app_1.NoteDB.collection(email)
                    .find()
                    .toArray()
                    .catch((error) => {
                    resolve({
                        isPassed: false,
                        message: "DB connection Fail",
                        requestTime,
                        result: null,
                        user: { email: email },
                    });
                })
                    .then((data) => {
                    if (data && util_1.isArray(data)) {
                        console.log(`${email}'s request has been successfully responded.`);
                        resolve({
                            isPassed: true,
                            message: "Test",
                            requestTime,
                            result: data,
                            user: { email: email },
                        });
                    }
                });
            });
        }
        else {
            return {
                isPassed: false,
                requestTime,
                result: null,
                user: { email: email },
                message: "wrong request : not exist user",
            };
        }
    });
}
exports.getAllSchedules = getAllSchedules;
function createDiary({ user, content, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`${user.email} request Create Diary`);
        // Make Request Time Object for now
        const requestTime = utils_1.getCurrentTime();
        // validate user Information
        if (yield new Promise((resolve) => resolve(!UserAPI_1.CheckExist({ email: user.email })))) {
            console.log(`not exist user : ${user.email} `);
            return {
                isPassed: false,
                requestTime: requestTime,
                scheduleTime: {
                    date: requestTime.date,
                    month: requestTime.month,
                    year: requestTime.month,
                },
                content: { body: "wrong request, not exist User", type: "DIARY" },
                user: { email: user.email },
            };
        }
        else {
            return new Promise((resolve) => {
                app_1.NoteDB.collection(user.email)
                    .insertOne({ requestTime, user, content })
                    .catch((error) => {
                    resolve({
                        requestTime,
                        scheduleTime: {
                            date: requestTime.date,
                            month: requestTime.month,
                            year: requestTime.month,
                        },
                        isPassed: false,
                        user: user,
                        content: { body: "Creating Diary is failed", type: "DIARY" },
                    });
                })
                    .then((result) => {
                    if (result && result.result.ok && result.ops) {
                        resolve({
                            requestTime,
                            scheduleTime: {
                                date: requestTime.date,
                                month: requestTime.month,
                                year: requestTime.month,
                            },
                            isPassed: true,
                            user,
                            content,
                        });
                    }
                    else {
                        resolve({
                            requestTime,
                            scheduleTime: {
                                date: requestTime.date,
                                month: requestTime.month,
                                year: requestTime.month,
                            },
                            isPassed: false,
                            user: user,
                            content: { body: "Creating Diary is failed", type: "DIARY" },
                        });
                    }
                });
            });
        }
    });
}
exports.createDiary = createDiary;
function createTodo({ user, content, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestTime = utils_1.getCurrentTime();
        console.log(`${user.email} request Create Todo`);
        if (yield new Promise((resolve) => resolve(!UserAPI_1.CheckExist({ email: user.email })))) {
            console.log(`${user.email} not exist user.`);
            return {
                isPassed: false,
                content: {
                    body: "Error occured",
                    option: {
                        deadline: null,
                        isImportant: false,
                        scheduleTime: null,
                    },
                },
                requestTime: requestTime,
                user: user,
            };
        }
        else {
            return yield new Promise((resolve) => {
                app_1.NoteDB.collection(user.email)
                    .insertOne({
                    requestTime,
                    user,
                    content,
                })
                    .catch((error) => {
                    console.log(`error occured`);
                    resolve({
                        isPassed: false,
                        requestTime: requestTime,
                        user: user,
                        content: {
                            body: "failed",
                            option: {
                                isImportant: false,
                                deadline: null,
                                scheduleTime: null,
                            },
                        },
                    });
                })
                    .then((result) => {
                    // console.log(result.ops[0].content.option)
                    resolve({
                        isPassed: true,
                        requestTime: requestTime,
                        user: user,
                        content: result &&
                            util_1.isArray(result.ops) &&
                            result.ops[0].content,
                    });
                });
            });
        }
    });
}
exports.createTodo = createTodo;
// export async function getDailyNote({});
