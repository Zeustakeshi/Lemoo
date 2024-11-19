import Button from "@/components/ui/Button";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import FriendCard from "../FriendCard";

type Props = {};

const FriendConfirmedCard = (props: Props) => {
    return (
        <FriendCard>
            <Text className="text-xl font-semibold">Minh Hiếu</Text>
            <Text numberOfLines={1} className="text-sm text-muded line-clamp-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
                earum sunt nisi laboriosam quis eveniet rem non maxime commodi
                dolor!
            </Text>
            <View className="flex-row justify-start w-full items-center gap-2 mt-2 ">
                <Button variant="secondary" size="sm" className="">
                    <AntDesign name="shoppingcart" size={18} color="#004CFF" />
                </Button>
                <Button variant="secondary" size="sm" className="">
                    <AntDesign name="message1" size={18} color="#004CFF" />
                </Button>
                <Button variant="secondary" size="sm" className="">
                    <AntDesign name="setting" size={18} color="#004CFF" />
                </Button>
            </View>
        </FriendCard>
    );
};

export default FriendConfirmedCard;
