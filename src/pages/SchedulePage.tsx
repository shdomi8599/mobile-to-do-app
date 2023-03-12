import React from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  bedState,
  scheduleDataState,
  textBoxState,
  wakeUpState,
} from "../atom";
import ContentBox from "../components/ContentBox";
import MainContainer from "../components/MainContainer";
import ScheduleContent from "../components/ScheduleContent";
import SubTitleBox from "../components/SubTitleBox";
import TextBox from "../components/TextBox";
import TitleBox from "../components/TitleBox";
import { createTimeArr } from "../function/createTimeArr";
import { SigObj } from "../type";

const SchedulePage = () => {
  //box 상태 체크
  const boxState = useRecoilValue(textBoxState);

  //기상 시간 값
  const wakeUp = useRecoilValue(wakeUpState);

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
  const [pick, setPick] = useState(0);

  /**
   * 시간 선택
   */
  const changePick = (time: number) => {
    setPick(time);
  };

  //시간 배열
  const contentArr: number[] =
    bed > wakeUp
      ? createTimeArr().slice(wakeUp, bed)
      : createTimeArr().slice(wakeUp).concat(createTimeArr().slice(0, bed));

  return (
    <>
      <MainContainer>
        <TitleBox message={"스케줄 설정"} />
        <SubTitleBox message={"오늘의 스케줄"} />
        <ContentBox>
          {contentArr.map((time, i) => (
            <ScheduleContent
              key={i}
              time={time}
              content={scheduleData[time]}
              changePick={changePick}
              textBoxHandler={textBoxHandler}
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
