import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

type Props = {};

const ChatHeader = (props: Props) => {
    return (
        <View className="flex flex-row justify-between items-center border-b-slate-200 border-b pb-3">
            <View className="flex flex-row justify-start items-center gap-x-3">
                <Button variant="link" onPress={() => router.back()}>
                    <AntDesign name="left" size={18} color="black" />
                </Button>
                <Avatar>
                    <AvatarImage
                        source={{ uri: "https://i.pravatar.cc/150?img=31" }}
                    ></AvatarImage>
                </Avatar>
                <View>
                    <Text className="text-2xl text-primary font-semibold">
                        Maggy Lee
                    </Text>
                    <Text className="text-sm text-muded">Đang hoạt động</Text>
                </View>
            </View>
            <Button variant="ghost">
                <Feather name="settings" size={22} color="black" />
            </Button>
        </View>
    );
};

export default ChatHeader;
