import express from "express";
import mongodb from "mongodb";
import graphqlHTTP from "express-graphql";

const app = express();

app.set("port", process.env.PORT || 4000);

const MongoClient = mongodb.MongoClient;

const MONGODB_URI_LOCAL = process.env.PORT;

// console.log(`env test : ${MONGODB_URI_LOCAL}`);

const client = new MongoClient("mongodb://localhost:27017/jiny-calendar", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) throw err;
  console.log(
    `mongodb connected at ${"mongodb://localhost:27017/jiny-calendar"}`
  );
});

export const UserDB = client.db("user");
export const NoteDB = client.db("note");

export default app;
