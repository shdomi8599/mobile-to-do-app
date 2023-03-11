import React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center w-100 py-3 border-bottom",
})``;

const MainContentBox = styled.div.attrs({
  className: " d-flex justify-content-start align-items-center px-4 w-100",
})``;

type ScheduleContentProps = {
  time: number;
  content: string;
  textBoxHandler: () => void;
  changePick: (idx: number) => void;
};

const ScheduleContent = ({
  time,
  content,
  textBoxHandler,
  changePick,
}: ScheduleContentProps) => {
  const location = useLocation();

  //location 데이터가 존재할때 일어나는 이펙트
  useEffect(() => {
    if (target.current && location.state && location.state.time === time) {
      setAddStyle("text-danger opacity-100");
      setTimeout(() => {
        setAddStyle("");
      }, 2000);

      window.scrollTo({
        top: target.current.offsetTop - 300,
        left: 0,
        behavior: "smooth",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //박스 타겟 설정
  const target = useRef<HTMLDivElement>(null);

  //추가 스타일 상태
  const [addStyle, setAddStyle] = useState("");

  //시간 길이 체크
  const timeLength = String(time).length;

  /**
   * 박스 상태를 변경하고 pick number를 변경하는 이벤트
   */
  const clickEvent = () => {
    textBoxHandler();
    changePick(time);
  };

  return (
    <Content>
      <MainContentBox onClick={clickEvent} ref={target}>
        <div className="me-2">
          <span>{timeLength === 1 ? <>0{time}</> : time}:00</span> :
        </div>
        <div>
          <span className={!content ? `${addStyle} opacity-25` : `${addStyle}`}>
            {!content ? "계획을 등록해주세요." : content}
          </span>
        </div>
      </MainContentBox>
    </Content>
  );
};

export default ScheduleContent;
