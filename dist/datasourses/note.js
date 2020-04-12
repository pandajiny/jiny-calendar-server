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
const apollo_datasource_1 = require("apollo-datasource");
const app_1 = require("../app");
const utils_1 = require("../utils");
class NoteAPI extends apollo_datasource_1.DataSource {
    getAllNotes({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new Promise((resolve, rejects) => {
                app_1.NoteDB.collection(email)
                    .find()
                    .toArray()
                    .catch((error) => {
                    if (error) {
                        rejects(error);
                    }
                })
                    .then((data) => {
                    resolve(data);
                });
            });
            return yield result;
        });
    }
    createSchedule({ time, user, content }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Creating Schedule is requested id : ${user.email}`);
            const requestTime = utils_1.getCurrentTime();
            const result = new Promise((resolve, rejects) => {
                app_1.NoteDB.collection(user.email)
                    .insertOne({ requestTime, time, user, content })
                    // .catch((error) => {
                    //   if (error) {
                    //     rejects(error);
                    //   }
                    // })
                    .then((data) => {
                    //   console.log(data);
                    if (!data.result.ok) {
                        rejects({ isPassed: false });
                    }
                    else {
                        resolve({
                            requestTime: requestTime,
                            time: time,
                            isPassed: data.result.ok === 1,
                            user: { email: user.email },
                            content: data.ops[0],
                        });
                    }
                });
            });
            return yield result;
        });
    }
}
exports.NoteAPI = NoteAPI;
