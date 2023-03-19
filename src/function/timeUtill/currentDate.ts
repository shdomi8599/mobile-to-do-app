import { format } from "date-fns";

/**
 * 오늘 날짜
 */
export const currentDate = () => {
  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd');
  return formattedDate;
};
