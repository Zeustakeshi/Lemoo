import VerifyMfaOtpForm from "@/components/form/VerifyMfaOtpForm";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {};

const MfaOtp = (props: Props) => {
    const { otpCode } = useLocalSearchParams();
    return (
        <>
            <View className="w-full h-[280px] absolute">
                <Image
                    className="w-[150%] h-full object-fill"
                    style={{ resizeMode: "cover" }}
                    source={require("@/assets/images/decorators/decorator_3.png")}
                ></Image>
            </View>
            <View className="mt-56">
                <Text className="text-4xl font-semibold mb-5">
                    Xác thực 2 bước
                </Text>
                <Text className="text-sm ">
                    Mã xác mình gồm 6 chữ số đã được gửi đến địa chỉ email của
                    bạn. Vui lòng kiểm tra email và xác thực tài khoản.
                </Text>
            </View>
            <VerifyMfaOtpForm otpCode={otpCode as string}></VerifyMfaOtpForm>
            <View className="flex-1"></View>
        </>
    );
};

export default MfaOtp;
