import { get } from "lodash";

import { en } from "../../assets/locales";

export const t = (key: string) => {
  return get(en, key, key);
};
