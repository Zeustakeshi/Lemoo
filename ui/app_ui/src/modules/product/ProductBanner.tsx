import { RootState } from "@/store/store";
import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    View,
} from "react-native";
import { useSelector } from "react-redux";

type Props = {};
const { width: windowWidth } = Dimensions.get("window");
const ProductBanner = (props: Props) => {
    const { product } = useSelector((state: RootState) => state.productDetail);

    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<FlatList<string>>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 10000);

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, [currentIndex]);

    const updateIndex = ({
        nativeEvent,
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = nativeEvent.contentOffset.x;
        setCurrentIndex(Math.round(contentOffsetX / windowWidth));
    };

    const handleNextSlide = () => {
        const nextSlideIndex =
            (currentIndex + 1) % (product?.images?.length ?? 1); // Loop back to the first slide
        const offset = nextSlideIndex * windowWidth;
        sliderRef?.current?.scrollToOffset({ offset });
        setCurrentIndex(nextSlideIndex);
    };

    const handleDotPress = (index: number) => {
        const offset = index * windowWidth;
        sliderRef?.current?.scrollToOffset({ offset });
        setCurrentIndex(index);
    };

    return (
        <View>
            <FlatList
                ref={sliderRef}
                onMomentumScrollEnd={updateIndex}
                className="  max-w-full  "
                data={product?.images}
                renderItem={({ item }) => (
                    <View
                        style={{ width: windowWidth }}
                        className="relative h-[340] max-h-full overflow-hidden"
                    >
                        <View className="absolute top-0 left-0 size-full bg-slate-900/20 z-10"></View>
                        <Image
                            className="w-full h-full object-contain"
                            source={{ uri: item }}
                            resizeMode="cover"
                        ></Image>
                    </View>
                )}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
            />
        </View>
    );
};

export default ProductBanner;
