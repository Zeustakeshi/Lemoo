import {
    AntDesign,
    FontAwesome5,
    Fontisto,
    MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import Avatar, { AvatarImage } from "../ui/Avatar";
import Button from "../ui/Button";
type Props = {};

const ShortVideoAction = ({}: Props) => {
    return (
        <View className="absolute justify-center items-center bottom-[20%] left-[82%] gap-y-3 z-10">
            <View className="relative">
                <Avatar size={50}>
                    <AvatarImage
                        source={{ uri: "https://i.pravatar.cc/150?img=31" }}
                    ></AvatarImage>
                </Avatar>
                <Button size="icon" className="my-1">
                    <AntDesign name="plus" size={14} color="white" />
                </Button>
            </View>

            <View className="justify-center items-center">
                <Button variant="ghost">
                    <Fontisto name="heart" size={32} color="white" />
                </Button>
                <Text className="text-white text-sm font-semibold">2k</Text>
            </View>

            <View className=" justify-center items-center flex-1">
                <Button variant="ghost">
                    <MaterialIcons name="comment" size={32} color="white" />
                </Button>
                <Text className="text-white text-sm font-semibold">2</Text>
            </View>

            <View className="justify-center items-center">
                <Button variant="ghost">
                    <FontAwesome5 name="share" size={32} color="white" />
                </Button>
                <Text className="text-white text-sm font-semibold">100</Text>
            </View>
        </View>
    );
};

export default ShortVideoAction;
