import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import React, { ReactNode } from "react";
import { View } from "react-native";

const defaultAvatar =
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

type Props = {
    children: ReactNode;
    avatar?: string;
};

const FriendCard = ({ children, avatar = defaultAvatar }: Props) => {
    return (
        <View className=" flex-row justify-start items-start gap-2 p-2">
            <Avatar size={80} variant="square">
                <AvatarImage
                    source={{
                        uri: avatar,
                    }}
                ></AvatarImage>
            </Avatar>
            <View>{children}</View>
        </View>
    );
};

export default FriendCard;
