import { useVideoPlayer } from "expo-video";
import React, { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetProvider } from "../ui/BottomSheet";

type Props = {
    play?: boolean;
};

const { height, width } = Dimensions.get("window");

const videoSource =
    "https://res.cloudinary.com/dymmvrufy/video/upload/v1734442705/Lemoo/videos/shorts/videoplayback_wckzj5.mp4";

const ShortVideo = ({ play }: Props) => {
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
    });

    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (play) player.play();
        else {
            player.pause();
            player.currentTime = 0;
        }
    }, [play]);

    return (
        <View
            style={{
                width,
                height: height + insets.top,
            }}
            className=" flex-1 bg-white"
        >
            {/* <ShortVideoAction></ShortVideoAction> */}
            {/* <VideoView
                style={{
                    width,
                    height,
                }}
                player={player}
            /> */}
            {/* <View className="absolute bottom-0 px-5 py-2 bg-slate-900/30 rounded-md w-full">
                <View className="flex flex-row gap-x-2">
                    <Avatar>
                        <AvatarImage
                            source={{ uri: "https://i.pravatar.cc/150?img=31" }}
                        ></AvatarImage>
                    </Avatar>
                    <View>
                        <Text className="text-white font-semibold text-lg ">
                            @PhamMinhHieu
                        </Text>
                        <View>
                            <Text
                                numberOfLines={3}
                                className="text-white text-sm font-semibold max-w-[90%]"
                            >
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Enim, officiis voluptate
                                numquam fuga pariatur ab sit cumque sunt nisi
                                necessitatibus?
                            </Text>
                        </View>
                    </View>
                </View>
            </View> */}

            <BottomSheetProvider>
                <View>
                    <Text>Hello, this is the BottomSheet!</Text>
                </View>
                {/* <CommentList></CommentList> */}
            </BottomSheetProvider>
        </View>
    );
};

export default ShortVideo;
