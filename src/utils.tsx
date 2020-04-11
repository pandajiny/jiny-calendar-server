type Time = {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
};

export function getCurrentTime(): Time {
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
