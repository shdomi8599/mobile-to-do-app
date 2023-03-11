import styled from "styled-components";
import CalendarTd from "./CalendarTd";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import { startDateState } from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";

const HeadTh = styled.th.attrs({
  className: "flex-grow-1 text-center",
})`
  color: ${(props) =>
    (props.date === "일" && "red") || (props.date === "토" && "blue")};
`;

const BodyTr = styled.tr.attrs({
  className: "d-flex w-100 pb-2",
})`
  height: 10.5vh;
`;

const Calendar = () => {
  //현재 달력값 상태
  const startDate = useRecoilValue(startDateState);
  const currentMonth = startDate.getMonth();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const firstDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
console.log(monthStart)

  const tdArr = Array(7).fill(1);
  const dateArr = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <table className="d-flex justify-content-center align-items-center w-100 flex-column">
      <thead className="w-100">
        <tr className="d-flex w-100 pb-2">
          {dateArr.map((date) => (
            <HeadTh key={date} date={date}>
              {date}
            </HeadTh>
          ))}
        </tr>
      </thead>
      <tbody className="w-100">
        <BodyTr>
          {tdArr.map((x, i) => (
            <CalendarTd key={i} />
          ))}
        </BodyTr>
      </tbody>
    </table>
  );
};

export default Calendar;
