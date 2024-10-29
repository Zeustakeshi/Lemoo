import { loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";
import Button from "../ui/Button";
import Input from "../ui/Input";

type Props = {};

const LoginForm = (props: Props) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (value: z.infer<typeof loginSchema>) => {
        console.log({ value });
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

                <Button onPress={handleSubmit(onSubmit)}>
                    <Text className="text-white">Đăng nhập</Text>
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default LoginForm;
