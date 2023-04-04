import React from "react";
import styled from "styled-components";
import CalendarTd from "./CalendarTd";

const BodyTr = styled.tr.attrs({
  className: "d-flex w-100 pb-2",
})`
  height: 10vh;
`;

type CalendarTrProps = {
  dateArr: string[];
  trIdx: number;
  holiday: number[];
};

const CalendarTr = ({ dateArr, trIdx, holiday }: CalendarTrProps) => {
  return (
    <BodyTr>
      {dateArr.map((date, i) => (
        <CalendarTd formattedDate={date} key={date} tdIdx={i} trIdx={trIdx} holiday={holiday}/>
      ))}
    </BodyTr>
  );
};

export default CalendarTr;
