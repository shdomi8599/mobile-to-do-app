import { format } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { addDays } from "date-fns";
import { startDateState } from "../recoil/atom";
import { useRecoilValue } from "recoil";
import React, { useMemo } from "react";
import CalendarTr from "./CalendarTr";
import { v4 as uuidv4 } from "uuid";

const CalendarTbody = () => {
  //현재 선택되있는 달력 상태 값
  const startDate = useRecoilValue(startDateState);

  //현재 선택되있는 달력 값 달 시작 날짜
  const monthStart = useMemo(() => {
    return startOfMonth(startDate);
  }, [startDate]);

  //현재 선택되있는 달력 값 달 마지막 날짜
  const monthEnd = useMemo(() => {
    return endOfMonth(monthStart);
  }, [monthStart]);

  // endOfMonth(monthStart);
  //현재 선택되있는 달력의 주 첫번째 날짜
  const firstDate = useMemo(() => {
    return startOfWeek(monthStart);
  }, [monthStart]);

  //현재 선택되있는 달력의 이번 주 마지막 날짜
  const endDate = useMemo(() => {
    return endOfWeek(monthEnd);
  }, [monthEnd]);

  //선택된 달의 날짜 값을 배열에 담는 작업
  //큐 개념을 활용해서 만드는 방법이 없을까 고민중
  const trData: string[][] = [];
  let tdData: string[] = [];
  let day = firstDate;
  let formattedDate = "";

  while (day <= endDate) {
    formattedDate = format(day, "d");
    tdData.push(formattedDate);
    day = addDays(day, 1);
    if (tdData.length === 7) {
      trData.push(tdData);
      tdData = [];
    }
  }

  return (
    <>
      <tbody key={uuidv4()} className="w-100">
        {trData.map((tr, i) => (
          <CalendarTr dateArr={tr} key={i} trIdx={i} />
        ))}
      </tbody>
    </>
  );
};

export default CalendarTbody;
