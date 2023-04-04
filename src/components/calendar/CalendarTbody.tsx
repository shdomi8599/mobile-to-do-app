import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";
import { useRecoilValue } from "recoil";
import React, { useMemo } from "react";
import { holidayState, startDateState } from "../../recoil/atom";
import CalendarTr from "./CalendarTr";

const CalendarTbody = () => {
  //td에서 holiday를 직접 호출했더니 get요청이 td수만큼 들어가서 tbody에서 내리는 것으로 결정
  const holiday = useRecoilValue(holidayState);

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
  /**
   * key 속성을 부모에게 부여했을 때는
   * React가 각 요소를 개별적으로 인식해 각 요소가 크게 하나로 묶여 렌더링이
   * 되는 원리를 이용해서 하나로 묶어서 한번에 랜더링이 되도록 tbody에 키를 부여
   */
  return (
    <>
      <tbody key={formattedDate} className="w-100">
        {trData.map((tr, i) => (
          <CalendarTr
            dateArr={tr}
            key={`${i}+${tr[0]}`}
            trIdx={i}
            holiday={holiday}
          />
        ))}
      </tbody>
    </>
  );
};

export default CalendarTbody;
