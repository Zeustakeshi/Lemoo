import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Avatar, { AvatarImage } from "../ui/Avatar";
import Button from "../ui/Button";

type Props = {};

const ChatItem = (props: Props) => {
    return (
        <Button
            onPress={() => {
                router.push("/chats/1");
            }}
            variant="link"
            className="flex flex-row justify-start items-start gap-1 my-1 p-2 max-w-[100%]"
        >
            <Avatar variant="square" size={60}>
                <AvatarImage
                    source={{ uri: "https://i.pravatar.cc/150?img=31" }}
                ></AvatarImage>
            </Avatar>
            <View className="px-3 max-w-[100%]">
                <View className="mb-1 flex flex-row justify-between items-center">
                    <Text className="text-xl font-semibold ">Maggy Lee</Text>
                    <Text className="pr-5 text-muded text-sm">20:20</Text>
                </View>
                <Text
                    className="text-sm text-muded max-w-[90%]"
                    lineBreakMode="clip"
                    numberOfLines={2}
                >
                    Bạn: Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Iure laboriosam quia minus? Laborum dolorem accusamus
                    laudantium vitae aspernatur corporis perspiciatis!
                </Text>
            </View>
        </Button>
    );
};

export default ChatItem;
