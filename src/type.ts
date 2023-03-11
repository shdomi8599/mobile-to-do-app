export type sigObj = {
  [key: string]: string;
};

interface alarmBase {
  select: number;
}
interface alarmIndex0 extends alarmBase {
  효과음: string[];
}
interface alarmIndex1 extends alarmBase {
  "진동 세기": string[];
}
interface alarmIndex2 extends alarmBase {
  "알람 종류": string[];
}
interface alarmIndex3 extends alarmBase {
  "기상 시간": string[];
}
interface alarmIndex4 extends alarmBase {
  "취침 시간": string[];
}

export type alarmArr = [
  alarmIndex0,
  alarmIndex1,
  alarmIndex2,
  alarmIndex3,
  alarmIndex4
];

export type footerIconData = {
  href: string;
  name: string;
  src: string;
};

