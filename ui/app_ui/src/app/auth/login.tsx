import LoginForm from "@/components/form/LoginForm";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const index = () => {
    const router = useRouter();

    return (
        <>
            <View className="w-full h-[400px] absolute">
                <Image
                    className="w-[135%] h-full object-fill"
                    style={{ resizeMode: "cover" }}
                    source={require("@/assets/images/decorators/decorator_2.png")}
                ></Image>
            </View>
            <View className="mt-40">
                <View className="gap-y-3 mb-20">
                    <Text className="text-4xl font-semibold text-white">
                        Đăng nhập
                    </Text>
                    <Text className="text-2xl text-white">
                        Chào mừng quay lại
                    </Text>
                </View>
                <LoginForm></LoginForm>
                <View className="flex-row justify-center items-center my-5">
                    <Text>Bạn chưa là thành viên?</Text>
                    <Button
                        onPress={() => router.push("/auth/register" as any)}
                        variant="link"
                    >
                        <Text className="text-primary">Tạo tài khoản</Text>
                    </Button>
                </View>
            </View>
        </>
    );
};

export default index;
