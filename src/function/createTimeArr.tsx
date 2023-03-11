export const createTimeArr = () => {
  return Array(24)
    .fill(0)
    .map((x, i) => (x = x + i));
};
