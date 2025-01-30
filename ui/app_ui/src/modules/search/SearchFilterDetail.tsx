import { cn } from "@/lib/cn";
import React from "react";
import { Dimensions, Text, View } from "react-native";

type Props = {
    className?: string;
};

const { width } = Dimensions.get("window");

const SearchFilterDetail = ({ className }: Props) => {
    return (
        <View
            className={cn(
                "p-3 absolute z-50 bg-white  top-full  left-0 right-0 min-h-[400]",
                className
            )}
        >
            <Text>asdfasadfsasadfsdfadsfasdf</Text>
        </View>
    );
};

export default SearchFilterDetail;
