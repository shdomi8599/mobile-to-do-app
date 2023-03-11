import Calendar from "../components/Calendar";
import ContentBox from "../components/ContentBox";
import MainContainer from "../components/MainContainer";
import SubTitleBox from "../components/SubTitleBox";
import TitleBox from "../components/TitleBox";

const CalendarPage = () => {
  return (
    <MainContainer>
      <TitleBox message={"달력 보기"} />
      <SubTitleBox message={"2023년 3월"} />
      <ContentBox>
        <Calendar/>
      </ContentBox>
    </MainContainer>
  );
};

export default CalendarPage;
