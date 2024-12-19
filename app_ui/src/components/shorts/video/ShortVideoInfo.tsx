import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import React from "react";
import { Text, View } from "react-native";

type Props = {};

const ShortVideoInfo = (props: Props) => {
    return (
        <View className="absolute bottom-10 px-5 py-2 bg-slate-900/30 rounded-md w-full">
            <View className="flex flex-row gap-x-2">
                <Avatar>
                    <AvatarImage
                        source={{ uri: "https://i.pravatar.cc/150?img=31" }}
                    ></AvatarImage>
                </Avatar>

                <View>
                    <Text className="text-white font-semibold text-lg ">
                        @PhamMinhHieu
                    </Text>
                    <View>
                        <Text
                            numberOfLines={3}
                            className="text-white text-sm font-semibold max-w-[90%]"
                        >
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Enim, officiis voluptate numquam fuga pariatur
                            ab sit cumque sunt nisi necessitatibus?
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ShortVideoInfo;
