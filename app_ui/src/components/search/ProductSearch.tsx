import AnimatedTyping from "@/components/ui/AnimatedTyping";
import { searchTextSuggestions } from "@/data/search";
import { cn } from "@/lib/cn";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

type Props = {
    size?: "small" | "normal" | "large";
    className?: string;
};

const ProductSearch = ({ size = "normal", className }: Props) => {
    return (
        <View
            className={cn(
                "shadow-2xl shadow-slate-500  relative z-10  pr-8 rounded-xl bg-slate-50 border border-primary overflow-hidden",
                className
            )}
        >
            <View
                className={cn("p-4 px-5 rounded-xl bg-slate-50 w-full", {
                    "!px-3 !py-2": size === "small",
                })}
            >
                <AnimatedTyping
                    texts={searchTextSuggestions}
                    animatedTime={50}
                    intervalTime={4000}
                    className="text-xs text-primary line-clamp-1"
                ></AnimatedTyping>
            </View>
            <View className="absolute  right-1 size-12 rounded-xl flex justify-center items-center">
                {size !== "small" && (
                    <Feather
                        name="camera"
                        size={18}
                        className="text-primary"
                        color="#004CFF"
                    />
                )}
            </View>
        </View>
    );
};

export default ProductSearch;
