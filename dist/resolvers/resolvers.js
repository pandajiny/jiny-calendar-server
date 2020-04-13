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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserAPI = __importStar(require("./UserAPI"));
const NoteAPI = __importStar(require("./NoteAPI"));
exports.resolvers = {
    Query: {
        getAllSchedules: (_, { email }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield NoteAPI.getAllSchedules({ email });
        }),
    },
    Mutation: {
        requestLogin: (_, { email, password }, ___) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserAPI.RequestLogin({ email, password });
            // return await dataSources.UserAPI.RequestLogin({ email, password });
        }),
        requestSignup: (_, { name, email, password }, ___) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserAPI.RequestSignup({ name, email, password });
        }),
        createSchedule: (_, { scheduleTime, content, user }, ___) => __awaiter(void 0, void 0, void 0, function* () {
            return yield NoteAPI.createSchedule({ scheduleTime, user, content });
            // return await dataSources.NoteAPI.createSchedule({ time, user, content });
        }),
    },
};
