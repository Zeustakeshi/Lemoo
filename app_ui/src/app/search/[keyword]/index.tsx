import AppWrapper from "@/components/wrapper/AppWrapper";
import { GlobalSearchProvider } from "@/context/GlobalSearchContext";
import SearchAutoComplete from "@/modules/search/SearchAutoComplete";
import SearchHeader from "@/modules/search/SearchHeader";
import React from "react";
import Toast from "react-native-toast-message";

type Props = {};

const SearchScreen = (props: Props) => {
    const handleClearSearchHistory = async () => {
        Toast.show({
            text1: "Xóa lịch sử tìm kiếm thành công",
        });
    };

    return (
        <GlobalSearchProvider>
            <AppWrapper className="gap-4">
                <SearchHeader autoFocusSearchInput backToHome></SearchHeader>
                {/* {autoCompleteValues.length <= 0 && (
                <>
                    <SearchSuggestion
                        data={["quần áo", "giày"]}
                        headerComponent={
                            <View className="flex-row justify-between items-center w-full">
                                <Text className="mb-4 mt-2 text-xl font-semibold flex-1">
                                    Lịch sử tìm kiếm
                                </Text>
                                <Button
                                    onPress={handleClearSearchHistory}
                                    variant="ghost"
                                    className="flex-1 flex-row justify-end gap-2"
                                    size="icon"
                                >
                                    <Text className="text-slate-600">
                                        Xóa tất cả
                                    </Text>
                                    <FontAwesome
                                        name="trash-o"
                                        size={18}
                                        color="#475569"
                                    />
                                </Button>
                            </View>
                        }
                    />

                    <SearchSuggestion
                        data={searchSuggestionTagsTest}
                        title="Đề xuất tìm kiếm"
                    />
                </>
            )} */}

                <SearchAutoComplete></SearchAutoComplete>

                {/* {autoCompleteValues.length > 0 && (
            )} */}
            </AppWrapper>
        </GlobalSearchProvider>
    );
};

export default SearchScreen;
