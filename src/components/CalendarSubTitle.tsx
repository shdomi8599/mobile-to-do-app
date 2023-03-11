import SelectionCalendar from "./SelectionCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { startDateState } from "../atom";
import React from "react";

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

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div>
        <SelectionCalendar />
      </div>
      <div className="me-3">
        <FontAwesomeIcon
          onClick={downEvent}
          className="fs-1 mx-2 pointer trans-click"
          icon={faCaretUp}
        />
        <FontAwesomeIcon
          onClick={upEvent}
          className="fs-1 mx-2 pointer trans-click pb-1"
          icon={faCaretDown}
        />
      </div>
    </div>
  );
};

export default CalendarSubTitle;
