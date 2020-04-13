"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.timeTypes = apollo_server_express_1.gql `
  type RequestTime {
    year: Int
    month: Int
    date: Int
    hour: Int
    minute: Int
    seconds: Int
  }

  type ScheduleTime {
    year: Int
    month: Int
    date: Int
  }
`;
