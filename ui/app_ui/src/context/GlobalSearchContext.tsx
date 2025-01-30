import { useLocalSearchParams } from "expo-router";
import {
    createContext,
    Dispatch,
    useContext,
    useEffect,
    useState,
} from "react";

export interface GlobalSearchContext {
    keyword: string;
    autoCompleteValues: string[];
    setKeyword: Dispatch<React.SetStateAction<string>>;
    setAutoCompleteValues: Dispatch<React.SetStateAction<string[]>>;
}

const GlobalSearchContext = createContext<GlobalSearchContext | null>(null);

export function GlobalSearchProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { keyword: defaultKeyword }: { keyword: string } =
        useLocalSearchParams();

    const [keyword, setKeyword] = useState<string>("");
    const [autoCompleteValues, setAutoCompleteValues] = useState<string[]>([]);

    // const { mutate, isPending } = useMutation({
    //     mutationKey: ["global-search-auto-complete"],
    //     mutationFn: async (value: string) => await sleep(1000),
    //     onSuccess(data) {
    //         setAutoCompleteValues(() => [
    //             "Quần áo",
    //             "Áo thun",
    //             "Giày nam",
    //             "Tai nghe",
    //         ]);
    //     },
    // });

    useEffect(() => {
        if (!defaultKeyword || defaultKeyword === "____") return;
        setKeyword(defaultKeyword);
    }, [defaultKeyword]);

    // useEffect(() => {
    //     if (searchValue.trim().length <= 0) {
    //         setAutoCompleteValues([]);
    //         return;
    //     }
    //     // handle search here
    //     mutate(searchValue.trim());
    // }, [searchValueDebounce]);

    // useEffect(() => {
    //     if (
    //         defaultKeyword &&
    //         defaultKeyword?.trim().length > 0 &&
    //         defaultKeyword !== searchValue
    //     ) {
    //         setSearchValue(defaultKeyword);
    //     }
    // }, [defaultKeyword]);

    return (
        <GlobalSearchContext.Provider
            value={{
                keyword,
                autoCompleteValues,
                setKeyword,
                setAutoCompleteValues,
            }}
        >
            {children}
        </GlobalSearchContext.Provider>
    );
}

export function useGlobalSearch() {
    const context = useContext(GlobalSearchContext);
    if (!context) {
        throw new Error(
            "useGlobalSearch must be used within a GlobalSearchProvider"
        );
    }
    return context;
}
