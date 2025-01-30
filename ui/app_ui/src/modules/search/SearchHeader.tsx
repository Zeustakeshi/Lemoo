import GlobalSearch from "@/components/search/GlobalSearch";
import Button from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
type Props = {
    autoFocusSearchInput?: boolean;
    onPress?: () => void;
    backToHome?: boolean;
};

const SearchHeader = ({ autoFocusSearchInput, onPress, backToHome }: Props) => {
    const { keyword }: { keyword: string } = useLocalSearchParams();

    return (
        <View className="flex-row items-center gap-2">
            <Button
                onPress={() => {
                    if (backToHome) {
                        router.push("/home");
                    } else {
                        router.back();
                    }
                }}
                variant="link"
                size="icon"
            >
                <Ionicons name="chevron-back" size={24} color="black" />
            </Button>

            <GlobalSearch
                autoFocus={autoFocusSearchInput}
                canInput={!onPress}
                onPress={onPress}
                className="flex-1"
                defaultKeyword={keyword}
            ></GlobalSearch>
        </View>
    );
};

export default SearchHeader;
