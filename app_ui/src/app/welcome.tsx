import Button from "@/components/ui/Button";
import AppWrapper from "@/components/wrapper/AppWrapper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Welcome = () => {
    const router = useRouter();

    return (
        <AppWrapper className="flex-1 ">
            <View className="flex-1 mb-16">
                <View className="flex-1 flex justify-center items-center">
                    <View className="w-[150px] h-[150px]  flex justify-center items-center rounded-full border border-slate-200 overflow-hidden">
                        <Image
                            source={require("@/assets/images/logo.png")}
                            className="w-[60%] h-[60%] object-cover rounded-full"
                            style={{ resizeMode: "contain" }}
                        ></Image>
                    </View>
                    <View className=" my-4 justify-center items-center">
                        <Text className="text-5xl font-semibold my-3">
                            Lemoo
                        </Text>
                        <Text className=" my-2 text-muded">
                            Mua sắm và tương tác theo cách của bạn.
                        </Text>
                    </View>
                </View>
                <View>
                    <Button
                        onPress={() => router.push("/auth/register" as any)}
                    >
                        <Text className="text-white">Tham gia ngay</Text>
                    </Button>
                    <Button
                        onPress={() => router.push("/auth/login" as any)}
                        variant="link"
                        className="mb-3 mt-5 flex-row justify-center items-center gap-3"
                    >
                        <Text>Tôi đã có tài khoản</Text>
                        <Button size="icon" className="rounded-full">
                            <AntDesign
                                name="arrowright"
                                size={24}
                                color="white"
                            />
                        </Button>
                    </Button>
                </View>
            </View>
        </AppWrapper>
    );
};

const styles = StyleSheet.create({
    logoShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});

export default Welcome;
