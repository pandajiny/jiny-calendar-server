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
const app_2 = require("../app");
const util_1 = require("util");
function CheckExist({ email }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`check with ${email}`);
        return new Promise((resolve) => {
            app_1.UserDB.collection("Users")
                .find({ email: email })
                .toArray()
                .then((data) => {
                if (data.length > 0) {
                    if (app_2.NoteDB.collection(email)) {
                        console.log(`${email} is Exist`);
                        resolve(true);
                    }
                    else {
                        console.log(`${email} is exist, but Personal Note storage is not`);
                        resolve(false);
                    }
                }
                else {
                    console.log(`${email} is not exist`);
                    resolve(false);
                }
            });
        });
    });
}
exports.CheckExist = CheckExist;
function RequestLogin({ email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = "";
        console.log(`Login Request ${email}`);
        if (yield CheckExist({ email: email })) {
            return new Promise((resolve) => {
                app_1.UserDB.collection("Users")
                    .findOne({ email: email, password: password })
                    .catch((error) => {
                    resolve({ isPassed: false, user: null, message: "Error occured" });
                })
                    .then((result) => {
                    console.log(result);
                    if (util_1.isString(result.name) && util_1.isString(result.email)) {
                        resolve({
                            isPassed: true,
                            user: { name: result.name, email: result.email },
                            message: "Login Passed",
                        });
                    }
                });
            });
        }
        else {
            console.log(`user not exist`);
            return { isPassed: false, user: null, message: "Login Failed" };
        }
    });
}
exports.RequestLogin = RequestLogin;
function RequestSignup({ name, email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Signup Request : ${email}`);
        if (yield CheckExist({ email })) {
            //   throw new Error(`${email} is Duplicated.`);
            return {
                isPassed: false,
                user: null,
                message: "This email Id is duplicated!",
            };
        }
        else {
            return new Promise((resolve) => {
                app_1.UserDB.collection("Users")
                    .insertOne({
                    name: name,
                    email: email,
                    password: password,
                })
                    .catch((error) => {
                    resolve({
                        isPassed: false,
                        user: null,
                        message: "Error occcured",
                    });
                })
                    .then((data) => {
                    app_2.NoteDB.createCollection(email).then((result) => {
                        app_2.NoteDB.collection(email)
                            .insertOne({ type: "initial document" })
                            .then((result) => {
                            if (data && util_1.isArray(data.ops)) {
                                if (util_1.isString(data.ops[0].name) &&
                                    util_1.isString(data.ops[0].email)) {
                                    resolve({
                                        isPassed: true,
                                        user: {
                                            name: data.ops[0].name,
                                            email: data.ops[0].email,
                                        },
                                        message: "Signup Success",
                                    });
                                }
                            }
                        });
                    });
                });
            });
        }
    });
}
exports.RequestSignup = RequestSignup;
