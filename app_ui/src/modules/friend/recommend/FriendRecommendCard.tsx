import { addFriend } from "@/api/friend.api";
import { FriendRecommend } from "@/common/type/friend";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import FriendCard from "../FriendCard";

type Props = {
    user: FriendRecommend;
};

const FriendRecommendCard = ({ user }: Props) => {
    const [isDeleted, setDeleted] = useState<boolean>(false);

    const { mutateAsync, isPending, isSuccess } = useMutation({
        mutationKey: ["add-friend", user.id],
        mutationFn: () => addFriend(user.id),
    });

    const handleAddFriend = async () => {
        try {
            await mutateAsync();
            Toast.show({
                text1: `Đã gửi lời mời kết bạn đến ${user.displayName}`,
            });
            setDeleted(true);
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Đồng ý kết bạn thất bại",
                text2: error.message,
            });
        }
    };

    if (isDeleted) return null;

    return (
        <FriendCard avatar={user.avatar}>
            <Text className="text-xl font-semibold">{user.displayName}</Text>
            <Text numberOfLines={1} className="text-sm text-muded line-clamp-1">
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus, repudiandae! */}
            </Text>
            <View className="flex-row justify-start w-full items-center gap-2 mt-2 ">
                {isSuccess ? (
                    <Button
                        variant="secondary"
                        size="sm"
                        className="min-w-[100px] w-[150]"
                    >
                        <Text className="text-primary">Hủy</Text>
                    </Button>
                ) : (
                    <Button
                        disabled={isPending}
                        onPress={handleAddFriend}
                        size="sm"
                        className="min-w-[100px] w-[150]"
                    >
                        <Text className="text-white">Kết bạn</Text>
                    </Button>
                )}
            </View>
        </FriendCard>
    );
};

export default FriendRecommendCard;
