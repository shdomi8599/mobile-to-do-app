/**
 * 0~23까지를 배열에 넣어서 리턴해주는 함수
 */
export const createTimeArr = () => {
  return Array(24)
    .fill(0)
    .map((x, i) => (x = x + i));
};
