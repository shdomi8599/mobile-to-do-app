import { isAfter, isBefore, isSameMonth } from "date-fns";

/**
 * 이전 달과 다음달, 그리고 이번달을 구분해서 20230311의 형태로 날짜 형태를 반환하는 함수
 */
export const checkDate = (
  formattedDate: string,
  year: string,
  month: string,
  day: Date,
  monthStart: Date
) => {
  let checkDate = formattedDate;
  let checkMonth = Number(month);
  if (checkDate.length === 1) {
    checkDate = 0 + checkDate;
  }
  if (!isSameMonth(day, monthStart) && !isAfter(day, monthStart))
    checkMonth = checkMonth - 1;
  if (!isSameMonth(day, monthStart) && !isBefore(day, monthStart))
    checkMonth = checkMonth + 1;

  if (String(checkMonth).length === 1) {
    checkDate = year + "-0" + checkMonth + "-" + checkDate;
  } else {
    checkDate = year + "-" + checkMonth + "-" + checkDate;
  }
  return checkDate;
};
