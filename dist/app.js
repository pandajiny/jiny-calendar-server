"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = __importDefault(require("mongodb"));
const app = express_1.default();
app.set("port", process.env.PORT || 4000);
const MongoClient = mongodb_1.default.MongoClient;
const MONGODB_URI_LOCAL = process.env.PORT;
// console.log(`env test : ${MONGODB_URI_LOCAL}`);
const client = new MongoClient("mongodb://localhost:27017/jiny-calendar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    if (err)
        throw err;
    console.log(`mongodb connected at ${"mongodb://localhost:27017/jiny-calendar"}`);
});
exports.UserDB = client.db("user");
exports.NoteDB = client.db("note");
exports.default = app;
