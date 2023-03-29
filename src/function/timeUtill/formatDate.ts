import { format } from "date-fns";

export const formatDate = (successTarget: {}) => {
  const successDayLength = Object.keys(successTarget).length;
  const successLastDay = Object.keys(successTarget)[successDayLength - 1];
  const date = new Date(
    `${successLastDay.slice(0, 4)}-${successLastDay.slice(
      4,
      6
    )}-${successLastDay.slice(6, 8)}`
  );
  const formattedDate = format(date, "yyyy-MM-dd");
  return formattedDate;
};
