import { format } from "date-fns";

/**
 * 현재시간을 셋팅
 */
export const currentTime = () => {
  const today = new Date();
  const formattedDate = format(today, "HH:mm");
  return formattedDate;
};
