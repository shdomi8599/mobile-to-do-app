import { getLocalStorage } from "./getLocalStorage";

export const localState = (key: string, base: {} | [] | string) => {
  const data = getLocalStorage(key);
  if (data) {
    return data[key];
  } else {
    return base;
  }
};
