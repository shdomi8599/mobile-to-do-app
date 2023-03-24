import { successTarget } from "../data/successTarget"; // successTarget 모듈을 불러온다.
import { SuccessData } from "../type/type"; // SuccessData 타입을 불러온다.
import { getLastKey } from "./getLastKey"; // getLastKey 모듈을 불러온다.
import { trackingPast } from "./timeUtill/trackingPast"; // trackingPast 모듈을 불러온다.

export const addFailData = () => {
  // addFailData 함수를 선언한다.
  const lastKey = getLastKey(successTarget)!; // successTarget에서 마지막 키 값을 가져온다.
  const lastPeriodData = trackingPast(lastKey); // 마지막 키 값을 기준으로 과거 데이터를 추적한다.
  const data = lastPeriodData.reduce((acc: SuccessData, date) => {
    // reduce 함수를 사용하여 SuccessData 타입의 객체를 생성한다.
    acc[date] = ["실패", "목표 미설정", "미출석"]; // 해당 날짜의 데이터를 ["실패", "목표 미설정", "미출석"]으로 설정한다.
    return acc; // 객체를 반환한다.
  }, {});
  return data; // 생성된 객체를 반환한다.
};
