import styled from "styled-components";

const SubTitle = styled.div.attrs({
  className: "d-flex justify-content-start align-items-center w-100 ps-3 pb-3",
})``;

const SubTitleBox = ({ message }) => {
  return (
    <SubTitle>
      <span>{message}</span>
    </SubTitle>
  );
};

export default SubTitleBox;
