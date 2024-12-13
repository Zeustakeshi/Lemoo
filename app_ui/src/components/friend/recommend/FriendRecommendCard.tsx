import { addFriend } from "@/api/friend.api";
import { FriendRecommend } from "@/common/type/friend";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Button from "../../ui/Button";
import FriendCard from "../FriendCard";

type Props = {
    user: FriendRecommend;
};

const FriendRecommendCard = ({ user }: Props) => {
    const [adddFriendSuccess, setAddFriendSuccess] = useState<boolean>(false);

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["add-friend", user.id],
        mutationFn: () => addFriend(user.id),
    });

    const handleAddFriend = async () => {
        try {
            const data = mutateAsync();
            setAddFriendSuccess(true);
        } catch (error: any) {
            console.log({ error });
            setAddFriendSuccess(false);
        }
    };

    return (
        <FriendCard avatar={user.avatar}>
            <Text className="text-xl font-semibold">{user.displayName}</Text>
            <Text numberOfLines={1} className="text-sm text-muded line-clamp-1">
                {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
                earum sunt nisi laboriosam quis eveniet rem non maxime commodi
                dolor! */}
            </Text>
            <View className="flex-row justify-start w-full items-center gap-2 mt-2 ">
                {adddFriendSuccess ? (
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
