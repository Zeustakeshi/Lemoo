import { resendMfaOtp, verifyMfaOtp } from "@/api/auth.api";
import Button from "@/components/ui/Button";
import InputOtp from "@/components/ui/InputOtp";
import { useAuth } from "@/context/AuthContext";
import { otpSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

type Props = {
    otpCode: string;
};

const VerifyMfaOtpForm = ({ otpCode }: Props) => {
    const { login } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            code: otpCode,
        },
    });

    const { mutateAsync: verifyOtpMuation, isPending: isVerifyPending } =
        useMutation({
            mutationKey: ["verify-mfa", otpCode],
            mutationFn: (data: z.infer<typeof otpSchema>) => verifyMfaOtp(data),
        });

    const { mutateAsync: resendOtpMuation, isPending: isResendPending } =
        useMutation({
            mutationKey: ["resend-mfa-otp", otpCode],
            mutationFn: () => resendMfaOtp(otpCode),
        });

    const onSubmit = async (value: z.infer<typeof otpSchema>) => {
        try {
            const data = await verifyOtpMuation(value);
            await login(data);
            router.replace("/(tabs)/home");
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Xác thực thất bại",
                text2: error.message,
            });
        }
    };

    const handleResendOtp = async () => {
        try {
            await resendOtpMuation();
            Toast.show({
                type: "success",
                text1: "Gửi lại thành công",
                text2: "Mã otp mới đã được gửi thành công đến địa chỉ email của bạn.",
            });
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Gửi lại thất bại",
                text2: error,
            });
        }
    };

    return (
        <View className="my-10 w-full flex justify-center items-center">
            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange } }) => (
                    <InputOtp
                        onChange={onChange}
                        error={errors.otp?.message}
                    ></InputOtp>
                )}
                name="otp"
            />
            <View className="flex justify-center items-center flex-row my-6 space-x-2">
                <Text>Bạn chưa nhận được mã?</Text>
                <Button
                    disabled={isResendPending}
                    onPress={handleResendOtp}
                    variant="link"
                >
                    <Text className="text-primary">Gửi lại</Text>
                </Button>
            </View>
            <Button
                disabled={isVerifyPending}
                onPress={handleSubmit(onSubmit)}
                className="w-full"
            >
                <Text className="text-white">
                    {isVerifyPending ? "Đang xác thực" : "Xác nhận"}
                </Text>
            </Button>
        </View>
    );
};

export default VerifyMfaOtpForm;
