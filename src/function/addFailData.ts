import { isToday, isYesterday } from "date-fns";
import { SuccessData } from "../type/type";
import { getLastKey } from "./getLastKey";
import { trackingPast } from "./timeUtill/trackingPast";

/**
 * @param target 캘린더에 기록된 목표들
 * @returns 실패 또는 미출석 데이터
 */
export const addFailData = (target: {}) => {
  if (Object.keys(target).length === 0) {
    return {};
  }
  const lastKey = getLastKey(target)!;
  console.log(lastKey);
  if (isToday(new Date(lastKey)) || isYesterday(new Date(lastKey))) {
    return {};
  }
  const lastPeriodData = trackingPast(lastKey).slice(1); //마지막 날도 실패로 바뀌길래 수정
  const data = lastPeriodData.reduce((acc: SuccessData, date) => {
    acc[date] = ["실패", "목표 미설정", "미출석"];
    return acc;
  }, {});
  return data;
};
