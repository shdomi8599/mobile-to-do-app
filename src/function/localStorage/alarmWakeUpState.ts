import { getLocalStorage } from "./getLocalStorage";

export const alarmWakeUpState = () => {
  const data = getLocalStorage("alarmWakeUp");
  if (data) {
    return data.alarmWakeUp;
  } else {
    return "08:00";
  }
};
