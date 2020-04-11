import { DataSource } from "apollo-datasource";
import { UserDB } from "../app";
import { resolve } from "dns";
import { rejects } from "assert";

export class UserAPI extends DataSource {
  hello(message: string) {
    return "world";
  }

  async RequestSignup(name: string, email: string, password: string) {
    console.log(`Signup Request : ${email}`);

    if (await this.CheckDuplication(email)) {
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
            UserDB.createCollection(email).then((result) => {
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
      return (await newUser) || null;
    }
  }

  // Get email, and Check Duplication from Server.
  // True : it's duplicated || False : it's no problem
  async CheckDuplication(email: string) {
    console.log(`check with ${email}`);
    const result = new Promise((resolve, reject) => {
      UserDB.collection("Users")
        .find({ email: email })
        .toArray()
        .then((data) => {
          //   console.log("data :");
          //   console.log(data);
          if (data.length > 0) {
            console.log(`${email} is already Exist`);
            resolve(true);
          } else {
            console.log(`${email} is not exist`);
            resolve(false);
          }
        });
    });
    return await result;
  }
}
