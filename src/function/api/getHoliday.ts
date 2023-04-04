import axios from "axios";
import { Holiday } from "../../type/type";

export const getHoliday = async (year: number) => {
  const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&ServiceKey=UQ6%2FnEjkOCW%2FYUFc1QG3dI4%2FRCE8BhPHaVoak5K2tpm%2BG9Hj%2FrPOEx%2Bpj%2F172WevyCe2Cww0jDaCJa9sF2hsJA%3D%3D&_type=json&numOfRows=100`;
  return await axios(url).then((res) => {
    return res.data.response.body.items.item.map((x: Holiday) => x.locdate);
  });
};
