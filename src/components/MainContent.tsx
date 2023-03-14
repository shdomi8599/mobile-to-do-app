import styled from "styled-components";
import { useCallback,  useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { BsBell, BsBellFill } from "react-icons/bs";

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
  const moveSchedule = useCallback(() => {
    navigate("/schedule", { state: { time: time } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //아이콘 메모이제이션
  const BellIcon = React.memo(BsBell);
  const BellFillIcon = React.memo(BsBellFill);

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
        {bell ? (
          <BellFillIcon onClick={bellHandler} className="fs-1" />
        ) : (
          <BellIcon onClick={bellHandler} className="fs-1" />
        )}
      </ShareBox>
    </Content>
  );
};

export default MainContent;
