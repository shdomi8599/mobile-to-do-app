import { atom, selector } from "recoil";

//타겟 val
export const targetContentValue = atom({
  key: "targetContentValue",
  default: ["리코일 공부"],
});

//텍스트 val
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

//오늘의 목표 인덱스
export const todayTargetState = atom({
  key: "todayTarget",
  default: undefined,
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
export const scheduleDataState = atom({
  key: "scheduleDataState",
  default: {},
});

//네비 상태
export const navState = atom({
  key: "navState",
  default: false,
});
