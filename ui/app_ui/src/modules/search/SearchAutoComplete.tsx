import Button from "@/components/ui/Button";
import { useGlobalSearch } from "@/context/GlobalSearchContext";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch } from "react-redux";

type Props = {};

const SearchAutoComplete = (props: Props) => {
    const dispatch = useDispatch();

    return (
        <View>
            <FlatList
                nestedScrollEnabled
                data={new Array(40).fill(0)}
                renderItem={() => <AutoCompleteItem />}
                ItemSeparatorComponent={() => (
                    <View className="h-[1] w-full bg-slate-200"></View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => <View className="h-8"></View>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

type AutoCompleteItemProps = {};

const AutoCompleteItem = ({}: AutoCompleteItemProps) => {
    const { setKeyword } = useGlobalSearch();
    return (
        <Button
            onPress={() => {
                router.push({
                    pathname: "/search/[keyword]/results",
                    params: {
                        keyword: "oke",
                    },
                });
            }}
            variant="ghost"
            className="px-3 py-3 flex-row flex-1 w-full justify-between items-center"
        >
            <View className="flex-1 flex-row justify-start">
                <Text className="">oke</Text>
            </View>
            <View className="flex-1 flex-row justify-end ">
                <Button
                    onPress={() => {
                        setKeyword("oke");
                    }}
                    size="icon"
                    variant="ghost"
                >
                    <Feather name="arrow-up-left" size={20} color="#94a3b8" />
                </Button>
            </View>
        </Button>
    );
};

export default SearchAutoComplete;
