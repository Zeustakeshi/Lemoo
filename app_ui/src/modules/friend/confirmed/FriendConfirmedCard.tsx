import { FriendResponse } from "@/common/type/friend";
import Button from "@/components/ui/Button";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import FriendCard from "../FriendCard";

type Props = {
    user: FriendResponse;
};

const FriendConfirmedCard = ({ user }: Props) => {
    return (
        <FriendCard avatar={user.avatar}>
            <Text className="text-xl font-semibold">{user.username}</Text>
            <View className="flex-row justify-start w-full items-center gap-2 flex-1 ">
                <Button variant="secondary" size="sm" className="">
                    <AntDesign name="shoppingcart" size={16} color="#004CFF" />
                </Button>
                <Button variant="secondary" size="sm" className="">
                    <AntDesign name="message1" size={16} color="#004CFF" />
                </Button>
                <Button variant="secondary" size="sm" className="">
                    <AntDesign name="deleteuser" size={16} color="#f43f5e" />
                </Button>
            </View>
        </FriendCard>
    );
};

export default FriendConfirmedCard;
