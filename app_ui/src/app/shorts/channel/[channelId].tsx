import { getChannelDetail, getChannelInfo } from "@/api/channel.api";
import Loading from "@/components/loading/Loading";
import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Redirect, router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

type Props = {};

const ProfilePage = (props: Props) => {
    const { channelId } = useLocalSearchParams();
    const { user } = useAuth();

    const isSelf = channelId === user?.id;

    const { data, isLoading, error } = useQuery({
        queryKey: [`channel-detail-${channelId}`],
        queryFn: async () => {
            if (isSelf) return await getChannelInfo();
            else return await getChannelDetail(channelId as string);
        },
        staleTime: 1000 * 60 * 60,
    });

    if ((error as any)?.status === 404) {
        if (isSelf) return <Redirect href="/shorts/channel/new"></Redirect>;
        return <Redirect href="/shorts/channel/channel-notfound"></Redirect>;
    }

    if (isLoading) return <Loading></Loading>;

    return (
        <View>
            <View className="relative h-[300] ">
                <Image
                    className="w-full h-full object-cover"
                    source={{ uri: data?.background }}
                ></Image>
                <View className="absolute top-0 left-0 size-full bg-slate-900/70"></View>
                <View className="absolute size-full top-0 left-0 p-4 pt-12 z-20">
                    <View className="flex-row justify-start">
                        <Button
                            onPress={() => router.back()}
                            className="max-w-max"
                            variant="ghost"
                            size="icon"
                        >
                            <AntDesign name="left" size={20} color="white" />
                        </Button>
                    </View>
                    <View className="">
                        <View className="flex justify-start items-center gap-x-2">
                            <Avatar size={100}>
                                <AvatarImage
                                    source={{ uri: data?.avatar }}
                                ></AvatarImage>
                            </Avatar>
                            <View>
                                <Text className="text-3xl font-semibold mt-2 text-center text-white">
                                    @{data?.name}
                                </Text>
                                <View className="my-4 flex-row justify-center items-center gap-x-5">
                                    <View className="justify-center items-center ">
                                        <Text className="text-xl font-semibold text-white">
                                            {data?.following}
                                        </Text>
                                        <Text className="text-white text-center ">
                                            Đang theo dõi
                                        </Text>
                                    </View>

                                    <View className="justify-center items-center">
                                        <Text className="text-xl font-semibold text-white">
                                            {data?.follower}
                                        </Text>
                                        <Text className="text-white text-center ">
                                            Người theo dõi
                                        </Text>
                                    </View>
                                </View>
                                {!isSelf && (
                                    <View className="my-3 flex flex-row justify-center items-center gap-x-3">
                                        <Button className="flex-1">
                                            <Text className="text-white">
                                                Theo dõi
                                            </Text>
                                        </Button>
                                        <Button variant="secondary">
                                            <AntDesign
                                                name="warning"
                                                size={18}
                                                color="black"
                                            />
                                        </Button>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View className="p-4 pb-[50] ">
                <FlatList
                    data={new Array(40).fill(0)}
                    renderItem={() => (
                        <View className="w-[100px] aspect-[9/16]  rounded-xl overflow-hidden m-1">
                            <Image
                                className="w-full h-full object-cover"
                                source={{
                                    uri: "https://i.pravatar.cc/150?img=31",
                                }}
                            ></Image>
                        </View>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                ></FlatList>
            </View>
        </View>
    );
};

export default ProfilePage;
