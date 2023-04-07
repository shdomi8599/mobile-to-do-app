import React, { useCallback, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { setLocalStorage } from "../../function/localStorage/setLocalStorage";
import { bedTimeState, wakeUpTimeState } from "../../recoil/atom";

type AlarmSelectProps = {
  category: string;
  value: string;
  valueArr: string[];
};

const AlarmSelect = ({ category, value, valueArr }: AlarmSelectProps) => {
  //기상 시간 상태변경
  const setWakeUp = useSetRecoilState(wakeUpTimeState);

  //취침 시간 상태변경
  const setBed = useSetRecoilState(bedTimeState);

  /**
   * 기상 시간 설정
   */
  const changeSelect = useCallback(
    (e: { target: { name: string; value: string } }) => {
      if (e.target.name === "기상 시간") {
        setWakeUp(e.target.value);
        setLocalStorage("alarmWakeUp", e.target.value);
      }
      if (e.target.name === "취침 시간") {
        setBed(e.target.value);
        setLocalStorage("alarmBed", e.target.value);
      }
    },
    [setBed, setWakeUp]
  );

  const optionVal = useMemo(
    () =>
      valueArr.map((val) => (
        <option key={val} value={val}>
          {val}
        </option>
      )),
    [valueArr]
  );

  return (
    <>
      <select
        className="form-select w-50"
        name={category}
        defaultValue={value}
        onChange={changeSelect}
      >
        {optionVal}
      </select>
    </>
  );
};

export default React.memo(AlarmSelect);
