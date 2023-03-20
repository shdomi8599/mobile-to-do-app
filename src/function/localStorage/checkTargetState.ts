import { getLocalStorage } from "./getLocalStorage";

/**
 * 로컬에 저장된 목표로 등록해놓은 값들을 상태로 등록하기 위한 함수
 * @returns 로컬에 저장된 목표로 등록해놓은 값들을 반환
 */
export const checkTarget = () => {
  const data = getLocalStorage("targetContent");
  if (data) {
    return data.targetContent;
  } else {
    return [];
  }
};
