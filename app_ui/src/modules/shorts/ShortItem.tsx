import Button from "@/components/ui/Button";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
type Props = {};

const ShortItem = (props: Props) => {
    return (
        <Pressable
            onPress={() => router.push("/shorts/videos/trending/1")}
            className="relative mx-2 w-[100] aspect-[9/16]  rounded-xl overflow-hidden"
        >
            <View className="abs-center bg-slate-900/20 size-full"></View>
            <Button
                onPress={() => router.push("/shorts/videos/trending/1")}
                className="abs-center rounded-full size-[40]"
                size="icon"
            >
                <Entypo name="controller-play" size={32} color="white" />
            </Button>
            <Image
                className="w-full h-full object-cover"
                source={{
                    uri: "https://sneakernews.com/wp-content/uploads/2021/04/air-jordan-4-unc-store-list-3.jpg?w=1140",
                }}
            ></Image>
        </Pressable>
    );
};

export default ShortItem;
