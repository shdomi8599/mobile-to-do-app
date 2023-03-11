import { atom, selector } from "recoil";
import { sigObj } from "./type";

//텍스트 값
export const textState = atom({
  key: "textState",
  default: "",
});

//텍스트 박스 상태
export const textBoxState = atom({
  key: "textBoxState",
  default: false,
});

//기상 시간
export const wakeUpTimeState = atom({
  key: "wakeUpTime",
  default: "08:00",
});

//기상 시간 값
export const wakeUpState = selector({
  key: "wakeUpState",
  get: ({ get }) => {
    const wakeupTime = Number(get(wakeUpTimeState).slice(0, 2));
    return wakeupTime;
  },
});

//취침 시간
export const bedTimeState = atom({
  key: "bedTimeState",
  default: "23:00",
});

//취침 시간 값
export const bedState = selector({
  key: "bedState",
  get: ({ get }) => {
    const bedTime = Number(get(bedTimeState).slice(0, 2));
    return bedTime;
  },
});

//목표 설정 값들
export const targetContentValue = atom<string[]>({
  key: "targetContentValue",
  default: [],
});

//등록된 목표의 개수
export const targetContentLength = selector({
  key: "targetContentLength",
  get: ({ get }) => {
    const targetContentArr = get(targetContentValue);
    return targetContentArr.length;
  },
});

//오늘의 목표 인덱스
export const todayTargetState = atom({
  key: "todayTarget",
  default: 0,
});

//오늘의 목표 값
export const todayValueState = selector({
  key: "todayValueState",
  get: ({ get }) => {
    const targetContent = get(targetContentValue);
    const todayIdx = get(todayTargetState);
    return targetContent[todayIdx];
  },
});

//스케줄 설정
export const scheduleDataState = atom<sigObj>({
  key: "scheduleDataState",
  default: {},
});

//네비 상태
export const navState = atom({
  key: "navState",
  default: false,
});

//달력 값 상태
export const startDateState = atom({
  key: "startDateState",
  default: new Date(),
});

//년 월 상태
export const yearMonthState = selector({
  key: "yearMonthState",
  get: ({ get }) => {
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    const date = get(startDateState);
    const yearMonth = new Date(date.getTime() + TIME_ZONE)
      .toISOString()
      .replace("T", " ")
      .slice(0, 7);
    const year = yearMonth.slice(0, 4);
    const month = yearMonth.slice(5, 7);
    return [year, month];
  },
});
