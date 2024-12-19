import ShortVideo from "@/components/shorts/ShortVideo";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";

type Props = {};
const { height } = Dimensions.get("window");

const index = (props: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Track video đang hiển thị

    const viewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 80,
    });

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: any }) => {
            if (viewableItems.length > 0) {
                setCurrentIndex(viewableItems[0].index); // Lấy index của video đang hiển thị
            }
        }
    );

    return (
        <FlatList
            data={new Array(1).fill(0)}
            renderItem={({ item, index }) => (
                <ShortVideo play={currentIndex === index} />
            )}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={height}
            pagingEnabled={true}
            snapToAlignment="start"
            onViewableItemsChanged={onViewableItemsChanged.current}
        ></FlatList>
    );
};

export default index;
