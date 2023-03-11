import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavContent from "./NavContent";
import { useRecoilState } from "recoil";
import { navState } from "../atom";
import { useEffect } from "react";

const NavBox = styled.nav.attrs({
  className: "d-flex justify-content-end align-items-center mb-2 pt-2",
})``;

const Nav = () => {
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
