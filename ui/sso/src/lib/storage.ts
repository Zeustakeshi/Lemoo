export function getLocalStorageValue<T>(key: string) {
    const valueString = localStorage.getItem(key);
    if (!valueString) return null;
    return JSON.parse(valueString) as T;
}

export function getSessionStorageValue<T>(key: string) {
    const valueString = sessionStorage.getItem(key);
    if (!valueString) return null;
    return JSON.parse(valueString) as T;
}

export function saveSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorageValue(key: string) {
    localStorage.removeItem(key);
}

export function removeSessionStorageValue(key: string) {
    sessionStorage.removeItem(key);
}

export function clearLocalStorage() {
    localStorage.clear();
}

export function clearSessionStorage() {
    sessionStorage.clear();
}
