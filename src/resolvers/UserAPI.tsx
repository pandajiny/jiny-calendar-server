import { UserDB } from "../app";
import { NoteDB } from "../app";
import { isString, isArray } from "util";

type CheckExistProps = {
  email: string;
};

export async function CheckExist({ email }: CheckExistProps): Promise<Boolean> {
  console.log(`check with ${email}`);
  return new Promise((resolve) => {
    UserDB.collection("Users")
      .find({ email: email })
      .toArray()
      .then((data) => {
        if (data.length > 0) {
          if (NoteDB.collection(email)) {
            console.log(`${email} is Exist`);
            resolve(true);
          } else {
            console.log(`${email} is exist, but Personal Note storage is not`);
            resolve(false);
          }
        } else {
          console.log(`${email} is not exist`);
          resolve(false);
        }
      });
  });
}

type RequestLoginProps = {
  email: string;
  password: string;
};

type RequestLoginResult = {
  isPassed: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  message: string;
};

export async function RequestLogin({
  email,
  password,
}: RequestLoginProps): Promise<RequestLoginResult> {
  let name: string = "";
  console.log(`Login Request ${email}`);
  if (await CheckExist({ email: email })) {
    return new Promise<RequestLoginResult>((resolve) => {
      UserDB.collection("Users")
        .findOne({ email: email, password: password })
        .catch((error) => {
          resolve({ isPassed: false, user: null, message: "Error occured" });
        })
        .then((result) => {
          console.log(result);
          if (isString(result.name) && isString(result.email)) {
            resolve({
              isPassed: true,
              user: { name: result.name, email: result.email },
              message: "Login Passed",
            });
          }
        });
    });
  } else {
    console.log(`user not exist`);
    return { isPassed: false, user: null, message: "Login Failed" };
  }
}

type RequestSignupProps = {
  name: string;
  email: string;
  password: string;
};

type RequestSignupResult = {
  isPassed: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  message: string;
};

export async function RequestSignup({
  name,
  email,
  password,
}: RequestSignupProps): Promise<RequestSignupResult> {
  console.log(`Signup Request : ${email}`);

  if (await CheckExist({ email })) {
    //   throw new Error(`${email} is Duplicated.`);
    return {
      isPassed: false,
      user: null,
      message: "This email Id is duplicated!",
    };
  } else {
    return new Promise((resolve) => {
      UserDB.collection("Users")
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
          NoteDB.createCollection(email).then((result) => {
            NoteDB.collection(email)
              .insertOne({ type: "initial document" })
              .then((result) => {
                if (data && isArray(data.ops)) {
                  if (
                    isString(data.ops[0].name) &&
                    isString(data.ops[0].email)
                  ) {
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
}
