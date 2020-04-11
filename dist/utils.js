"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentTime() {
    const current = new Date();
    return {
        year: current.getFullYear(),
        month: current.getMonth(),
        date: current.getDate(),
        hour: current.getHours(),
        minute: current.getMinutes(),
        second: current.getSeconds(),
    };
}
exports.getCurrentTime = getCurrentTime;
