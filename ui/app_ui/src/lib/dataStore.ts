import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const storeData = async (key: string, value: string) => {
    try {
        console.log("save data: " + value);
        await AsyncStorage.setItem(key, value);
    } catch (e: any) {
        Toast.show({
            type: "error",
            text1: "Đồng bộ dữ liệu thất bại",
            text2: e.message,
        });
    }
};

const getData = async <T>(key: string): Promise<T | null | undefined> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e: any) {
        Toast.show({
            type: "error",
            text1: "Lấy dữ liệu thất bại",
            text2: e.message,
        });
    }
};

export const remove = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e: any) {
        console.log(e);
    }
};

export const clear = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e: any) {
        console.log(e);
    }
};

const storage = {
    get: getData,
    set: storeData,
    remove,
    clear,
};

export default storage;
