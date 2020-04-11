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
class UserAPI extends apollo_datasource_1.DataSource {
    hello(message) {
        return "world";
    }
    RequestSignup(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Signup Request : ${email}`);
            if (yield this.CheckDuplication(email)) {
                //   throw new Error(`${email} is Duplicated.`);
                return {
                    isPassed: false,
                    user: { email: "", name: "" },
                    message: "This email Id is duplicated!",
                };
            }
            else {
                const newUser = new Promise((resolve, rejects) => {
                    app_1.UserDB.collection("Users")
                        .insertOne({
                        name: name,
                        email: email,
                        password: password,
                    })
                        .catch((error) => {
                        rejects({
                            isPassed: false,
                            user: { name: "", email: "" },
                            message: error,
                        });
                    })
                        .then((data) => {
                        app_1.UserDB.createCollection(email).then((result) => {
                            //   console.log(`data : `);
                            //   console.log(data);
                            resolve({
                                isPassed: true,
                                user: data
                                    ? { name: data.ops[0].name, email: data.ops[0].email }
                                    : { name: "", email: "" },
                                message: `${email} is succesfully Signed up!`,
                            });
                        });
                    });
                });
                return (yield newUser) || null;
            }
        });
    }
    // Get email, and Check Duplication from Server.
    // True : it's duplicated || False : it's no problem
    CheckDuplication(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`check with ${email}`);
            const result = new Promise((resolve, reject) => {
                app_1.UserDB.collection("Users")
                    .find({ email: email })
                    .toArray()
                    .then((data) => {
                    //   console.log("data :");
                    //   console.log(data);
                    if (data.length > 0) {
                        console.log(`${email} is already Exist`);
                        resolve(true);
                    }
                    else {
                        console.log(`${email} is not exist`);
                        resolve(false);
                    }
                });
            });
            return yield result;
        });
    }
}
exports.UserAPI = UserAPI;
