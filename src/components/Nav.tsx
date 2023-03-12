import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavContent from "./NavContent";
import { useRecoilState } from "recoil";
import { navState } from "../atom";
import { useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";

const NavBox = styled.nav.attrs({
  className: "d-flex justify-content-end align-items-center mb-2 pt-2",
})``;

const WakeTimeBox = styled.div.attrs({
  className:
    "position-absolute ps-3 pt-2 d-flex justify-content-center align-items-center flex-column",
})`
  left: 0px;
  font-size: 0.7rem;
`;

const Nav = () => {
  const location = useLocation();
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

  return (
    <>
      <NavBox>
        {pathName === "/" && (
          <WakeTimeBox>
            <div className="bg-dark text-white p-1 rounded">기상시간</div>
            <div>07:33</div>
          </WakeTimeBox>
        )}
        <FontAwesomeIcon
          icon={faBars}
          className="fs-2 me-3"
          onClick={navHandler}
        />
        {nav && <NavContent navHandler={navHandler} />}
      </NavBox>
    </>
  );
};

export default Nav;
