import React from "react";
import styled from "styled-components";
import CalendarSubTitle from "./CalendarSubTitle";

const SubTitle = styled.section.attrs({
  className: "d-flex justify-content-start align-items-center w-100 ps-3 pb-3",
})``;

type SubTitleBoxProps = {
  message?: string;
};

const SubTitleBox = ({ message }: SubTitleBoxProps) => {
  return (
    <SubTitle>
      {message ? <span>{message}</span> : <CalendarSubTitle />}
    </SubTitle>
  );
};

export default SubTitleBox;
