import { getChannelVideos } from "@/api/channel.api";
import { RootState } from "@/store/store";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import ChannelProfile from "./ChannelProfile";
import ChannelVideoItem from "./ChannelVideoItem";

type Props = {
    isSelf: boolean;
};

const ChannelVideoList = ({ isSelf }: Props) => {
    const { channel } = useSelector((state: RootState) => state.channel);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        refetch,
        isRefetching,
        isRefetchError,
    } = useInfiniteQuery({
        queryKey: ["channel-videos", channel?.id],
        queryFn: async ({ pageParam }) =>
            await getChannelVideos(channel?.id as string, pageParam),
        getNextPageParam: (lastPage: any) => {
            if (lastPage.last) return undefined;
            return lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
    });

    useEffect(() => {
        if (isRefetchError)
            Toast.show({
                type: "error",
                text1: "Tải lại trang thất bại",
            });
    }, [isRefetchError]);

    return (
        <FlashList
            className="flex-1 w-full h-full"
            data={data?.pages.flatMap(({ content }: any) => content ?? [])}
            renderItem={({ item }) => <ChannelVideoItem video={item} />}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            estimatedItemSize={150}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <View className="w-full h-[40]"></View>}
            ListHeaderComponent={() => (
                <ChannelProfile isSelf={isSelf}></ChannelProfile>
            )}
            ListEmptyComponent={() => (
                <View className="flex justify-center items-center min-h-[400]">
                    <LottieView
                        style={{
                            width: 100,
                            height: 100,
                        }}
                        source={
                            isLoading
                                ? require("../../../assets/images/animations/loader2.json")
                                : require("../../../assets/images/animations/empty-list.json")
                        }
                        autoPlay
                        loop
                    />
                    <Text className="my-4 text-slate-700">
                        {isLoading
                            ? "Đang tải danh sách video"
                            : "Kênh chưa có video nào"}
                    </Text>
                </View>
            )}
            onEndReached={() => {
                if (hasNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={5}
            onRefresh={() => {
                refetch();
            }}
            refreshing={isRefetching}
        />
    );
};

export default ChannelVideoList;
