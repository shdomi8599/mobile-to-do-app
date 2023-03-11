import styled from "styled-components";
import { format } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, addDays } from "date-fns";
import { startDateState } from "../atom";
import { useRecoilValue } from "recoil";
import React from "react";

const BodyTr = styled.tr.attrs({
  className: "d-flex w-100 pb-2",
})`
  height: 12vh;
`;

const CheckedSpan = styled.span.attrs({
  className: "pointer bg-dark text-white border p-1 rounded",
})``;

const CalendarTbody = () => {
  // 현재 선택되있는 달력 상태 값
  const startDate = useRecoilValue(startDateState);

  //현재 선택되있는 달력 값 달 시작 날짜
  const monthStart = startOfMonth(startDate);

  //현재 선택되있는 달력 값 달 마지막 날짜
  const monthEnd = endOfMonth(monthStart);

  //현재 선택되있는 달력의 주 첫번째 날짜
  const firstDate = startOfWeek(monthStart);

  //현재 선택되있는 달력의 이번 주 마지막 날짜
  const endDate = endOfWeek(monthEnd);

  //td를 모두 담은 배열
  const rows = [];

  //1주 값 배열
  let days = [];
  let day = firstDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      days.push(
        <td
          className={`flex-grow-1 d-flex justify-content-start align-items-center flex-column w-100 ${
            !isSameMonth(day, monthStart) && "disabled"
          }`}
          key={day.getDay()}
        >
          <div className="pb-1">
            <span>{formattedDate}</span>
          </div>
          <div>
            <CheckedSpan>성공</CheckedSpan>
          </div>
        </td>
      );
      day = addDays(day, 1);
    }
    rows.push(<BodyTr key={day.getDay()}>{days}</BodyTr>);
    days = [];
  }
  return <tbody className="w-100">{rows}</tbody>;
};

export default CalendarTbody;
