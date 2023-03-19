import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { targetContentValue, todayTargetState } from "../recoil/atom";
import ButtonBox from "../components/common/ButtonBox";
import ContentBox from "../components/common/ContentBox";
import MainContainer from "../components/main/MainContainer";
import SubTitleBox from "../components/common/SubTitleBox";
import TargetContent from "../components/target/TargetContent";
import TextBox from "../components/common/TextBox";
import TitleBox from "../components/common/TitleBox";
import { setLocalStorage } from "../function/localStorage/setLocalStorage";
import { removeLocalStorage } from "../function/localStorage/removeLocalStorage";

const TargetPage = () => {
  //타겟 상태
  const [targetContent, setTargetContent] = useRecoilState(targetContentValue);

  /**
   * 컨텐츠 추가
   */
  const addTargetContent = (data: string) => {
    setTargetContent([...targetContent, data]);
    setBox(false);
  };

  //targetContent가 바뀔때마다 로컬에 저장하고 삭제하는 이펙트
  useEffect(() => {
    if (targetContent.length !== 0) {
      setLocalStorage("targetContent", targetContent);
    } else {
      removeLocalStorage("targetContent");
    }
  }, [targetContent]);

  /**
   * 컨텐츠 삭제
   */
  const deleteTargetContent = (idx: number) => {
    setTargetContent([
      ...targetContent.slice(0, idx),
      ...targetContent.slice(idx + 1),
    ]);
    setToday(undefined);
  };

  //오늘의 목표 상태
  const [today, setToday] = useRecoilState(todayTargetState);
  console.log(today);

  useEffect(() => {
    if (today === undefined) {
      removeLocalStorage("todayContent");
    }
  }, [today]);

  /**
   * 오늘의 목표 변경
   */
  const changeTodayTarget = (idx: number) => {
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
      <MainContainer>
        <TitleBox message={"목표 설정"} />
        <section className="d-flex justify-content-start align-items-center w-100">
          <SubTitleBox message={"최근 14일 간의 목표"} />
          <div className="d-flex justify-content-end align-items-center w-100 pe-3 pb-3">
            <ButtonBox buttonEvent={boxHandler} message={"목표 등록"} />
          </div>
        </section>
        <ContentBox>
          {targetContent.map((val, i) => (
            <TargetContent
              message={val}
              key={val + i}
              idx={i}
              today={today}
              deleteTargetContent={deleteTargetContent}
              changeTodayTarget={changeTodayTarget}
            />
          ))}
        </ContentBox>
      </MainContainer>
      {box && (
        <TextBox message={"목표 등록"} addTargetContent={addTargetContent} />
      )}
    </>
  );
};

export default TargetPage;
