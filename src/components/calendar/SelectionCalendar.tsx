import React, { ForwardedRef, forwardRef, useEffect, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import { useRecoilState, useRecoilValue } from "recoil";
import { holidayState, startDateState } from "../../recoil/atom";
import { yearMonthState } from "../../recoil/selector";
import ko from "date-fns/locale/ko"; // 한국어적용
import { getHoliday } from "../../function/api/getHoliday";
registerLocale("ko", ko); // 한국어적용
// ForwardedRef<HTMLSpanElement>
interface Props extends Omit<ReactDatePickerProps, "onChange"> {
  onClick(): void;
}

const SelectionCalendar = () => {
  //공휴일 상태
  const [, setHoliday] = useRecoilState(holidayState);

  //현재 달력값 상태
  const [startDate, setStartDate] = useRecoilState(startDateState);

  //년, 월 값
  const [year, month] = useRecoilValue(yearMonthState);

  //달력 값 메모이제이션
  const calendarValue = useMemo(() => `${year}년 ${month}월`, [year, month]);

  useEffect(() => {
    getHoliday(Number(year)).then((res) => {
      setHoliday(res);
    });
  }, [setHoliday, year]);

  //커스텀 input
  const CustomInput = forwardRef(
    ({ onClick }: Props, ref: ForwardedRef<HTMLSpanElement>) => (
      <span onClick={onClick} ref={ref}>
        {calendarValue}
      </span>
    )
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
      locale={ko}
      showMonthYearPicker //년,월만 선택가능한 옵션
      customInput={
        <CustomInput
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      }
    />
  );
};

export default SelectionCalendar;
