import { successTarget } from "../data/successTarget";
import { SuccessData } from "../type/type";
import { getLastKey } from "./getLastKey";
import { trackingPast } from "./trackingPast";

export const addFailData = () => {
  const lastKey = getLastKey(successTarget)!;
  const lastPeriodData = trackingPast(lastKey);
  const data = lastPeriodData.reduce((acc: SuccessData, date) => {
    acc[date] = ["실패", "목표 미설정", "미출석"];
    return acc;
  }, {});
  return data;
};
