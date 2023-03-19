import styled, { keyframes } from "styled-components";
import TitleBox from "./TitleBox";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { startDateState } from "../recoil/atom";
import { SigObj } from "../type/type";
import { AiOutlineClose } from "react-icons/ai";
import { FiRotateCcw } from "react-icons/fi";
import ProfileIcon from "./ProfileIcon";
import Profile from "./Profile";

const navFade = keyframes`
    0% {
      transform: translate(270px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
`;

const NavContentBox = styled.div.attrs({
  className:
    "bg-white w-75 position-fixed d-flex justify-content-start align-items-center flex-column border",
})`
  height: 100%;
  top: 0px;
  z-index: 1;
  animation: ${navFade} 0.25s linear alternate;
`;

const BlockBox = styled.div.attrs({
  className: "w-25 position-fixed",
})`
  height: 200%;
  left: 0px;
  z-index: 1;
`;

const MainContentBox = styled.ul.attrs({
  className:
    "w-100 d-flex justify-content-start align-items-center border-top flex-column p-0",
})``;

const Content = styled.li.attrs({
  className:
    "py-3 border-bottom w-100 d-flex justify-content-center align-items-center fs-3",
})``;

const MakerBox = styled.div.attrs({
  className: "pt-3 w-75",
})`
  font-size: 0.9rem;
`;

type NavContentProps = {
  navHandler: () => void;
};

const NavContent = ({ navHandler }: NavContentProps) => {
  const navigate = useNavigate();

  //달력 값 상태
  const [, setStartDate] = useRecoilState(startDateState);

  //네비 li데이터들
  const navArr: {}[] = useMemo(
    () => [
      { "목표 설정": "/target" },
      { "스케줄 설정": "/schedule" },
      { "알람 설정": "/alarm" },
      { "달력 보기": "/calendar" },
    ],
    []
  );

  /**
   * 이동하면서 네비를 off하는 이벤트
   */
  const clickEvent = useCallback(
    (data: SigObj) => {
      const newDate = new Date();
      navigate(Object.values(data)[0]);
      navHandler();
      setStartDate(newDate);
    },
    [navHandler, navigate, setStartDate]
  );

  //만든 사람 랜더링 상태
  const [maker, setMaker] = useState(false);

  /**
   * 만든사람 on/off
   */
  const makerHandler = () => {
    setMaker(!maker);
  };

  //아이콘 메모이제이션
  const XIcon = React.memo(AiOutlineClose);
  const RotateIcon = React.memo(FiRotateCcw);

  return (
    <>
      <BlockBox onClick={navHandler} />
      <NavContentBox>
        <div className="py-3 d-flex justify-content-start align-items-center w-100 px-3">
          <XIcon onClick={navHandler} className="fs-3" />
        </div>
        <TitleBox message={"취준생의 하루"} navHandler={navHandler} />
        {maker ? (
          <>
            <div className="w-100 ps-3 fs-2">
              <RotateIcon onClick={makerHandler} />
            </div>
            <MakerBox>
              <Profile />
              <div className="d-flex justify-content-center align-items-center w-100">
                <ProfileIcon addStyle={"flex-column"} addSpanStyle={"pt-3"} />
              </div>
            </MakerBox>
          </>
        ) : (
          <MainContentBox>
            {navArr.map((obj, i) => (
              <Content key={i}>
                <span onClick={() => clickEvent(obj)}>
                  {Object.keys(obj)[0]}
                </span>
              </Content>
            ))}
            <Content>
              <span onClick={makerHandler}>만든 사람</span>
            </Content>
          </MainContentBox>
        )}
      </NavContentBox>
    </>
  );
};

export default React.memo(NavContent);
