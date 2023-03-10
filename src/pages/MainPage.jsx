import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import MainContent from "../components/MainContent";
import TitleBox from "../components/TitleBox";
import { useRecoilValue } from "recoil";
import {
  bedTimeState,
  scheduleDataState,
  todayValueState,
  wakeUpTimeState,
} from "../atom";
import { createTimeArr } from "../function/createTimeArr";

const MainBox = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center flex-column w-100",
})``;

const SubTitle = styled.div.attrs({
  className: "d-flex justify-content-center align-items-center w-100 px-4 mb-4",
})`
  height: 10vh;
`;

const TargetBox = styled.div.attrs({
  className:
    "flex-10 d-flex justify-content-start align-items-center flex-column",
})``;

const ShareBox = styled.div.attrs({
  className: "flex-02 d-flex justify-content-end align-items-center",
})``;

const TodayTarget = styled.div.attrs({
  className: "d-flex justify-content-start align-items-center w-100",
})``;

const TomorrowTarget = styled.div.attrs({
  className: "d-flex justify-content-start align-items-center w-100",
})``;

const ContentBox = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center w-100 flex-column border-top",
})``;

const MainPage = () => {
  //오늘의 목표
  const todayContent = useRecoilValue(todayValueState);

  //기상 시간 값
  const wakeUp = Number(useRecoilValue(wakeUpTimeState).slice(0, 2));

  //취침 시간 값
  const bed = Number(useRecoilValue(bedTimeState).slice(0, 2));

  //시간 배열
  const contentArr =
    bed > wakeUp
      ? createTimeArr().slice(wakeUp, bed)
      : createTimeArr().slice(wakeUp).concat(createTimeArr().slice(0, bed));

  //스케줄 데이터
  const scheduleDataArr = useRecoilValue(scheduleDataState);

  return (
    <MainBox>
      <TitleBox message={"취준생의 하루"} />
      <SubTitle>
        <TargetBox>
          <TodayTarget>
            <span>어제의 목표 : 코딩 테스트</span>
          </TodayTarget>
          <TomorrowTarget>
            <span>
              오늘의 목표 :{" "}
              {!todayContent ? "목표를 설정해주세요." : todayContent}
            </span>
          </TomorrowTarget>
        </TargetBox>
        <ShareBox>
          <FontAwesomeIcon className="fs-2" icon={faShareFromSquare} />
        </ShareBox>
      </SubTitle>
      <ContentBox>
        {contentArr.map((time, i) => (
          <MainContent key={i} time={time} content={scheduleDataArr[time]} />
        ))}
      </ContentBox>
    </MainBox>
  );
};

export default MainPage;
