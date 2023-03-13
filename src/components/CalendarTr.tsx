import React from "react";
import styled from "styled-components";
import CalendarTd from "./CalendarTd";

const BodyTr = styled.tr.attrs({
  className: "d-flex w-100 pb-2",
})`
  height: 12vh;
`;

const CalendarTr = ({
  dateArr,
  trIdx,
}: {
  dateArr: string[];
  trIdx: number;
}) => {
  return (
    <BodyTr>
      {dateArr.map((date, i) => (
        <CalendarTd formattedDate={date} key={i} tdIdx={i} trIdx={trIdx} />
      ))}
    </BodyTr>
  );
};

export default CalendarTr;
