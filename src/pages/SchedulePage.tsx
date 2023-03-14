import React, { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { pickTimeState, scheduleDataState, textBoxState } from "../recoil/atom";
import ContentBox from "../components/ContentBox";
import MainContainer from "../components/MainContainer";
import ScheduleContent from "../components/ScheduleContent";
import SubTitleBox from "../components/SubTitleBox";
import TextBox from "../components/TextBox";
import TitleBox from "../components/TitleBox";
import { createTimeArr } from "../function/createTimeArr";
import { SigObj } from "../type/type";
import { bedState, wakeUpTimeValState } from "../recoil/selector";

const SchedulePage = () => {
  //box 상태 체크
  const boxState = useRecoilValue(textBoxState);

  //기상 시간 값
  const wakeUp = useRecoilValue(wakeUpTimeValState);

  //취침 시간 값
  const bed = useRecoilValue(bedState);

  //스케줄 데이터 상태
  const [scheduleData, setScheduleData] = useRecoilState(scheduleDataState);

  //스케줄 데이터 변경
  const changeScheduleData = (data: SigObj) => {
    setScheduleData({ ...scheduleData, ...data });
  };

  //텍스트 박스 상태
  const [textBox, setTextBox] = useRecoilState(textBoxState);

  /**
   * 텍스트 박스 on/off
   */
  const textBoxHandler = () => {
    setTextBox(!textBox);
  };

  //선택 상태
  const pick = useRecoilValue(pickTimeState);

  //시간 배열
  const timeArr = useMemo(() => createTimeArr(), []);
  const contentArr: number[] = useMemo(
    () =>
      bed > wakeUp
        ? timeArr.slice(wakeUp, bed)
        : timeArr.slice(wakeUp).concat(timeArr.slice(0, bed)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bed, wakeUp]
  );

  return (
    <>
      <MainContainer>
        <TitleBox message={"스케줄 설정"} />
        <SubTitleBox message={"오늘의 스케줄"} />
        <ContentBox>
          {contentArr.map((time) => (
            <ScheduleContent
              key={time}
              time={time}
              content={scheduleData[time]}
            />
          ))}
        </ContentBox>
      </MainContainer>
      {boxState && (
        <TextBox
          message={pick}
          changeScheduleData={changeScheduleData}
          textBoxHandler={textBoxHandler}
        />
      )}
    </>
  );
};

export default SchedulePage;
