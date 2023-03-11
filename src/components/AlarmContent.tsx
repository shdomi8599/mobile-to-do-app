import React from "react";
import styled from "styled-components";

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
  setWakeUp: (target: string) => void;
  setBed: (target: string) => void;
};

const AlarmContent = ({
  category,
  valueArr,
  value,
  setWakeUp,
  setBed,
}: AlarmContentProps) => {
  /**
   * 기상 시간 설정
   */
  const changeSelect = (e: { target: { name: string; value: string } }) => {
    if (e.target.name === "기상 시간") {
      setWakeUp(e.target.value);
    }
    if (e.target.name === "취침 시간") {
      setBed(e.target.value);
    }
  };

  return (
    <Content>
      <MainContentBox>
        <div className="flex-01 d-flex justify-content-start align-items-start w-100 ps-3">
          <Category>{category}</Category>
        </div>
        <div className="flex-10 fs-3 w-100 d-flex justify-content-center align-items-start">
          <select
            className="form-select w-50"
            name={category}
            defaultValue={value}
            onChange={changeSelect}
          >
            {valueArr.map((val, i) => (
              <option key={i} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </MainContentBox>
    </Content>
  );
};

export default AlarmContent;
