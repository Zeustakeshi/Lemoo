import { acceptFriend } from "@/api/friend.api";
import { FriendInvitation } from "@/common/type/friend";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import FriendCard from "../FriendCard";

type Props = {
    user: FriendInvitation;
};

const FriendRequestCard = ({ user }: Props) => {
    const [isDeleted, setDeleted] = useState<boolean>(false);

    const { mutateAsync: accreptFriendMutate, isPending: isAcceptPending } =
        useMutation({
            mutationKey: ["accept-friend", user.requestId],
            mutationFn: async () => await acceptFriend(user.requestId),
        });

    const { mutateAsync: rejectFriendMutate, isPending: isRejectPending } =
        useMutation({
            mutationKey: ["reject-friend", user.requestId],
            mutationFn: async () => await acceptFriend(user.requestId),
        });

    if (isDeleted) return null;

    const handleRejectFriend = async () => {
        try {
            rejectFriendMutate();
            setDeleted(true);
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Hủy kết bạn thất bại",
                text2: error.message,
            });
        }
    };

    const handleAcceptFriend = async () => {
        try {
            await accreptFriendMutate();
            Toast.show({
                text1: "Kết bạn thành công",
                text2: `Bạn và ${user.username} đã là bạn bè`,
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

    return (
        <FriendCard>
            <Text className="text-xl font-semibold">{user.username}</Text>
            <Text className="text-sm text-primary">
                {moment(user.timestamp).fromNow()}
            </Text>
            <Text numberOfLines={1} className="text-sm text-muded line-clamp-1">
                {user.username} đã gửi lời mời kết bạn
            </Text>
            <View className="flex-row justify-start w-full items-center gap-2 mt-2 ">
                <Button
                    disabled={isRejectPending}
                    onPress={handleRejectFriend}
                    variant="secondary"
                    size="sm"
                    className="min-w-[100px]"
                >
                    <Text className="text-primary">Hủy</Text>
                </Button>
                <Button
                    onPress={handleAcceptFriend}
                    disabled={isAcceptPending}
                    size="sm"
                    className="min-w-[100px]"
                >
                    <Text className="text-white">Đồng ý</Text>
                </Button>
            </View>
        </FriendCard>
    );
};

export default FriendRequestCard;
