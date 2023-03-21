import { getLocalStorage } from "./getLocalStorage";

export const scheduleState = () => {
  const data = getLocalStorage("scheduleData");
  if (data) {
    return data.scheduleData;
  } else {
    return {};
  }
};
