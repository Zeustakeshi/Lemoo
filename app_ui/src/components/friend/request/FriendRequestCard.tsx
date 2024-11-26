import React from "react";
import { Text, View } from "react-native";
import Button from "../../ui/Button";
import FriendCard from "../FriendCard";

type Props = {};

const FriendRequestCard = (props: Props) => {
    return (
        <FriendCard>
            <View className="flex-row justify-between items-center my-1">
                <Text className="text-xl font-semibold">Minh Hiếu</Text>
                <Text className="text-sm text-muded">4 phút trước</Text>
            </View>
            <Text numberOfLines={1} className="text-sm text-muded line-clamp-1">
                Minh Hiếu đã gửi lời mời kết bạn
            </Text>
            <View className="flex-row justify-start w-full items-center gap-2 mt-2 ">
                <Button variant="secondary" size="sm" className="min-w-[100px]">
                    <Text className="text-primary">Hủy</Text>
                </Button>
                <Button size="sm" className="min-w-[100px]">
                    <Text className="text-white">Đồng ý</Text>
                </Button>
            </View>
        </FriendCard>
    );
};

export default FriendRequestCard;
