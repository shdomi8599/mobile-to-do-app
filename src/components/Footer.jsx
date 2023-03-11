import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { targetContentLength } from "../atom";
import FooterIcon from "./FooterIcon";

const FooterBox = styled.footer.attrs({
  className:
    "d-flex justify-content-center align-items-start flex-column px-4 w-100",
})`
  font-size: 0.82rem;
  height: ${(props) =>
    props.pathName === "/target" && props.targetLength < 6
      ? "18.68vh"
      : "14.64vh"};
`;

const Footer = () => {
  const location = useLocation();

  //경로 이름
  const pathName = location.pathname;

  //등록된 목표의 개수
  const targetLength = useRecoilValue(targetContentLength);

  //아이콘 데이터 배열
  const iconArr = [
    {
      href: "https://github.com/shdomi8599",
      name: "GITHUB",
      src: "https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white",
    },
    {
      href: "https://mail.google.com/mail/u/0/?fs=1&to=shdomi8599@gmail.com&tf=cm",
      name: "EMAIL",
      src: "https://img.shields.io/badge/GMAIL-4285F4?style=for-the-badge&logo=Google&logoColor=white",
    },
    {
      href: "https://web-beginner.tistory.com/",
      name: "TISTORY",
      src: "https://img.shields.io/badge/Tistory-000000?style=for-the-badge&logo=Tistory&logoColor=white",
    },
  ];

  return (
    <FooterBox targetLength={targetLength} pathName={pathName}>
      <div>코드스테이츠 프론트엔드 43기</div>
      <div>만든 사람 : 신동민</div>
      <div className="d-flex justify-content-center align-items-center w-100 pt-1">
        {iconArr.map((data, i) => (
          <FooterIcon data={data} key={i} />
        ))}
      </div>
    </FooterBox>
  );
};
export default Footer;
