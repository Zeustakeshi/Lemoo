import { VideoShortResponse } from "@/common/type/shorts.type";
import React from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShortVideoAction from "./actions/ShortVideoAction";
import ShortVideoInfo from "./ShortVideoInfo";
import ShortVideoView from "./ShortVideoView";

type Props = { inView: boolean; video: VideoShortResponse };

const { height, width } = Dimensions.get("window");

const videoSource =
    "https://res.cloudinary.com/dymmvrufy/video/upload/v1734442705/Lemoo/videos/shorts/videoplayback_wckzj5.mp4";

const ShortVideo = ({ inView, video }: Props) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                width,
                height: height + insets.top,
            }}
            className="relative top-0 flex-1 bg-black"
        >
            <ShortVideoView inView={inView} src={video.url}></ShortVideoView>
            <ShortVideoAction video={video} inView={inView}></ShortVideoAction>
            <ShortVideoInfo video={video}></ShortVideoInfo>
        </View>
    );
};

export default ShortVideo;
