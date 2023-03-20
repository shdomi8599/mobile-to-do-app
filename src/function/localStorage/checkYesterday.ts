import { isYesterday } from "date-fns";
import { getLocalStorage } from "./getLocalStorage";
import { removeLocalStorage } from "./removeLocalStorage";
import { setLocalStorage } from "./setLocalStorage";

export const checkYesterday = () => {
  const data = getLocalStorage("todayContent");
  if (data && isYesterday(new Date(data.date))) {
    setLocalStorage("yesterdayContent", data);
    removeLocalStorage("todayContent");
    return data;
  }
  return undefined;
};
