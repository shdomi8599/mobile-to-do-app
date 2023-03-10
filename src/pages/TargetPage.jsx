import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { targetContentValue, todayTargetState } from "../atom";
import ButtonBox from "../components/ButtonBox";
import SubTitleBox from "../components/SubTitleBox";
import TargetContent from "../components/TargetContent";
import TextBox from "../components/TextBox";
import TitleBox from "../components/TitleBox";

const TargetBox = styled.div.attrs({
  className:
    "d-flex justify-content-start align-items-center flex-column w-100",
})``;

const ContentBox = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center w-100 flex-column border-top",
})``;

const TargetPage = () => {
  //타겟 상태
  const [targetContent, setTargetContent] = useRecoilState(targetContentValue);

  /**
   * 컨텐츠 추가
   */
  const addTargetContent = (data) => {
    setTargetContent([...targetContent, data]);
    setBox(false);
  };

  /**
   * 컨텐츠 삭제
   */
  const deleteTargetContent = (idx) => {
    setTargetContent([
      ...targetContent.slice(0, idx),
      ...targetContent.slice(idx + 1),
    ]);
  };

  //오늘의 목표 상태
  const [today, setToday] = useRecoilState(todayTargetState);

  /**
   * 오늘의 목표 변경
   */
  const changeTodayTarget = (idx) => {
    setToday(idx);
  };

  //목표 등록 박스 상태
  const [box, setBox] = useState(false);

  /**
   * 박스 상태 on/off
   */
  const boxHandler = () => {
    setBox(!box);
  };

  return (
    <>
      <TargetBox>
        <TitleBox message={"목표 설정"} />
        <div className="d-flex justify-content-start align-items-center w-100">
          <SubTitleBox message={"최근 14일 간의 목표"} />
          <div className="d-flex justify-content-end align-items-center w-100 pe-3 pb-3">
            <ButtonBox buttonEvent={boxHandler} message={"목표 등록"} />
          </div>
        </div>
        <ContentBox>
          {targetContent.map((val, i) => (
            <TargetContent
              message={val}
              key={i}
              idx={i}
              today={today}
              deleteTargetContent={deleteTargetContent}
              changeTodayTarget={changeTodayTarget}
            />
          ))}
        </ContentBox>
      </TargetBox>
      {box && (
        <TextBox message={"목표 등록"} addTargetContent={addTargetContent} />
      )}
    </>
  );
};

export default TargetPage;
