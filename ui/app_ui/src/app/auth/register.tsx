import CreateAcountForm from "@/components/form/CreateAcountForm";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {};

const register = (props: Props) => {
    const router = useRouter();

    return (
        <>
            <View className="w-full h-[300px] absolute">
                <Image
                    className="w-[110%] h-full object-fill"
                    style={{ resizeMode: "cover" }}
                    source={require("@/assets/images/decorators/decorator_1.png")}
                ></Image>
            </View>
            <View className="mt-36">
                <Text className="text-4xl font-semibold mb-5">
                    Tạo tài khoản
                </Text>
                <CreateAcountForm></CreateAcountForm>
                <View className="flex-row justify-center items-center my-2">
                    <Text>Bạn đã có tài khoản?</Text>
                    <Button
                        onPress={() => router.push("/auth/login" as any)}
                        variant="link"
                    >
                        <Text className="text-primary">Đăng nhập ngay</Text>
                    </Button>
                </View>
            </View>
        </>
    );
};

export default register;
