import { useRecoilState } from "recoil";
import React from "react";
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import { startDateState } from "../../recoil/atom";
import SelectionCalendar from "./SelectionCalendar";

const CalendarSubTitle = () => {
  //현재 달력값 상태
  const [startDate, setStartDate] = useRecoilState(startDateState);

  /**
   * 다음 달 이동
   */
  const upEvent = () => {
    const month = startDate.getMonth();
    const newDate = new Date(startDate.setMonth(month + 1));
    setStartDate(newDate);
  };

  /**
   * 이전 달 이동
   */
  const downEvent = () => {
    const month = startDate.getMonth();
    const newDate = new Date(startDate.setMonth(month - 1));
    setStartDate(newDate);
  };

  //아이콘 메모이제이션
  const UpIcon = React.memo(BsCaretUpFill);
  const DownIcon = React.memo(BsCaretDownFill);

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div>
        <SelectionCalendar />
      </div>
      <div className="me-3">
        <UpIcon onClick={downEvent} className="fs-3 mx-2 pointer trans-click" />
        <DownIcon
          onClick={upEvent}
          className="fs-3 mx-2 pointer trans-click "
        />
      </div>
    </div>
  );
};

export default CalendarSubTitle;
