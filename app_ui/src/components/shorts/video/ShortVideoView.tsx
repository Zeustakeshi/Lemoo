import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = { src: string; inView: boolean };

const { height, width } = Dimensions.get("window");

const ShortVideoView = ({ src, inView }: Props) => {
    const player = useVideoPlayer(src, (player) => {
        player.loop = true;
    });

    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (inView) player.play();
        else {
            player.currentTime = 0;
            player.pause();
        }
    }, [inView]);

    const handleTogglePlaying = () => {
        player.playing ? player.pause() : player.play();
    };

    return (
        <View
            className="relative"
            style={{ top: 0, width, height: height + insets.top }}
        >
            <Pressable
                onPress={handleTogglePlaying}
                className="w-full h-full absolute  z-10"
            ></Pressable>
            <VideoView
                style={{ top: 0, width, height: height + insets.top }}
                contentFit="contain"
                player={player}
                allowsFullscreen={false}
                nativeControls={false}
                allowsPictureInPicture={false}
                showsTimecodes={false}
                allowsVideoFrameAnalysis={false}
            />
        </View>
    );
};

export default ShortVideoView;
