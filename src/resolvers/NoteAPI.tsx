import { UserDB } from "../app";
import { NoteDB } from "../app";

import { CheckExist } from "./UserAPI";

import { getCurrentTime } from "../utils";
import { request } from "express";
import { resolve } from "dns";
import { isArray, isBoolean, isString } from "util";
import { scheduleTypes } from "../schemas/note";

type ContentType = "SCHEDULE" | "DIARY" | "SCHEDULE";

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
  type: ContentType;
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
  if (
    await new Promise((resolve) => resolve(!CheckExist({ email: user.email })))
  ) {
    console.log(`not exist user : ${user.email}`);
    return {
      isPassed: false,
      requestTime: requestTime,
      scheduleTime: null,
      content: { body: "wrong request, not exist User", type: "SCHEDULE" },
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
          } else {
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
          if (data && isArray(data)) {
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

type CreateDiaryProps = {
  user: RequestUser;
  content: DiaryContent;
};

type DiaryContent = {
  body: string;
  type: ContentType;
};

type CreateDiaryResult = {
  isPassed: boolean;
  requestTime: RequestTime;
  scheduleTime: ScheduleTime;
  user: RequestUser;
  content: DiaryContent;
};

export async function createDiary({
  user,
  content,
}: CreateDiaryProps): Promise<CreateDiaryResult> {
  console.log(`${user.email} request Create Diary`);
  // Make Request Time Object for now
  const requestTime = getCurrentTime();

  // validate user Information
  if (
    await new Promise((resolve) => resolve(!CheckExist({ email: user.email })))
  ) {
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
  } else {
    return new Promise((resolve) => {
      NoteDB.collection(user.email)
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
          } else {
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
}
