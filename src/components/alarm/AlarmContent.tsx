import React from "react";
import styled from "styled-components";
import AlarmSelect from "./AlarmSelect";

const Content = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center w-100 border-bottom",
})`
  height: 12vh;
`;

const MainContentBox = styled.div.attrs({
  className:
    " d-flex justify-content-start align-items-center flex-column h-100 w-100",
})``;

const Category = styled.span`
  font-size: 0.75rem;
`;

type AlarmContentProps = {
  category: string;
  valueArr: string[];
  value: string;
};

const AlarmContent = ({ category, valueArr, value }: AlarmContentProps) => {
  return (
    <Content>
      <MainContentBox>
        <div className="flex-01 d-flex justify-content-start align-items-start w-100 ps-3">
          <Category>{category}</Category>
        </div>
        <div className="flex-10 fs-3 w-100 d-flex justify-content-center align-items-start">
          <AlarmSelect category={category} valueArr={valueArr} value={value} />
        </div>
      </MainContentBox>
    </Content>
  );
};

export default React.memo(AlarmContent);
