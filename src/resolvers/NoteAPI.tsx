import { UserDB } from "../app";
import { NoteDB } from "../app";

import { CheckExist } from "./UserAPI";

import { getCurrentTime } from "../utils";
import { request } from "express";
import { resolve } from "dns";
import { isArray, isBoolean, isString } from "util";
import { scheduleTypes } from "../schemas/note";

type RequestTime = {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
};

type ScheduleTime = {
  year: number;
  month: number;
  date: number;
};

type RequestUser = {
  email: string;
};

type ScheduleContent = {
  body: String;
};

type CreateScheduleProps = {
  scheduleTime: ScheduleTime;
  user: RequestUser;
  content: ScheduleContent;
};

type CreateScheduleResult = {
  isPassed: boolean;
  requestTime: RequestTime;
  scheduleTime: ScheduleTime | null;
  user: RequestUser;
  content: ScheduleContent;
};

export async function createSchedule({
  scheduleTime,
  user,
  content,
}: CreateScheduleProps): Promise<CreateScheduleResult> {
  console.log(`${user.email} request Create Schedule`);
  const requestTime = getCurrentTime();
  if (new Promise((resolve) => resolve(!CheckExist({ email: user.email })))) {
    console.log(`not exist user : ${user.email} `);
    return {
      isPassed: false,
      requestTime: requestTime,
      scheduleTime: null,
      content: { body: "wrong request, not exist User" },
      user: { email: user.email },
    };
  } else {
    return new Promise((resolve) => {
      NoteDB.collection(user.email)
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
          } else {
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
}

type GetAllSchedulesProps = {
  email: string;
};

type Schedule = {
  requestTime: RequestTime;
  scheduleTime: ScheduleTime;
  user: RequestUser;
  content: ScheduleContent;
};

type GetSchedulesResult = {
  isPassed: boolean;
  requestTime: RequestTime;
  user: {
    email: string;
  };
  result: Schedule[] | null;
  message: string;
};

export async function getAllSchedules({
  email,
}: GetAllSchedulesProps): Promise<GetSchedulesResult> {
  console.log(`${email} : get all schedules`);
  const requestTime = getCurrentTime();
  if (new Promise((resolve) => resolve(CheckExist({ email })))) {
    return new Promise((resolve) => {
      NoteDB.collection(email)
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
          if (data && isArray(data)) {
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
  } else {
    return {
      isPassed: false,
      requestTime,
      result: null,
      user: { email: email },
      message: "wrong request : not exist user",
    };
  }
}

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
