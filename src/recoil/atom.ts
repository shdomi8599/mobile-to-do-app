import { atom } from "recoil";
import { successTarget } from "../data/successTarget";
import { addFailData } from "../function/addSuccessData";
import { SigObj } from "../type/type";

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

//기상 체크 상태
export const getUpState = atom({
  key: "getUpState",
  default: false,
});

//취침 시간
export const bedTimeState = atom({
  key: "bedTimeState",
  default: "23:00",
});

//목표 설정 값들
export const targetContentValue = atom<string[]>({
  key: "targetContentValue",
  default: [],
});

//오늘의 목표 인덱스
export const todayTargetState = atom<number | undefined>({
  key: "todayTarget",
  default: undefined,
});

//스케줄 설정
export const scheduleDataState = atom<SigObj>({
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

//타겟 성공 데이터
export const successTargetState = atom({
  key: "successTargetState",
  default: { ...successTarget, ...addFailData() },
});

/**
 * const lastKey = getLastKey(successTarget)
 * const lastPeriodData = trackingPast(lastKey)
 * const addSuccessData = lastPeriodData.reduce((acc:SuccessData,date) =>{
 * acc[date] = ["실패","목표 미설정","미출석"];
 * return acc;
 * },{})
 * default : {...successTarget,...addSuccessData}
 */

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

//선택한 시간 상태
export const pickTimeState = atom({
  key: "pickTimeState",
  default: 0,
});
