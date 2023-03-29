import { isToday, isYesterday } from "date-fns";
import { SuccessData } from "../type/type";
import { getLastKey } from "./getLastKey";
import { trackingPast } from "./timeUtill/trackingPast";

export const addFailData = (target: {}) => {
  if (Object.keys(target).length === 0) {
    return {};
  }
  const lastKey = getLastKey(target)!;
  if (isToday(new Date(lastKey)) || isYesterday(new Date(lastKey))) {
    return {};
  }
  const lastPeriodData = trackingPast(lastKey);
  const data = lastPeriodData.reduce((acc: SuccessData, date) => {
    acc[date] = ["실패", "목표 미설정", "미출석"];
    return acc;
  }, {});
  return data;
};
