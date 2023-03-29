import { isYesterday } from "date-fns";
import { getLocalStorage } from "./getLocalStorage";
import { removeLocalStorage } from "./removeLocalStorage";
import { setLocalStorage } from "./setLocalStorage";

/**
 * 오늘의 목표가 어제의 값이라면 어제값에 저장하고 오늘의 목표를 삭제하는 함수
 */
export const yesterdayState = async () => {
  const data = getLocalStorage("todayContent");
  if (data && isYesterday(new Date(data.date))) {
    setLocalStorage("yesterdayContent", data.todayContent);
    removeLocalStorage("todayContent");
  }
};
