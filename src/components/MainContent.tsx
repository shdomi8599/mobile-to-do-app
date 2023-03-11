import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as faBellS } from "@fortawesome/free-solid-svg-icons";
import { faBell as faBellR } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Content = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center w-100 border-bottom py-3",
})``;

const MainContentBox = styled.div.attrs({
  className:
    "flex-10 d-flex justify-content-start align-items-center flex-column",
})``;

const ShareBox = styled.div.attrs({
  className: "flex-02 d-flex justify-content-center align-items-center",
})``;

type MainContentProps = {
  time: number;
  content: string;
};

const MainContent = ({ time, content }: MainContentProps) => {
  const navigate = useNavigate();
  //시간 길이 체크
  const timeLength = String(time).length;

  //알람 설정
  const [bell, setBell] = useState(false);

  /**
   * 알람 on/off
   */
  const bellHandler = () => {
    return !content
      ? alert(`${time}시 스케줄부터 등록해주세요.`)
      : setBell(!bell);
  };

  /**
   * 스케줄 페이지로 이동
   */
  const moveSchedule = () => {
    navigate("/schedule", { state: { time: time } });
  };

  return (
    <Content>
      <MainContentBox>
        <div className="fs-3">
          {timeLength === 1 ? `0${time}:00` : `${time}:00`}
        </div>
        <div>
          <span onClick={moveSchedule} className={!content ? "opacity-25" : ""}>
            {!content ? "스케줄을 등록해주세요" : content}
          </span>
        </div>
      </MainContentBox>
      <ShareBox>
        <FontAwesomeIcon
          onClick={bellHandler}
          icon={bell ? faBellS : faBellR}
          className="fs-1"
        />
      </ShareBox>
    </Content>
  );
};

export default MainContent;
