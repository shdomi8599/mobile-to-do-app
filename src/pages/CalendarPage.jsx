import styled from "styled-components";
import ContentBox from "../components/ContentBox";
import SubTitleBox from "../components/SubTitleBox";
import TitleBox from "../components/TitleBox";

const CalendarBox = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center flex-column w-100",
})``;

const CalendarPage = () => {
  return (
    <CalendarBox>
      <TitleBox message={"달력 보기"} />
      <SubTitleBox message={"3월"} />
      <ContentBox>
      </ContentBox>
    </CalendarBox>
  );
};

export default CalendarPage;
