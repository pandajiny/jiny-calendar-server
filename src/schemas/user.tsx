import { gql } from "apollo-server-express";

export const userTypes = gql`
  type User {
    name: String
    email: String
    password: String
    isLoggedIn: String
  }

  type LoginUser {
    name: String
    email: String
  }

  type RequestUser {
    email: String
  }

  input RequestUserInput {
    email: String
  }

  type LoginResult {
    isPassed: Boolean
    user: LoginUser
    message: String
  }

  type SignupResult {
    isPassed: Boolean
    user: LoginUser
    message: String
  }
`;
