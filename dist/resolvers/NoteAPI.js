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
        if (new Promise((resolve) => resolve(!UserAPI_1.CheckExist({ email: user.email })))) {
            console.log(`not exist user : ${user.email} `);
            return {
                isPassed: false,
                requestTime: requestTime,
                scheduleTime: null,
                content: { body: "wrong request, not exist User" },
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
                        content: { body: "Creating Schedule is failed" },
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
                            content: { body: "Creating Schedule is failed" },
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
                    console.log(data);
                    if (data && util_1.isArray(data)) {
                        if (ScheduleTypeValidator(data)) {
                            resolve({
                                isPassed: false,
                                message: "Test",
                                requestTime,
                                result: ScheduleTypeValidator(data),
                                user: { email: email },
                            });
                        }
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
// type Schedule
//     const result = new Promise((resolve, rejects) => {
//       NoteDB.collection(email)
//         .find()
//         .toArray()
//         .catch((error) => {
//           if (error) {
//             rejects(error);
//           }
//         })
//         .then((data) => {
//           resolve(data);
//         });
//     });
//     return await result;
//   }
// export class NoteAPI extends DataSource {
//   async getAllNotes({ email }) {
//     const result = new Promise((resolve, rejects) => {
//       NoteDB.collection(email)
//         .find()
//         .toArray()
//         .catch((error) => {
//           if (error) {
//             rejects(error);
//           }
//         })
//         .then((data) => {
//           resolve(data);
//         });
//     });
//     return await result;
//   }
//   async createSchedule({ time, user, content }) {
//     console.log(`Creating Schedule is requested id : ${user.email}`);
//     const requestTime = getCurrentTime();
//     const result = new Promise((resolve, rejects) => {
//       NoteDB.collection(user.email)
//         .insertOne({ requestTime, time, user, content })
//         // .catch((error) => {
//         //   if (error) {
//         //     rejects(error);
//         //   }
//         // })
//         .then((data) => {
//           //   console.log(data);
//           if (!data.result.ok) {
//             rejects({ isPassed: false });
//           } else {
//             resolve({
//               requestTime: requestTime,
//               time: time,
//               isPassed: data.result.ok === 1,
//               user: { email: user.email },
//               content: data.ops[0],
//             });
//           }
//         });
//     });
//     return await result;
//   }
// }
