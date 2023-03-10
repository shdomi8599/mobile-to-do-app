import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavContent from "./NavContent";
import { useRecoilState } from "recoil";
import { navState } from "../atom";

const NavBox = styled.nav.attrs({
  className: "d-flex justify-content-end align-items-center my-2 ",
})``;

const Nav = () => {
  const [nav, setNav] = useRecoilState(navState);

  const navHandler = () => {
    setNav(!nav);
  };
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
