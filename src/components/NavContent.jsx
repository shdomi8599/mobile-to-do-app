import styled from "styled-components";
import TitleBox from "./TitleBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NavContentBox = styled.div.attrs({
  className:
    "bg-white w-75 position-fixed d-flex justify-content-start align-items-center flex-column border",
})`
  height: 100%;
  top: 0px;
  z-index: 1;
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

const NavContent = ({ navHandler }) => {
  const navigate = useNavigate();

  //네비 li데이터들
  const navArr = [
    { "목표 설정": "/target" },
    { "스케줄 설정": "/schedule" },
    { "알람 설정": "/alarm" },
    { "달력 보기": "/calendar" },
    { "만든 사람": "/" },
  ];

  /**
   * 이동하면서 네비를 off하는 이벤트
   */
  const clickEvent = (data) => {
    navigate(Object.values(data)[0]);
    navHandler();
  };

  return (
    <>
      <BlockBox onClick={navHandler} />
      <NavContentBox>
        <div className="py-3 d-flex justify-content-start align-items-center w-100 px-3">
          <FontAwesomeIcon icon={faX} onClick={navHandler} className="fs-3" />
        </div>
        <TitleBox message={"취준생의 하루"} navHandler={navHandler} />
        <MainContentBox>
          {navArr.map((obj, i) => (
            <Content key={i}>
              <span onClick={() => clickEvent(obj)}>{Object.keys(obj)[0]}</span>
            </Content>
          ))}
        </MainContentBox>
      </NavContentBox>
    </>
  );
};

export default NavContent;
