import { api } from "../lib/api";
import { FormUsers } from "../schema/StoreCreate";


export const createIndividualStore = async (data: any): Promise<any> => {
  return await api.post('/store/individual',data, {
    headers:{
        'Content-Type': 'multipart/form-data',
    }
  })
}