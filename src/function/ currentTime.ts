/**
 * 현재시간을 셋팅
 */
export const currentTime = () => {
  const today = new Date();
  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);
  const dateString = hours + ":" + minutes;
  return dateString;
};
