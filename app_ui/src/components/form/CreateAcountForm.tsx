import { createAccount } from "@/api/auth.api";
import { createAccountSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { z } from "zod";
import Button from "../ui/Button";
import Input from "../ui/Input";

type Props = {};

const CreateAcountForm = ({}: Props) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<z.infer<typeof createAccountSchema>>({
        resolver: zodResolver(createAccountSchema),
        defaultValues: {
            email: "hieu@gmail.com",
            password: "ABCabc123@",
            phone: "0916561442",
            username: "Minh Hiếu",
        },
    });

    const { mutateAsync: createAccountMutation, isPending } = useMutation({
        mutationKey: ["create-account"],
        mutationFn: (data: z.infer<typeof createAccountSchema>) =>
            createAccount(data),
    });

    const onSubmit = async (value: z.infer<typeof createAccountSchema>) => {
        try {
            const data = (await createAccountMutation(value)) as any;
            router.push({
                pathname: "/auth/register-otp",
                params: {
                    otpCode: data.code,
                },
            });
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Tạo tài khoản thất bại",
                text2: JSON.stringify(error),
            });
        }
    };

    return (
        <KeyboardAwareScrollView className="w-full">
            {/* <InputImage className="my-4"></InputImage> */}
            <View className="w-full my-5 !gap-y-3">
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                            placeholder="Mọi người có thể gọi bạn là gì?"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.username?.message}
                        ></Input>
                    )}
                    name="username"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Địa chỉ email của bạn"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.email?.message}
                        ></Input>
                    )}
                    name="email"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Số điện thoại"
                            autoCapitalize="none"
                            keyboardType="phone-pad"
                            textContentType="telephoneNumber"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.phone?.message}
                        ></Input>
                    )}
                    name="phone"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="••••••••••••••"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.password?.message}
                        ></Input>
                    )}
                    name="password"
                />

                <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
                    <Text className="text-white">
                        {isPending ? "Đang tạo tài khoản" : "Tạo tài khoản"}
                    </Text>
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default CreateAcountForm;
