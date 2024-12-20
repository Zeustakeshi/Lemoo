import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { RootState } from "@/store/store";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

type Props = {
    isSelf: boolean;
};

const ChannelProfileHeader = ({ isSelf }: Props) => {
    const { channel } = useSelector((state: RootState) => state.channel);
    return (
        <View
            className={cn("relative h-[300] ", {
                "h-[250]": isSelf,
            })}
        >
            <Image
                className="w-full h-full object-cover"
                source={{ uri: channel?.background }}
            ></Image>

            <View className="absolute top-0 left-0 size-full bg-slate-900/70"></View>

            <View className="absolute size-full top-0 left-0 p-4 pt-12 z-20">
                <View className="absolute top-14 left-5 flex-row justify-start">
                    <Button
                        onPress={() => router.back()}
                        className="max-w-max"
                        variant="ghost"
                        size="icon"
                    >
                        <AntDesign name="left" size={20} color="white" />
                    </Button>
                </View>
                {isSelf && (
                    <View className="absolute top-14 right-5">
                        <Button
                            variant="ghost"
                            size="icon"
                            onPress={() =>
                                router.push({
                                    pathname:
                                        "/shorts/channel/[channelId]/settings",
                                    params: {
                                        channelId: channel?.id as string,
                                    },
                                })
                            }
                        >
                            <AntDesign name="setting" size={22} color="white" />
                        </Button>
                    </View>
                )}
                <View className="">
                    <View className="flex justify-start items-center gap-x-2">
                        <Avatar size={100}>
                            <AvatarImage
                                source={{ uri: channel?.avatar }}
                            ></AvatarImage>
                        </Avatar>
                        <View>
                            <Text className="text-xl font-semibold mt-2 text-center text-white line-clamp-">
                                @{channel?.name}
                            </Text>
                            <View className="mb-4 mt-2 flex-row justify-center items-center gap-x-5">
                                <View className="justify-center items-center ">
                                    <Text className="text-xl font-semibold text-white">
                                        {channel?.following}
                                    </Text>
                                    <Text className="text-white text-center text-sm ">
                                        Đang theo dõi
                                    </Text>
                                </View>

                                <View className="justify-center items-center">
                                    <Text className="text-xl font-semibold text-white">
                                        {channel?.follower}
                                    </Text>
                                    <Text className="text-white text-center text-sm">
                                        Người theo dõi
                                    </Text>
                                </View>
                            </View>
                            {!isSelf && (
                                <View className=" flex flex-row justify-center items-center gap-x-3">
                                    <Button className="flex-1 w-[200]">
                                        <Text className="text-white">
                                            Theo dõi
                                        </Text>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="!bg-destructive/50 "
                                    >
                                        <AntDesign
                                            name="warning"
                                            size={18}
                                            color="white"
                                        />
                                    </Button>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ChannelProfileHeader;
