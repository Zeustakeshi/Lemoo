import { cn } from "@/lib/cn";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { View } from "react-native";

type Props = {
    className?: string;
};

const InputImage = ({ className }: Props) => {
    return (
        <View
            className={cn(
                "size-[100px] justify-center items-center p-5 rounded-full border-2 border-dashed border-primary",
                className
            )}
        >
            <Feather name="camera" size={32} color="#004CFF" />
        </View>
    );
};

export default InputImage;
