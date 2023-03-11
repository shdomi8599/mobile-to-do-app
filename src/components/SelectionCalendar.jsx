import React, { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { useRecoilState, useRecoilValue } from "recoil";
import { startDateState, yearMonthState } from "../atom";
import ko from "date-fns/locale/ko"; // 한국어적용
registerLocale("ko", ko); // 한국어적용

const SelectionCalendar = () => {
  //현재 달력값 상태
  const [startDate, setStartDate] = useRecoilState(startDateState);

  //년, 월 값
  const [year, month] = useRecoilValue(yearMonthState);

  //커스텀 input
  const CustomInput = forwardRef(({ onClick }, ref) => (
    <span onClick={onClick} ref={ref}>
      {`${year}년 ${month}월`}
    </span>
  ));

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      locale={ko}
      showMonthYearPicker //년,월만 선택가능한 옵션
      customInput={<CustomInput />}
    />
  );
};

export default SelectionCalendar;
