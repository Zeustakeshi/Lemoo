import { getChannelDetail, getChannelInfo } from "@/api/channel.api";
import Loading from "@/components/loading/Loading";
import ChannelProfileHeader from "@/components/shorts/channel/ChannelProfileHeader";
import ChannelVideoList from "@/components/shorts/channel/ChannelVideoList";
import { useAuth } from "@/context/AuthContext";
import { setChannel } from "@/store/shorts/ChannelSlice";
import { useQuery } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";

type Props = {};

const ProfilePage = (props: Props) => {
    const { channelId } = useLocalSearchParams();
    const { user } = useAuth();

    const dispatch = useDispatch();

    const isSelf = channelId === user?.id;

    const { data, isLoading, error } = useQuery({
        queryKey: [`channel-detail-${channelId}`],
        queryFn: async () => {
            if (isSelf) return await getChannelInfo();
            else return await getChannelDetail(channelId as string);
        },
        staleTime: 1000 * 60 * 60,
        retry: false,
    });

    useEffect(() => {
        if (!data || !isSelf) return;
        dispatch(setChannel(data));
    }, [data, isSelf]);

    if ((error as any)?.status === 404) {
        if (isSelf) return <Redirect href="/shorts/channel/new"></Redirect>;
        return <Redirect href="/shorts/channel/notfound"></Redirect>;
    }

    if (isLoading) return <Loading></Loading>;

    return (
        <View>
            {data && (
                <ChannelProfileHeader isSelf={isSelf}></ChannelProfileHeader>
            )}

            <ChannelVideoList></ChannelVideoList>
        </View>
    );
};

export default ProfilePage;
