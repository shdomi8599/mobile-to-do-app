import { getLocalStorage } from "./getLocalStorage";

export const localState = (key: string, base: any) => {
  const data = getLocalStorage(key);
  if (data) {
    return data[key];
  } else {
    return base;
  }
};
