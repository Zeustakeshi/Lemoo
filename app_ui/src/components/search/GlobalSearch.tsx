import AnimatedTyping from "@/components/ui/AnimatedTyping";
import { searchTextSuggestions } from "@/data/search";
import { cn } from "@/lib/cn";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";

type Props = {
    size?: "small" | "normal" | "large";
    className?: string;
    onPress?: () => void;
    canInput?: boolean;
    autoFocus?: boolean;
    onSearchButtonPress?: () => void;
    defaultKeyword?: string;
};

const GlobalSearch = ({
    canInput,
    size = "normal",
    className,
    autoFocus,
    onPress,
    defaultKeyword,
}: Props) => {
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        if (!defaultKeyword || defaultKeyword === "____") return;
        setSearchValue(defaultKeyword);
    }, [defaultKeyword]);

    return (
        <Pressable
            onPress={() => onPress?.()}
            className={cn(
                "shadow-2xl shadow-slate-500  relative z-10  pr-8 rounded-xl bg-slate-50 border border-primary overflow-hidden",
                className
            )}
        >
            <View
                className={cn("p-3 rounded-xl bg-slate-50  w-full", {
                    "!px-3 !py-2": size === "small",
                })}
            >
                {!canInput && !defaultKeyword?.trim().length && (
                    <AnimatedTyping
                        texts={searchTextSuggestions}
                        animatedTime={50}
                        intervalTime={4000}
                        className="text-xs text-primary line-clamp-1 "
                    ></AnimatedTyping>
                )}

                {!canInput && defaultKeyword?.trim().length && (
                    <Text className="text-xs text-primary line-clamp-1">
                        {defaultKeyword}
                    </Text>
                )}

                {canInput && (
                    <Input
                        autoFocus={autoFocus}
                        className="!px-0 !py-0 text-sm"
                        placeholder="Bạn cần tìm gì?"
                        value={searchValue}
                        onChangeText={(value) => setSearchValue(value)}
                    ></Input>
                )}
            </View>
            {size !== "small" && (
                <View className="absolute  top-0 left-0 right-1 bottom-0 rounded-xl flex-row justify-end items-center  gap-2">
                    <Feather
                        name="camera"
                        size={18}
                        className="text-primary"
                        color="#004CFF"
                    />
                    <Button
                        onPress={() => {
                            router.replace({
                                pathname: "/search/[keyword]/results",
                                params: { keyword: searchValue },
                            });
                        }}
                        size="sm"
                        className="!py-[6] !px-4 !rounded-xl"
                    >
                        <Text className="text-white text-sm ">Tìm</Text>
                    </Button>
                </View>
            )}
        </Pressable>
    );
};

export default GlobalSearch;
