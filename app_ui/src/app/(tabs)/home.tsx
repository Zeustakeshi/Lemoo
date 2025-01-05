import Cart from "@/components/header/Cart";
import ProductSearch from "@/components/search/ProductSearch";
import Banner from "@/components/slider/Banner";
import { cn } from "@/lib/cn";
import CategoriesSlide from "@/modules/categories/CategoriesSlide";
import ProductFeature from "@/modules/feature/ProductFeature";
import React, { useRef, useState } from "react";
import {
    Animated,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    View,
} from "react-native";

type Props = {};

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const home = (props: Props) => {
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const scrollY = useRef(new Animated.Value(0)).current;

    const backgroundColor = scrollY.interpolate({
        inputRange: [10, 20],
        outputRange: ["transparent", "white"],
        extrapolate: "clamp",
    });

    const borderColor = scrollY.interpolate({
        inputRange: [10, 20],
        outputRange: ["transparent", "#e2e8f0"],
        extrapolate: "clamp",
    });

    const onRefresh = async () => {
        setRefreshing(true); // Bắt đầu trạng thái làm mới
        console.log("Refreshing...");

        // Mô phỏng xử lý API hoặc dữ liệu
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Refresh complete");
        setRefreshing(false); // Kết thúc trạng thái làm mới
    };

    return (
        <View>
            <AnimatedSafeAreaView
                className={cn(
                    "flex-row absolute left-0 z-10 gap-3 bg-transparent px-4 pt-14 pb-2 border"
                )}
                style={{ backgroundColor, borderColor }}
            >
                <ProductSearch></ProductSearch>
                <Cart></Cart>
            </AnimatedSafeAreaView>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        style={{ zIndex: 100 }}
                        colors={["#ff6347", "#36cfc9", "#ffa500"]} // Android: Đổi màu spinner
                        tintColor="#ff6347" // iOS: Đổi màu spinner
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false } // useNativeDriver=false vì background không hỗ trợ native driver
                )}
                scrollEventThrottle={20} // call onScroll after 20ms
                showsVerticalScrollIndicator={false}
            >
                <Banner></Banner>
                <View className="flex-1 bg-white gap-y-5">
                    <CategoriesSlide className="px-4"></CategoriesSlide>
                    <ProductFeature></ProductFeature>
                </View>
            </ScrollView>
        </View>
    );
};

{
    /* <View className="flex-1  bg-white ">
    <View className="flex-1  ">
        <CategoriesSlide className="mt-8  px-4 "></CategoriesSlide>
        <ProductFeature className="mt-4"></ProductFeature>
    </View>
</View>; */
}

export default home;
