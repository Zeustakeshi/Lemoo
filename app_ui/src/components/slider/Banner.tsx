import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    View,
} from "react-native";

const images = [
    "https://cf.shopee.vn/file/vn-11134258-7ras8-m3q2lacm0w5150_xxhdpi",
    "https://cf.shopee.vn/file/vn-11134258-7ras8-m3oqmw3pgnq9f6_xxhdpi",
    "https://cf.shopee.vn/file/vn-11134258-7ras8-m3oo7bya6bdt88_xxhdpi",
    "https://cf.shopee.vn/file/vn-11134258-7ras8-m3oqq69ijqnw1f_xxhdpi",
];

type Props = {};
const { width: windowWidth } = Dimensions.get("window");
const Banner = (props: Props) => {
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
        const nextSlideIndex = (currentIndex + 1) % images.length; // Loop back to the first slide
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
        <View className="relative h-200">
            <FlatList
                ref={sliderRef}
                onMomentumScrollEnd={updateIndex}
                className="  max-w-full  "
                data={images}
                renderItem={({ item }) => (
                    <View
                        style={{ width: windowWidth }}
                        className="relative h-[170] max-h-full overflow-hidden"
                    >
                        <View className="absolute top-0 left-0 size-full bg-slate-900/5 z-10"></View>
                        <Image
                            className="w-full h-full object-contain"
                            source={{ uri: item }}
                            resizeMode="repeat"
                        ></Image>
                    </View>
                )}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
            />
            {/* <View className="flex-row justify-center items-center mt-2">
                {images.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        className={cn("rounded-full size-2 mx-1 bg-slate-200", {
                            "bg-primary": index === currentIndex,
                        })}
                        onPress={() => handleDotPress(index)}
                    />
                ))}
            </View> */}
        </View>
    );
};

export default Banner;
