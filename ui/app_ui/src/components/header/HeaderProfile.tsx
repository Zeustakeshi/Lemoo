import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Text, View } from "react-native";
import LineScan from "./LineScan";
import Notification from "./Notification";
import Setting from "./Setting";

type Props = {};

const HeaderProfile = (props: Props) => {
    const { user } = useAuth();

    return (
        <View className="w-full flex-row justify-between items-center">
            <View className="flex-row justify-start items-center gap-2">
                <Avatar size={50}>
                    <AvatarImage
                        source={{
                            uri: user?.avatar,
                        }}
                    ></AvatarImage>
                </Avatar>
                <Button size="sm" className="rounded-full">
                    <Text className="text-white text-sm">
                        Hoạt động của tôi
                    </Text>
                </Button>
            </View>
            <View className="flex flex-row justify-end items-center gap-2">
                <LineScan></LineScan>
                <Notification></Notification>
                <Setting></Setting>
            </View>
        </View>
    );
};

export default HeaderProfile;
