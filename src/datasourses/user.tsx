import { DataSource } from "apollo-datasource";
import { UserDB } from "../app";
import { NoteDB } from "../app";

export class UserAPI extends DataSource {
  hello(message: string) {
    return "world";
  }

  async RequestSignup(name: string, email: string, password: string) {
    console.log(`Signup Request : ${email}`);

    if (await this.CheckExist(email)) {
      //   throw new Error(`${email} is Duplicated.`);
      return {
        isPassed: false,
        user: { email: "", name: "" },
        message: "This email Id is duplicated!",
      };
    } else {
      const newUser = new Promise((resolve, rejects) => {
        UserDB.collection("Users")
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
            NoteDB.createCollection(email).then((result) => {
              NoteDB.collection(email)
                .insertOne({ type: "initial document" })
                .then((result) => {
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
      });
      return (await newUser) || null;
    }
  }

  async RequestLogin({ email, password }: { email: string; password: string }) {
    console.log(`Login Request ${email}`);
    if (await this.CheckExist(email)) {
      const request = new Promise((resolve, rejects) => {
        UserDB.collection("Users")
          .findOne({ email: email, password: password })
          .catch((error) => {
            rejects({ error });
          })
          .then((result) => {
            // console.log(result);
            resolve({
              isPassed: true,
              user: { name: result.name, email: result.email },
              message: `Suceesful Login with ${result.email}`,
            });
          });
      });
      return await request;
    } else {
      console.log(`user not exist`);
      return null;
    }
  }

  // Get email, and Check Duplication from Server.
  // True : it's duplicated || False : it's no problem
  async CheckExist(email: string) {
    console.log(`check with ${email}`);
    const result = new Promise((resolve) => {
      UserDB.collection("Users")
        .find({ email: email })
        .toArray()
        .then((data) => {
          if (data.length > 0) {
            if (NoteDB.collection(email)) {
              console.log(`${email} is already Exist`);
              resolve(true);
            } else {
              console.log(`${email} is not exist`);
              resolve(false);
            }
          }
        });
    });
    return await result;
  }
}
