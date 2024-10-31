import React from "react";
import { Text, View } from "react-native";
import Button from "../../ui/Button";
import FriendCard from "../FriendCard";

type Props = {};

const FriendRecommendCard = (props: Props) => {
    return (
        <FriendCard>
            <Text className="text-xl font-semibold">Minh Hiếu</Text>
            <Text numberOfLines={1} className="text-sm text-muded line-clamp-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
                earum sunt nisi laboriosam quis eveniet rem non maxime commodi
                dolor!
            </Text>
            <View className="flex-row justify-start w-full items-center gap-2 mt-2 ">
                <Button variant="secondary" size="sm" className="min-w-[100px]">
                    <Text className="text-primary">Hủy</Text>
                </Button>
                <Button size="sm" className="min-w-[100px]">
                    <Text className="text-white">Kết bạn</Text>
                </Button>
            </View>
        </FriendCard>
    );
};

export default FriendRecommendCard;
