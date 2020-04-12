import { DataSource } from "apollo-datasource";
import { NoteDB } from "../app";

import { getCurrentTime } from "../utils";
import { rejects } from "assert";

export class NoteAPI extends DataSource {
  async getAllNotes({ email }) {
    const result = new Promise((resolve, rejects) => {
      NoteDB.collection(email)
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
    return await result;
  }

  async createSchedule({ time, user, content }) {
    console.log(`Creating Schedule is requested id : ${user.email}`);
    const requestTime = getCurrentTime();
    const result = new Promise((resolve, rejects) => {
      NoteDB.collection(user.email)
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
          } else {
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

    return await result;
  }
}
