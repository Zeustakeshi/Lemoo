import React from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShortVideoAction from "./ShortVideoAction";
import ShortVideoInfo from "./ShortVideoInfo";
import ShortVideoView from "./ShortVideoView";

type Props = { inView: boolean };

const { height, width } = Dimensions.get("window");

const videoSource =
    "https://res.cloudinary.com/dymmvrufy/video/upload/v1734442705/Lemoo/videos/shorts/videoplayback_wckzj5.mp4";

const ShortVideo = ({ inView }: Props) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                width,
                height: height + insets.top,
            }}
            className="relative top-0 flex-1 bg-black"
        >
            <ShortVideoView inView={inView} src={videoSource}></ShortVideoView>
            <ShortVideoAction></ShortVideoAction>
            <ShortVideoInfo></ShortVideoInfo>
        </View>
    );
};

export default ShortVideo;
