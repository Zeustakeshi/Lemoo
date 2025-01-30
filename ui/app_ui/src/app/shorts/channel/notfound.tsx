import Button from "@/components/ui/Button";
import SceenHeaderBack from "@/components/ui/SceenHeaderBack";
import AppWrapper from "@/components/wrapper/AppWrapper";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {};

const ChannelNotFound = (props: Props) => {
    return (
        <AppWrapper>
            <SceenHeaderBack>
                <Text className="text-xl font-semibold">
                    Kênh không tồn tại
                </Text>
            </SceenHeaderBack>
            <View className="flex-1 justify-center items-center">
                <View className="size-[150]">
                    <Image
                        resizeMode="cover"
                        className="w-full h-full object-cover"
                        source={require("@/assets/images/icons/404-error.png")}
                    ></Image>
                </View>
                <View className=" justify-center items-center gap-3 my-6 w-[200]">
                    <Button className="w-full">
                        <Text className="text-white">Kênh của tôi</Text>
                    </Button>
                </View>
            </View>
        </AppWrapper>
    );
};

export default ChannelNotFound;
