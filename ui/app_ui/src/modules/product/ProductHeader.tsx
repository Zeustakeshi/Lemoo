import Button from "@/components/ui/Button";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import GlobalSearch from "../../components/search/GlobalSearch";

type Props = {};

const ProductHeader = (props: Props) => {
    return (
        <View className="w-full flex-row justify-between items-center px-4 py-2">
            <View className="flex-row justify-start items-center gap-2">
                <Button
                    onPress={() => router.back()}
                    variant="link"
                    size="icon"
                >
                    <Ionicons name="chevron-back" size={24} color="black" />
                </Button>
                <GlobalSearch
                    onPress={() =>
                        router.push({
                            pathname: "/search/[keyword]",
                            params: {
                                keyword: "____",
                            },
                        })
                    }
                    size="small"
                    className="w-[180]"
                ></GlobalSearch>
            </View>
            <View className="flex flex-row justify-end items-center gap-3">
                <Button size="icon" variant="ghost">
                    <Ionicons
                        name="share-social-outline"
                        size={20}
                        color="black"
                    />
                </Button>
                <Button size="icon" variant="ghost">
                    <Feather name="shopping-cart" size={20} color="black" />
                </Button>
                <Button size="icon" variant="ghost">
                    <Feather name="more-horizontal" size={20} color="black" />
                </Button>
            </View>
        </View>
    );
};

export default ProductHeader;
