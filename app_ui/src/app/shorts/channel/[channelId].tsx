import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import AppWrapper from "@/components/wrapper/AppWrapper";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

type Props = {};

const ProfilePage = (props: Props) => {
    return (
        <AppWrapper>
            <View className="flex-row justify-start">
                <Button
                    onPress={() => router.back()}
                    className="max-w-max"
                    variant="ghost"
                    size="icon"
                >
                    <AntDesign name="left" size={20} color="black" />
                </Button>
            </View>
            <View className="my-5">
                <View className="flex justify-start items-center gap-x-2">
                    <Avatar size={100}>
                        <AvatarImage
                            source={{ uri: "https://i.pravatar.cc/150?img=32" }}
                        ></AvatarImage>
                    </Avatar>
                    <View>
                        <Text className="text-3xl font-semibold mt-2 text-center">
                            Lorem_romina_ae@
                        </Text>
                        <View className="my-4 flex-row justify-center items-center gap-x-5">
                            <View className="justify-center items-center ">
                                <Text className="text-xl font-semibold">
                                    1k
                                </Text>
                                <Text className="text-muded text-center ">
                                    Đang theo dõi
                                </Text>
                            </View>

                            <View className="justify-center items-center">
                                <Text className="text-xl font-semibold">
                                    500
                                </Text>
                                <Text className="text-muded text-center ">
                                    Người theo dõi
                                </Text>
                            </View>

                            <View className="justify-center items-center">
                                <Text className="text-xl font-semibold">
                                    10k
                                </Text>
                                <Text className="text-muded text-center  ">
                                    Lượt thích
                                </Text>
                            </View>
                        </View>
                        <View className="my-3 flex flex-row justify-center items-center gap-x-3">
                            <Button className="flex-1">
                                <Text className="text-white">Theo dõi</Text>
                            </Button>
                            <Button variant="secondary">
                                <AntDesign
                                    name="warning"
                                    size={18}
                                    color="black"
                                />
                            </Button>
                        </View>
                    </View>
                </View>
            </View>

            <View className="pb-[50]">
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
        </AppWrapper>
    );
};

export default ProfilePage;
