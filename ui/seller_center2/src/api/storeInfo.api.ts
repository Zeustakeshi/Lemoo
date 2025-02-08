import { Store } from "../common/type/store.type";
import { api } from "../lib/api";

export const storeInfoApi = async (): Promise<Store> => {
  return await api.get("/store/info");
};
