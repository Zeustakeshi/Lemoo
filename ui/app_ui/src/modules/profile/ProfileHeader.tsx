import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import AppWrapper from "@/components/wrapper/AppWrapper";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

type Props = {};

const ProfileHeader = (props: Props) => {
    const { user } = useAuth();

    return (
        <View className="">
            <LinearGradient
                className="absolute top-0 left-0 size-full"
                colors={["#eff6ff", "#bfdbfe", "#93c5fd"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
            <AppWrapper className="!bg-transparent flex-row justify-between">
                <View className="flex-row gap-4 items-center">
                    <Avatar size={60}>
                        <AvatarImage
                            source={{ uri: user?.avatar }}
                        ></AvatarImage>
                    </Avatar>
                    <View>
                        <Text className="text-xl font-semibold mb-1">
                            {user?.displayName}
                        </Text>

                        <View className="bg-slate-100/90 px-2 py-1 rounded-md">
                            <Text className="text-xs text-primary font-semibold">
                                5 voucher | có voucher giảm 50%
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Button variant="ghost" size="icon">
                        <Ionicons
                            name="settings-outline"
                            size={20}
                            color="black"
                        />
                        <Text className="text-xs mt-1 font-semibold">
                            Cài đặt
                        </Text>
                    </Button>
                </View>
            </AppWrapper>
        </View>
    );
};

export default ProfileHeader;
