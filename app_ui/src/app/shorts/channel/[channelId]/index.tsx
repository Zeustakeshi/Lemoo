import { getChannelDetail, getChannelInfo } from "@/api/channel.api";
import Loading from "@/components/loading/Loading";
import ChannelHeader from "@/components/shorts/channel/ChannelHeader";
import ChannelVideoList from "@/components/shorts/channel/ChannelVideoList";
import { useAuth } from "@/context/AuthContext";
import { setChannel } from "@/store/shorts/ChannelSlice";
import { useQuery } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

type Props = {};

const ProfilePage = (props: Props) => {
    const { channelId } = useLocalSearchParams();
    const { user } = useAuth();

    const dispatch = useDispatch();

    const isSelf = channelId === user?.id;
    const { data, isLoading, error } = useQuery({
        queryKey: [`channel-detail-${channelId}-${isSelf}`],
        queryFn: async () => {
            if (isSelf) return await getChannelInfo();
            return await getChannelDetail(channelId as string);
        },
        retry: false,
    });

    useEffect(() => {
        if (!data) return;
        dispatch(setChannel(data));
    }, [data, isSelf]);

    if ((error as any)?.status === 404) {
        if (isSelf) return <Redirect href="/shorts/channel/new"></Redirect>;
        return <Redirect href="/shorts/channel/notfound"></Redirect>;
    }

    if (isLoading || !data) return <Loading></Loading>;

    return (
        <SafeAreaView className=" flex-1">
            <ChannelHeader isSelf={isSelf} />
            <ChannelVideoList isSelf={isSelf} />
        </SafeAreaView>
    );
};

export default ProfilePage;
