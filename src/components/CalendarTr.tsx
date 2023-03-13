import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import CalendarTd from "./CalendarTd";

const BodyTr = styled.tr.attrs({
  className: "d-flex w-100 pb-2",
})`
  height: 12vh;
`;

const CalendarTr = ({ data, trIdx }: { data: string[]; trIdx: number }) => {
  return (
    <BodyTr key={uuidv4()}>
      {data.map((date, i) => (
        <CalendarTd formattedDate={date} key={i} tdIdx={i} trIdx={trIdx} />
      ))}
    </BodyTr>
  );
};

export default CalendarTr;
