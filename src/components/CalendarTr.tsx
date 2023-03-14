import React from "react";
import styled from "styled-components";
import CalendarTd from "./CalendarTd";

const BodyTr = styled.tr.attrs({
  className: "d-flex w-100 pb-2",
})`
  height: 12vh;
`;

type CalendarTrProps = {
  dateArr: string[];
  trIdx: number;
};

const CalendarTr = ({ dateArr, trIdx }: CalendarTrProps) => {
  return (
    <BodyTr>
      {dateArr.map((date, i) => (
        <CalendarTd formattedDate={date} key={date} tdIdx={i} trIdx={trIdx} />
      ))}
    </BodyTr>
  );
};

export default CalendarTr;
