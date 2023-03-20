import { getLocalStorage } from "./getLocalStorage";

export const alarmBedState = () => {
  const data = getLocalStorage("alarmBed");
  if (data) {
    return data.alarmBed;
  } else {
    return "23:00";
  }
};
