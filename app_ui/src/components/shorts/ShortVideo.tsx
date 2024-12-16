import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Avatar, { AvatarImage } from "../ui/Avatar";
import CommentList from "./Comment/CommentList";
import ShortVideoAction from "./ShortVideoAction";

type Props = {
    play?: boolean;
};

const { height, width } = Dimensions.get("window");

const videoSource =
    "https://rr5---sn-8qj-nbol6.googlevideo.com/videoplayback?expire=1732472985&ei=ORxDZ9i7GveJ6dsP4ILPiAE&ip=2a01%3A4f8%3A202%3A11ba%3A%3A2&id=o-AEY-wqPfKESvha0CpYbFLVtjegit3KeuLlg8NfngX7Gi&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&ctier=A&pfa=5&hightc=yes&siu=1&bui=AQn3pFS1aCtpEZKFbya3LlLkKp5BBMNvWYAOQQvq4yFVbGk8Hnq72lgITbbH_KEAFpxWjlk1xg&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=608904&ratebypass=yes&dur=8.256&lmt=1732400904032662&fexp=24350590,24350655,24350675,24350705,24350737,51326932,51335594&txp=5430434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cctier%2Cpfa%2Chightc%2Csiu%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgHX2YWmEFL_do3hTfC91ovHPpHOGQUzwoB7grq1EvxhECIAMNhYhRD5ITg_uH6rcQEphNue_vaS5yhAv2hILAvKf4&redirect_counter=1&rm=sn-4g5ek67s&rrc=104&req_id=82e38c55b66ea3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1732451399,&mh=i2&mip=2001:ee0:51dc:51c0:5945:ca56:9b35:89a9&mm=31&mn=sn-8qj-nbol6&ms=au&mt=1732451114&mv=m&mvi=5&pl=44&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIhAJK7dfBbRBf7K9w8ZzJXkbqTQz8cFqmwIDXtcE3Vu4xkAiB1-hglX1YUQ5F83CyE-kAioyRos4qaF-jeUJ5AdxeA9Q%3D%3D";

const ShortVideo = ({ play }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [showComment, setShowComment] = useState<boolean>(false);
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
    });

    useEffect(() => {
        if (play) player.play();
        else {
            player.pause();
            player.currentTime = 0;
        }
    }, [play]);

    useEffect(() => {
        handleCloseComment();
    }, []);

    const handleCloseComment = () => {
        bottomSheetRef?.current?.close();
        setShowComment(false);
    };
    const handleShowComment = () => {
        bottomSheetRef?.current?.expand();
        setShowComment(true);
    };

    return (
        <View className="relative w-screen h-screen bg-slate-900">
            <ShortVideoAction
                showComment={handleShowComment}
            ></ShortVideoAction>
            <VideoView
                style={{
                    width,
                    height,
                }}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
            />
            <View className="absolute bottom-10 px-5 py-2 bg-slate-900/30 rounded-md w-full">
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
            </View>
            <BottomSheet
                snapPoints={["50%", "95%"]}
                enableDynamicSizing
                ref={bottomSheetRef}
                enablePanDownToClose
                style={{ zIndex: 20 }}
                containerStyle={{ zIndex: 20 }}
            >
                {showComment && (
                    <BottomSheetView className="pb-5 ">
                        <CommentList></CommentList>
                    </BottomSheetView>
                )}
                {!showComment && <></>}
            </BottomSheet>
        </View>
    );
};

export default ShortVideo;
