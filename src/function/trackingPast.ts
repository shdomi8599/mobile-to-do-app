import { eachDayOfInterval } from "date-fns";

export const trackingPast = (date: string) => {
  const startDate = new Date(date);
  console.log(startDate);
  const endDate = new Date();

  const dates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  return dates;
};
