import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

type Props = {};

const ShortVideoHeader = (props: Props) => {
    const { user } = useAuth();
    if (!user) return <View>Not Authenticated</View>;
    return (
        <View className="absolute top-[50] left-[5] z-20 px-5 flex-row justify-between items-center gap-3 w-full">
            <View className="flex flex-row justify-start items-center gap-4">
                <Button
                    variant="link"
                    onPress={() =>
                        router.push({
                            pathname: "/shorts/channel/[channelId]",
                            params: { channelId: user.id },
                        })
                    }
                >
                    <AntDesign name="user" size={22} color="white" />
                </Button>
                <Button variant="link">
                    <Feather name="search" size={22} color="white" />
                </Button>
            </View>
            {/* <VideoUploader></VideoUploader> */}
        </View>
    );
};

export default ShortVideoHeader;
