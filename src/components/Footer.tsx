import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { targetContentLength } from "../atom";
import { profile } from "../data/profile";
import { profileIcon } from "../data/profileIcon";
import ProfileIcon from "./ProfileIcon";

const FooterBox = styled.footer.attrs({
  className:
    "d-flex justify-content-center align-items-start flex-column px-4 w-100",
})<FooterBoxProps>`
  font-size: 0.82rem;
  height: ${(props) =>
    props.pathName === "/target" && props.targetLength < 6
      ? "18.68vh"
      : "14.64vh"};
`;

type FooterBoxProps = {
  pathName: string;
  targetLength: number;
};

const Footer = () => {
  const location = useLocation();

  //경로 이름
  const pathName = location.pathname;

  //등록된 목표의 개수
  const targetLength = useRecoilValue(targetContentLength);

  return (
    <FooterBox targetLength={targetLength} pathName={pathName}>
      {profile.map((data, i) => (
        <div key={i}>{data}</div>
      ))}
      <div className="d-flex justify-content-center align-items-center w-100 pt-1">
        {profileIcon.map((data, i) => (
          <ProfileIcon data={data} key={i} />
        ))}
      </div>
    </FooterBox>
  );
};
export default Footer;
