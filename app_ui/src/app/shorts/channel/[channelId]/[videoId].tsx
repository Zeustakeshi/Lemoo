import { updateVideoMetadata } from "@/api/channel.api";
import Button from "@/components/ui/Button";
import SceenHeaderBack from "@/components/ui/SceenHeaderBack";
import AppWrapper from "@/components/wrapper/AppWrapper";
import {
    UpdateVideoMetadataSchema,
    UpdateVideoMetadataType,
} from "@/schema/channel.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import CheckBox from "react-native-check-box";
import Toast from "react-native-toast-message";

type Props = {};

const UpdateVideo = (props: Props) => {
    const form = useForm<UpdateVideoMetadataType>({
        resolver: zodResolver(UpdateVideoMetadataSchema),
        defaultValues: {
            tags: [
                "hello world",
                "hello world 02",
                "minh Hiếu",
                "12asdfasdf3",
                "45afasdfasdfsa6",
            ],
            products: ["1", "2", "3", "4"],
            isPublic: true,
        },
    });
    const { videoId, channelId } = useLocalSearchParams();

    const { mutateAsync: updateMetadataMutate, isPending } = useMutation({
        mutationKey: [`update-video-metadata-${videoId}`],
        mutationFn: async (data: UpdateVideoMetadataType) =>
            await updateVideoMetadata(
                channelId as string,
                videoId as string,
                data
            ),
    });

    const handleUpdateVideoMetadata = async (
        value: UpdateVideoMetadataType
    ) => {
        try {
            await updateMetadataMutate(value);
            Toast.show({
                type: "success",
                text1: "Cập nhật video thành công",
            });
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Cập nhật video thất bại",
                text2: error.message,
            });
        }
    };

    const togglePublicVideo = () => {
        // if (form.watch("isPublic")) form.setValue("isPublic", false);
        // else form.setValue("isPublic", true);
    };

    return (
        <AppWrapper>
            <SceenHeaderBack>Thông tin chi tiết</SceenHeaderBack>
            <View>
                <Text>Add video tags</Text>
                <Text>Add video product </Text>
                <Pressable
                    onPress={togglePublicVideo}
                    className="flex-row justify-start items-center gap-3"
                >
                    <CheckBox
                        onClick={togglePublicVideo}
                        isChecked={form.watch("isPublic")}
                    />
                    <Text>Cho phép public video</Text>
                </Pressable>
            </View>
            <Button
                onPress={form.handleSubmit(handleUpdateVideoMetadata)}
                className="my-5"
                disabled={isPending}
            >
                <Text className="text-white font-semibold">
                    {!isPending ? "Cập nhật" : "Đang cập nhật"}
                </Text>
            </Button>
        </AppWrapper>
    );
};

export default UpdateVideo;
