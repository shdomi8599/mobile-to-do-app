export type SigObj = {
  [key: string]: string;
};

interface AlarmBase {
  select: number;
}
interface AlarmIndex0 extends AlarmBase {
  효과음: string[];
}
interface AlarmIndex1 extends AlarmBase {
  "진동 세기": string[];
}
interface AlarmIndex2 extends AlarmBase {
  "알람 종류": string[];
}
interface AlarmIndex3 extends AlarmBase {
  "기상 시간": string[];
}
interface AlarmIndex4 extends AlarmBase {
  "취침 시간": string[];
}

export type AlarmArr = [
  AlarmIndex0,
  AlarmIndex1,
  AlarmIndex2,
  AlarmIndex3,
  AlarmIndex4
];

export type ProfileIconData = {
  href: string;
  name: string;
  src: string;
};

export type SuccessData = {
  [key: string]: string[];
};

export type LocalGetUp = { date: string; wakeUpTime: string };

export type Holiday = {dateKind: string; dateName : string ; isHoliday : string ; locdate : number ; seq:number}