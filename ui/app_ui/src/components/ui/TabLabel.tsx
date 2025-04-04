import React from "react";
import { Text } from "react-native";

type Props = {
    children: string;
    color: string;
};

const screenTranslates: Record<string, string> = {
    home: "Trang chủ",
    friend: "Bạn bè",
    shorts: "Video",
    chats: "Tin nhắn",
    notification: "Thông báo",
    profile: "Tôi",
};

const TabLabel = ({ children, color }: Props) => {
    return (
        <Text
            style={{ color }}
            className="text-xs font-semibold mt-1 text-center min-w-[140] "
        >
            {screenTranslates[children]}
        </Text>
    );
};

export default TabLabel;
