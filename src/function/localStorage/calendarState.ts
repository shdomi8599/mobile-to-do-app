import { getLocalStorage } from "./getLocalStorage";

export const calendarState = () => {
  const data = getLocalStorage("calendarVal");
  if (data) {
    return data.calendarVal;
  } else {
    return {};
  }
};
