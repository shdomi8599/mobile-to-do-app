/**
 * object.keys를 활용하면 새로운 배열을 생성하게 됨으로
 * 메모리를 잡아먹기때문에 성능 저하를 막기 위해 for in을 활용
 * @param obj successTarget 상태 객체를 전달받는 함수
 * @returns 마지막 키를 뽑아주는 함수
 */
export const getLastKey = (obj: {}) => {
  let lastKey;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      lastKey = key;
    }
  }
  return lastKey;
};
