import { atom } from "recoil";
import { checkTodayTarget } from "../function/localStorage/checkTodayTargetState";
import { SigObj, SuccessData } from "../type/type";
import { localState } from "../function/localStorage/localState";

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
export const wakeUpTimeState = atom<string>({
  key: "wakeUpTime",
  default: localState("alarmWakeUp", "08:00"),
});

//기상 체크 상태
export const getUpState = atom({
  key: "getUpState",
  default: false,
});

//취침 시간
export const bedTimeState = atom<string>({
  key: "bedTimeState",
  default: localState("alarmBed", "23:00"),
});

//목표 설정 값들
export const targetContentValue = atom<string[]>({
  key: "targetContentValue",
  default: localState("targetContent", []),
});

//오늘의 목표 인덱스
export const todayTargetState = atom<number | undefined>({
  key: "todayTarget",
  default: checkTodayTarget(),
});

//어제의 목표 상태
export const yesterdayContentState = atom<string>({
  key: "yesterdayContentState",
  default: localState("yesterdayContent", ""),
});

//스케줄 설정
export const scheduleDataState = atom<SigObj>({
  key: "scheduleDataState",
  default: localState("scheduleData", {}),
});

//알람 설정
export const alarmDataState = atom<any>({
  key: "alarmDataState",
  default: () => {
    const data = localState("alarmData", {});
    if (Object.keys(data).length !== 0) {
      return data;
    } else {
      const data = localState("scheduleData", {});
      for (let key in data) {
        data[key] = false;
      }
      return data;
    }
  },
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

//타겟 성공 데이터
export const successTargetState = atom<SuccessData>({
  key: "successTargetState",
  default: localState("calendarVal", {}),
});

//모달 상태
export const modalState = atom({
  key: "modalState",
  default: false,
});

//모달 값 상태
export const modalValState = atom<SigObj>({
  key: "modalValState",
  default: undefined,
});

//alert모달 상태
export const alertModalState = atom({
  key: "alertModalState",
  default: false,
});

//모달 값 상태
export const alertModalValState = atom({
  key: "alertModalValState",
  default: "",
});

//선택한 시간 상태
export const pickTimeState = atom({
  key: "pickTimeState",
  default: 0,
});
