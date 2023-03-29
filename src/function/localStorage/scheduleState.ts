import { getLocalStorage } from "./getLocalStorage";

/**
 * 스케줄 데이터를 반환하는 함수
 * @returns 스케줄 데이터
 */
export const scheduleState = () => {
  const data = getLocalStorage("scheduleData");
  if (data) {
    return data.scheduleData;
  } else {
    return {};
  }
};
