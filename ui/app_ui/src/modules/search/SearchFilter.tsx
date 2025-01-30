import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import SearchFilterDetail from "./SearchFilterDetail";

type Props = {
    style: any;
};

const SearchFilter = ({ style }: Props) => {
    const [showFilterDetail, setShowFilterDetail] = useState<boolean>(false);
    return (
        <View className="relative" style={style}>
            <View className="flex flex-row justify-between items-center">
                <View className="flex-row flex-1 justify-start items-center gap-1">
                    <Button variant="ghost" size="icon">
                        <Text className="text-sm font-medium">
                            Phù hợp nhất
                        </Text>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Text className="text-sm font-medium">Bán chạy</Text>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Text className="text-sm font-medium">Giá</Text>
                    </Button>
                </View>
                <View className="flex-1 justify-end items-center flex-row">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-row gap-2"
                    >
                        <FontAwesome6 name="store" size={14} color="black" />
                        <Text className="text-sm font-semibold">Cửa hàng</Text>
                    </Button>
                </View>
            </View>
            <ScrollView className="my-2">
                <View className="flex-row justify-start items-center flex-1 gap-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        className={cn(
                            "!px-3 flex-row gap-2 border border-transparent",
                            {
                                " border-primary  ": showFilterDetail,
                            }
                        )}
                        onPress={() => setShowFilterDetail((filter) => !filter)}
                    >
                        <AntDesign name="filter" size={18} color="black" />
                        <Text className={cn("text-sm", {})}>Bộ lọc</Text>
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="!px-3 flex-row gap-2"
                    >
                        <Text className="text-sm">Giá tốt nhất</Text>
                    </Button>
                </View>
            </ScrollView>
            {showFilterDetail && (
                <SearchFilterDetail className=""></SearchFilterDetail>
            )}
        </View>
    );
};

export default SearchFilter;
