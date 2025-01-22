import { db } from "@/db";
import { SearchHistoryModel } from "@/db/models/search.model";
import useClickOutSide from "@/hooks/useClickOutSide";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { History, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import VoiceSearch from "./VoiceSearch";

type Props = {
    className?: string;
};

const GlobalSearch = ({ className }: Props) => {
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchSuggestions, setSearchSuggesetions] = useState<string[]>([]);
    const [searchHistories, setSearchHistories] = useState<
        SearchHistoryModel[]
    >([]);

    const searchDebounce = useDebounce(searchValue, 800);

    const navigation = useNavigate();

    const { nodeRef: searchContainerRef } = useClickOutSide(() => {
        setShowSuggestion(false);
    });

    useEffect(() => {
        if (!searchValue.trim()) return;
        handleGetSearchSuggestion(searchValue.trim());
    }, [searchDebounce]);

    const handleSearch = async (value: string) => {
        if (!value.trim()) return;
        await db.searchHistories.put({
            keyword: value,
        });
        navigation({
            to: "/search",
            search: { q: value },
        });
        setShowSuggestion(false);
    };

    const handleGetSearchSuggestion = async (value: string) => {
        console.log("handleGetSearchSuggestion:: " + value);
    };

    const handleFocusSearch = async () => {
        setShowSuggestion(true);
        if (!searchValue.trim()) {
            // get search suggestion from local db
            const histories = await db.searchHistories.toArray();
            setSearchHistories(histories);
        } else {
            //  get search suggestion by search value
        }
    };

    return (
        <div
            className={cn("flex items-center justify-center gap-2", className)}
        >
            <div className=" relative flex-1" ref={searchContainerRef}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!searchValue.trim()) return;
                        handleSearch(searchValue);
                    }}
                    className={cn(
                        "border border-transparent focus-within:border-primary  bg-color-1 dark:bg-slate-800 flex justify-between items-center pr-2 rounded-md "
                    )}
                >
                    <input
                        onFocus={handleFocusSearch}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 p-4 py-3 dark:text-white"
                        placeholder="Bạn muốn tìm gì?"
                    ></input>
                    <Button className="dark:text-white" size="icon">
                        <Search />
                    </Button>
                    {showSuggestion && (
                        <div className=" absolute overflow-hidden top-[120%] left-[50%] -translate-x-[50%] z-20  w-[100%] h-min max-h-[500px] overflow-y-auto custom-scroll bg-white dark:bg-slate-900 shadow-xl  rounded-xl">
                            {searchHistories.length > 0 &&
                                searchHistories.map((history, index) => (
                                    <SearchSuggestionItem
                                        key={index}
                                        value={history.keyword}
                                        isHistory
                                        handleSearch={(value) => {
                                            setSearchValue(value);
                                            handleSearch(value);
                                        }}
                                        onRemoveHistory={(value) =>
                                            setSearchHistories(
                                                searchHistories.filter(
                                                    (history) =>
                                                        history.keyword !==
                                                        value
                                                )
                                            )
                                        }
                                    />
                                ))}
                        </div>
                    )}
                </form>
            </div>
            <VoiceSearch
                handleSearch={(value) => {
                    setSearchValue(value);
                    handleSearch(value);
                }}
            ></VoiceSearch>
        </div>
    );
};

type SearchSuggestionItemProps = {
    value: string;
    isHistory?: boolean;
    onRemoveHistory?: (value: string) => void;
    handleSearch?: (value: string) => void;
};

const SearchSuggestionItem = ({
    value,
    isHistory = false,
    onRemoveHistory,
    handleSearch,
}: SearchSuggestionItemProps) => {
    const navigation = useNavigate();

    const handleRemoveSearchHistory = async () => {
        if (!isHistory) return;
        await db.searchHistories.delete(value);
        onRemoveHistory?.(value);
    };

    return (
        <div className="w-full flex justify-between items-center px-5 py-3 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer    [&_svg]:text-slate-500 dark:[&_svg]:text-white">
            <div
                onClick={() => {
                    handleSearch?.(value);
                }}
                className="flex flex-1 justify-start items-center gap-2"
            >
                {isHistory && <History size={18} />}
                <span>{value}</span>
            </div>
            {isHistory && (
                <p
                    onClick={handleRemoveSearchHistory}
                    className="text-primary hover:underline"
                >
                    xóa
                </p>
            )}
        </div>
    );
};

export default GlobalSearch;
