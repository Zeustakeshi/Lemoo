import React, { useCallback, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
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

    return <View></View>;

    // return (
    //     <FlashList
    //         className="flex-1"
    //         data={new Array(10).fill(0)}
    //         renderItem={({ index }) => (
    //             <ShortVideo inView={index === currentVisibleIndex} />
    //         )}
    //         showsVerticalScrollIndicator={false}
    //         decelerationRate="fast"
    //         snapToInterval={height + insets.top}
    //         pagingEnabled={true}
    //         snapToAlignment="start"
    //         viewabilityConfig={viewabilityConfig.current}
    //         estimatedItemSize={height}
    //         initialScrollIndex={0}
    //         nestedScrollEnabled
    //         onViewableItemsChanged={onViewableItemsChanged}
    //     ></FlashList>
    // );
};

export default index;
