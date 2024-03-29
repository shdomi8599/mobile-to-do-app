import { getLocalStorage } from "./getLocalStorage";
import { localState } from "./localState";

/**
 * @returns 오늘의 목표 값이 로컬에 존재한다면 해당 index를 리턴
 */
export const checkTodayTarget = () => {
  const targetArr = localState("targetContent", []);
  if (targetArr.length === 0) {
    return undefined;
  }
  if (getLocalStorage("todayContent")) {
    const todayTarget = getLocalStorage("todayContent").todayContent;
    const index = targetArr.findIndex((x: string) => x === todayTarget);
    return index === -1 ? undefined : index;
  }
  return undefined;
};
