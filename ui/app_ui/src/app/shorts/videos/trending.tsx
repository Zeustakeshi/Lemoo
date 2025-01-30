import { getAllRecommentVideo } from "@/api/shorts.api";
import ShortVideo from "@/modules/shorts/video/ShortVideo";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};
const { height } = Dimensions.get("window");

const index = (props: Props) => {
    const insets = useSafeAreaInsets();

    const [currentVisibleIndex, setCurrentVisibleIndex] = useState();

    const viewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 80,
    });

    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: any) => {
            if (viewableItems.length > 0) {
                const index = viewableItems[0]?.index;
                if (index !== currentVisibleIndex) {
                    setCurrentVisibleIndex(index);
                }
            }
        },
        [currentVisibleIndex]
    );

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        refetch,
        isRefetching,
    } = useInfiniteQuery({
        queryKey: ["shorts-recommend"],
        queryFn: async ({ pageParam }) => await getAllRecommentVideo(pageParam),
        getNextPageParam: (lastPage: any) => {
            if (lastPage.last) return undefined;
            return lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
    });

    return (
        <FlashList
            className="flex-1"
            data={data?.pages.flatMap(({ content }: any) => content ?? [])}
            renderItem={({ index, item }) => (
                <ShortVideo
                    video={item}
                    inView={index === currentVisibleIndex}
                />
            )}
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={height + insets.top}
            pagingEnabled={true}
            snapToAlignment="start"
            viewabilityConfig={viewabilityConfig.current}
            estimatedItemSize={height}
            initialScrollIndex={0}
            nestedScrollEnabled
            onViewableItemsChanged={onViewableItemsChanged}
            onEndReached={() => {
                if (hasNextPage) fetchNextPage();
            }}
            refreshing={isRefetching}
            onRefresh={refetch}
            onEndReachedThreshold={5}
        ></FlashList>
    );
};

export default index;
