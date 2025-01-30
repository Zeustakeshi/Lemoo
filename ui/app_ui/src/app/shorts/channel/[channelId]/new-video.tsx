import { uploadVideo } from "@/api/channel.api";
import VideoPicker from "@/components/media/VideoPicker";
import SceenHeaderBack from "@/components/ui/SceenHeaderBack";
import AppWrapper from "@/components/wrapper/AppWrapper";
import { useMutation } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import FormData from "form-data";

import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

type Props = {};

const UploadVideo = (props: Props) => {
    const { channelId } = useLocalSearchParams();
    const { mutateAsync: uploadVideoMute, isPending } = useMutation({
        mutationKey: ["upload-video"],
        mutationFn: async (data: FormData) =>
            await uploadVideo(channelId as string, data),
        retry: false,
    });

    const handleUploadVideo = async (video: ImagePickerAsset) => {
        try {
            console.log({ video });
            const formData = new FormData();
            formData.append("video", {
                uri: video.uri,
                name: video.fileName || "video.mp4",
                type: "video/mp4",
            });
            const data = await uploadVideoMute(formData);
            router.replace({
                pathname: "/shorts/channel/[channelId]/[videoId]",
                params: {
                    channelId,
                    videoId: (data as any).id,
                },
            });
            Toast.show({
                type: "success",
                text1: "Tải video thành công",
            });
        } catch (error: any) {
            console.log({ error });
            Toast.show({
                type: "error",
                text1: error.message
                    ? error.message
                    : "Tải video lên thất bại. Vui lòng thử lại sau",
            });
        }
    };

    return (
        <AppWrapper>
            <SceenHeaderBack showBackButon={false} className="px-3">
                Tạo video ngắn
            </SceenHeaderBack>
            <View className=" flex-1 p-5  justify-center items-center">
                <VideoPicker
                    isUploading={isPending}
                    className="w-full"
                    onChange={handleUploadVideo}
                ></VideoPicker>
            </View>
        </AppWrapper>
    );
};

export default UploadVideo;
