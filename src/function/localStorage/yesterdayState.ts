import { isYesterday } from "date-fns";
import { getLocalStorage } from "./getLocalStorage";
import { removeLocalStorage } from "./removeLocalStorage";
import { setLocalStorage } from "./setLocalStorage";

export const yesterdayState = () => {
  const data = getLocalStorage("todayContent");
  if (data && isYesterday(new Date(data.date))) {
    setLocalStorage("yesterdayContent", data.todayContent);
    removeLocalStorage("todayContent");
  }
  return undefined;
};