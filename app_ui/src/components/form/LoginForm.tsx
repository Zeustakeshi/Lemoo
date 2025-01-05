import { login as loginApi } from "@/api/auth.api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { z } from "zod";

type Props = {};

const LoginForm = (props: Props) => {
    const { login } = useAuth();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {},
    });

    const { mutateAsync: loginMutation, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: (data: z.infer<typeof loginSchema>) => loginApi(data),
    });

    const onSubmit = async (value: z.infer<typeof loginSchema>) => {
        try {
            const data = await loginMutation(value);
            if (data.code) {
                router.push({
                    pathname: "/auth/mfa-otp",
                    params: {
                        otpCode: data.code,
                    },
                });
            } else {
                await login(data);
                router.replace("/(tabs)/home");
            }
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Đăng nhập thất bại",
                text2: error.message,
            });
        }
    };

    return (
        <KeyboardAwareScrollView className="w-full">
            <View className="w-full my-5 !gap-y-3">
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                            placeholder="Email hoặc số điện thoại"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.accountName?.message}
                        ></Input>
                    )}
                    name="accountName"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                            placeholder="••••••••••••••"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.password?.message}
                        ></Input>
                    )}
                    name="password"
                />

                <View className="my-3 flex-row justify-end">
                    <Button variant="link">
                        <Text className="text-primary">Quên mật khẩu?</Text>
                    </Button>
                </View>

                <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
                    <Text className="text-white">
                        {isPending ? "Đang đăng nhập" : "Đăng nhập"}
                    </Text>
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default LoginForm;
