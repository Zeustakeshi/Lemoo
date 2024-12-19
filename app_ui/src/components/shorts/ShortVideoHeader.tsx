import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import Button from "../ui/Button";

type Props = {};

const ShortVideoHeader = (props: Props) => {
    return (
        <View className="absolute top-[50] left-[5] z-20 px-5 flex-row justify-between items-center gap-3 w-full">
            <View className="flex flex-row justify-start items-center gap-4">
                <Button
                    variant="link"
                    onPress={() => router.push("/(tabs)/shorts/channel/1")}
                >
                    <AntDesign name="user" size={22} color="white" />
                </Button>
                <Button variant="link">
                    <Feather name="search" size={22} color="white" />
                </Button>
            </View>
            {/* <VideoUploader></VideoUploader> */}
        </View>
    );
};

export default ShortVideoHeader;
