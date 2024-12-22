import { cn } from "@/lib/cn";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoView } from "expo-video";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Button from "../ui/Button";

type Props = {
    onChange?: (video: ImagePicker.ImagePickerAsset) => void;
    className?: string;
    isUploading?: boolean;
};

const VideoPicker = ({ onChange, className, isUploading }: Props) => {
    const [video, setVideo] = useState<string | null>(null);

    const pickVideo = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["videos"],
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
            selectionLimit: 1,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
        });

        if (!result.canceled) {
            setVideo(result.assets[0].uri);
            onChange?.(result.assets[0]);
        } else {
            Toast.show({
                type: "error",
                text1: "Người dùng hủy chọn video",
                position: "bottom",
            });
        }
    };

    return (
        <View
            className={cn(
                "relative w-[100] aspect-[9/16] border border-primary border-dashed rounded-md",
                className
            )}
        >
            <View className="absolute top-0 left-0 size-full bg-slate-900/10 z-10"></View>
            <View className="absolute z-10 size-full top-0 left-0 justify-center items-center ">
                {isUploading && (
                    <View className="justify-center items-center gap-2">
                        <LottieView
                            loop
                            autoPlay
                            style={{
                                width: 100,
                                height: 100,
                            }}
                            source={require("../../assets/images/animations/loader2.json")}
                        />
                        <Text className="text-muded font-semibold">
                            Đang tải lên
                        </Text>
                    </View>
                )}
                {!isUploading && (
                    <Button
                        onPress={pickVideo}
                        variant="link"
                        size="icon"
                        className="border-primary border bg-white p-2 size-[10%] aspect-square"
                    >
                        <Feather name="video" size={20} color="#004CFF" />
                    </Button>
                )}
            </View>
            {video && <Video src={video}></Video>}
        </View>
    );
};

const Video = ({ src }: { src: string }) => {
    const player = useVideoPlayer(src, (player) => {
        player.loop = true;
    });

    return (
        <VideoView
            style={{
                width: "100%",
                aspectRatio: 9 / 16,
            }}
            contentFit="contain"
            player={player}
            allowsFullscreen={false}
            nativeControls={false}
            allowsPictureInPicture={false}
            showsTimecodes={false}
            allowsVideoFrameAnalysis={false}
        />
    );
};

export default VideoPicker;
