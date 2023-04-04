import { eachDayOfInterval, format, subDays } from "date-fns";

/**
 * 달력에 마지막으로 표시된 실패 또는 성공이 체크된 날짜를 전달받아서
 * 미접속 기간을 모두 담은 배열을 리턴하는 함수
 * @param date 달력에 마지막으로 표시된 실패 또는 성공이 체크된 날짜
 * @returns 미접속 기간을 모두 담은 배열
 */
export const trackingPast = (date: string) => {
  const startDate = new Date(date)
  const dayAgo = subDays(new Date(), 1);
  const dates = eachDayOfInterval({
    start: startDate,
    end: dayAgo,
  }).map((date) => format(date, "yyyy-MM-dd"));
  return dates;
};
