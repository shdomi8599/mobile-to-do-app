import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SubTitle = styled.section.attrs({
  className: "d-flex justify-content-start align-items-center w-100 ps-3 pb-3",
})``;

const SubTitleBox = ({ message }) => {
  return (
    <SubTitle>
      {isNaN(message[0]) ? (
        <span>{message}</span>
      ) : (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <span>{message}</span>
          </div>
          <div className="me-3">
            <FontAwesomeIcon
              className="fs-1 mx-2 pointer trans-click"
              icon={faCaretUp}
            />
            <FontAwesomeIcon
              className="fs-1 mx-2 pointer trans-click pb-1"
              icon={faCaretDown}
            />
          </div>
        </div>
      )}
    </SubTitle>
  );
};

export default SubTitleBox;
