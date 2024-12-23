import { createChannel } from "@/api/channel.api";
import { useAuth } from "@/context/AuthContext";
import {
    CreateChannelSchema,
    CreateChannelType,
} from "@/schema/channel.schema";
import { setChannel } from "@/store/shorts/ChannelSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import Input from "../ui/Input";

type Props = {};

const CreateChannelForm = (props: Props) => {
    const { user } = useAuth();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateChannelType>({
        resolver: zodResolver(CreateChannelSchema),
    });

    const dispatch = useDispatch();

    const { mutateAsync: createChannelMutate, isPending } = useMutation({
        mutationKey: ["create-shorts-channel"],
        mutationFn: async (data: CreateChannelType) =>
            await createChannel(data),
    });

    const handleCreateChannel = async (value: CreateChannelType) => {
        try {
            const data: any = await createChannelMutate(value);
            router.replace({
                pathname: "/shorts/channel/[channelId]",
                params: { channelId: user?.id as string },
            });
            dispatch(setChannel(data));
        } catch (error: any) {
            console.log({ error });
            Toast.show({
                type: "error",
                text1: "Tạo tài kênh thất bại",
                text2: error.message,
            });
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerClassName="flex-1 py-5 w-full h-full"
            className=""
        >
            <View className="flex-1 gap-y-5">
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                            className="rounded-md"
                            placeholder="Tên kênh của bạn là gì?"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.name?.message}
                        ></Input>
                    )}
                    name="name"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                            className="rounded-md text-start justify-start min-h-5"
                            placeholder="Nhập mô tả cho kênh của bạn"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.description?.message}
                            multiline
                            numberOfLines={8}
                        ></Input>
                    )}
                    name="description"
                />
            </View>
            <Text className="text-center text-sm text-muded my-5 mb-8">
                Bằng cách nhấn tạo kênh tôi đã đồng ý với các điều khoản dành
                cho nhà sáng tạo nội dung của{" "}
                <Text className="text-primary font-semibold">Lemoo</Text>
            </Text>
            <Button
                disabled={isPending}
                onPress={handleSubmit(handleCreateChannel)}
            >
                <Text className="text-white">
                    {isPending ? "Đang tạo kênh" : "Xác nhận tạo kênh"}
                </Text>
            </Button>
        </KeyboardAwareScrollView>
    );
};

export default CreateChannelForm;
