import { isBefore } from "date-fns";
import { subDays } from "date-fns";
import { getLocalStorage } from "./getLocalStorage";
import { removeLocalStorage } from "./removeLocalStorage";

/**
 * 로컬의 어제 데이터가 그저께 데이터라면 삭제되는 함수
 */
export const checkDayBeforeYesterday = () => {
  const data = getLocalStorage("yesterdayContent");
  if (data) {
    const date = data.date;
    const yesterday = subDays(new Date(), 2);
    if (isBefore(new Date(date), yesterday)) {
      removeLocalStorage("yesterdayContent");
    }
  }
};
