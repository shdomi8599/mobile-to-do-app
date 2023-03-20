import { isToday } from "date-fns";
import { getLocalStorage } from "./getLocalStorage";
import { removeLocalStorage } from "./removeLocalStorage";

/**
 * 키 값을 전달받아서 오늘 날짜의 데이터인지 체크하고 오늘 날짜의 데이터가 아니라면 삭제
 * @param key 로컬스토리지 키 값
 */
export const checkToday = (key: string) => {
  const data = getLocalStorage(key);
  if (data && !isToday(new Date(data.date))) {
    removeLocalStorage(key);
  }
};
