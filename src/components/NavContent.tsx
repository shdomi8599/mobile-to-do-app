import styled, { keyframes } from "styled-components";
import TitleBox from "./TitleBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { SigObj } from "../type";
import { profileIcon } from "../data/profileIcon";
import ProfileIcon from "./ProfileIcon";
import { profile } from "../data/profile";

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

  //네비 li데이터들
  const navArr: SigObj[] = [
    { "목표 설정": "/target" },
    { "스케줄 설정": "/schedule" },
    { "알람 설정": "/alarm" },
    { "달력 보기": "/calendar" },
  ];

  /**
   * 이동하면서 네비를 off하는 이벤트
   */
  const clickEvent = (data: SigObj) => {
    navigate(Object.values(data)[0]);
    navHandler();
  };

  //만든 사람 랜더링 상태
  const [maker, setMaker] = useState(false);

  /**
   * 만든사람 on/off
   */
  const makerHandler = () => {
    setMaker(!maker);
  };

  return (
    <>
      <BlockBox onClick={navHandler} />
      <NavContentBox>
        <div className="py-3 d-flex justify-content-start align-items-center w-100 px-3">
          <FontAwesomeIcon icon={faX} onClick={navHandler} className="fs-3" />
        </div>
        <TitleBox message={"취준생의 하루"} navHandler={navHandler} />
        {maker ? (
          <>
            <div className="w-100 ps-3 fs-2" onClick={makerHandler}>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </div>
            <MakerBox>
              {profile.map((data, i) => (
                <div key={i}>{data}</div>
              ))}
              <div className="d-flex justify-content-center align-items-center w-100 flex-column">
                {profileIcon.map((data, i) => (
                  <div key={i} className="py-2">
                    <ProfileIcon data={data} />
                  </div>
                ))}
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

export default NavContent;
