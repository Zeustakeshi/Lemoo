import Button from "@/components/ui/Button";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

type Props = {};

const ProductReaction = (props: Props) => {
    return (
        <View className="flex-1 flex-row justify-end items-center gap-3">
            <Button variant="ghost" size="icon">
                <AntDesign name="hearto" size={20} color="black" />
            </Button>
            <Button variant="ghost" size="icon">
                <Ionicons name="share-social-outline" size={20} color="black" />
            </Button>
            <Button variant="ghost" size="icon">
                <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={20}
                    color="black"
                />
            </Button>
        </View>
    );
};

export default ProductReaction;
