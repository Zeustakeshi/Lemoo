import Button from "@/components/ui/Button";
import { RootState } from "@/store/store";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

type Props = {
    isSelf: boolean;
};

const ChannelHeader = ({ isSelf }: Props) => {
    const { channel } = useSelector((state: RootState) => state.channel);

    return (
        <View className=" w-full bg-white/20 flex-row justify-between py-2 px-4">
            <Button
                onPress={() => router.back()}
                className="max-w-max   "
                variant="ghost"
                size="icon"
            >
                <AntDesign name="left" size={20} color="black" />
            </Button>
            {isSelf && (
                <Button
                    variant="ghost"
                    size="icon"
                    onPress={() =>
                        router.push({
                            pathname: "/shorts/channel/[channelId]/settings",
                            params: {
                                channelId: channel?.id as string,
                            },
                        })
                    }
                >
                    <AntDesign name="setting" size={22} color="black" />
                </Button>
            )}
        </View>
    );
};

export default ChannelHeader;
