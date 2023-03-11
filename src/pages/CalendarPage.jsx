import Calendar from "../components/Calendar";
import ContentBox from "../components/ContentBox";
import MainContainer from "../components/MainContainer";
import SubTitleBox from "../components/SubTitleBox";
import TitleBox from "../components/TitleBox";

const CalendarPage = () => {
  return (
    <MainContainer>
      <TitleBox message={"달력 보기"} />
      <SubTitleBox />
      <ContentBox>
        <Calendar />
      </ContentBox>
    </MainContainer>
  );
};

export default CalendarPage;
