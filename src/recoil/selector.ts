import { selector } from "recoil";
import { currentTime } from "../function/ currentTime";
import {
  bedTimeState,
  getUpState,
  startDateState,
  targetContentValue,
  todayTargetState,
  wakeUpTimeState,
} from "./atom";

//기상 시간 값
export const wakeUpTimeValState = selector({
  key: "wakeUpTimeValState",
  get: ({ get }) => {
    const wakeupTime = Number(get(wakeUpTimeState).slice(0, 2));
    return wakeupTime;
  },
});

//기상 체크 상태 저장
export const getUpTimeState = selector({
  key: "getUpTimeState",
  get: ({ get }) => {
    return get(getUpState) && currentTime();
  },
});

//취침 시간 값
export const bedState = selector({
  key: "bedState",
  get: ({ get }) => {
    const bedTime = Number(get(bedTimeState).slice(0, 2));
    return bedTime;
  },
});

//등록된 목표의 개수
export const targetContentLength = selector({
  key: "targetContentLength",
  get: ({ get }) => {
    const targetContentArr = get(targetContentValue);
    return targetContentArr.length;
  },
});

//오늘의 목표 값
export const todayValueState = selector({
  key: "todayValueState",
  get: ({ get }) => {
    const targetContent = get(targetContentValue);
    const todayIdx = get(todayTargetState);
    return todayIdx && targetContent[todayIdx];
  },
});

//년 월 상태
export const yearMonthState = selector({
  key: "yearMonthState",
  get: ({ get }) => {
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    const date = get(startDateState);
    const yearMonthDay = new Date(date.getTime() + TIME_ZONE)
      .toISOString()
      .replace("T", " ")
      .slice(0, 7);
    const year = yearMonthDay.slice(0, 4);
    const month = yearMonthDay.slice(5, 7);
    return [year, month];
  },
});
