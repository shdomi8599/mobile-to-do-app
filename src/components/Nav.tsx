import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavContent from "./NavContent";
import { useRecoilState, useRecoilValue } from "recoil";
import { getUpState, getUpTimeState, navState } from "../atom";
import { useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";

const NavBox = styled.nav.attrs({
  className: "d-flex justify-content-end align-items-start mb-2",
})``;

const WakeTimeBox = styled.div.attrs({
  className: "position-absolute ps-3 text-center pt-1",
})`
  left: 0px;
  font-size: 0.7rem;
`;

const WakeUpBtnBox = styled.div.attrs({
  className: "p-1 rounded border",
})<WakeUpBtnBoxProps>`
  color: ${(props) => (props.checkWakeUp ? "white" : "black")};
  background-color: ${(props) => (props.checkWakeUp ? "black" : "none")};
`;

type WakeUpBtnBoxProps = {
  checkWakeUp: boolean;
};

const Nav = () => {
  const location = useLocation();

  //경로 이름
  const pathName = location.pathname;

  //네비 상태
  const [nav, setNav] = useRecoilState(navState);

  /**
   * 네비 on/off
   */
  const navHandler = () => {
    setNav(!nav);
  };

  // 네비바가 켜져있을 땐, 스크롤이 막히게 해주는 이펙트
  useEffect(() => {
    const body = document.body;
    nav
      ? body.classList.add("stop-scrolling")
      : body.classList.remove("stop-scrolling");
  }, [nav]);

  //기상 체크 상태
  const [checkWakeUp, setCheckWakeUp] = useRecoilState(getUpState);

  //기상 시간 값
  const getUpTime = useRecoilValue(getUpTimeState);

  /**
   * 기상 체크하기 ,00시 이후 하루 1번만 가능하게 바꿀 예정
   */
  const checkWakeUpHandler = () => {
    if (!checkWakeUp && window.confirm("기상 체크를 하시겠습니까?")) {
      setCheckWakeUp(true);
    }
  };

  return (
    <>
      <NavBox>
        {pathName === "/" && (
          <WakeTimeBox>
            <WakeUpBtnBox
              checkWakeUp={checkWakeUp}
              onClick={checkWakeUpHandler}
            >
              {checkWakeUp ? "기상시간" : "기상체크"}
            </WakeUpBtnBox>
            {checkWakeUp && <div>{getUpTime}</div>}
          </WakeTimeBox>
        )}
        <FontAwesomeIcon
          icon={faBars}
          className="fs-2 me-3 pt-2"
          onClick={navHandler}
        />
        {nav && <NavContent navHandler={navHandler} />}
      </NavBox>
    </>
  );
};

export default Nav;
