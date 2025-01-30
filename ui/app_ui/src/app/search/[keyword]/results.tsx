import ProductCard from "@/components/product/ProductCard";
import AppWrapper from "@/components/wrapper/AppWrapper";
import { GlobalSearchProvider } from "@/context/GlobalSearchContext";
import { searchResults } from "@/data/product";
import SearchFilter from "@/modules/search/SearchFilter";
import SearchHeader from "@/modules/search/SearchHeader";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

type Props = {};

const FILTER_MAX_HEIGHT = 500;
const FILTER_MIN_HEIGHT = 0;

const SearchResults = (props: Props) => {
    const { keyword }: { keyword: string } = useLocalSearchParams();
    const scrollY = useSharedValue(0);

    const headerStyle = useAnimatedStyle(() => {
        const height = Math.max(
            FILTER_MIN_HEIGHT,
            FILTER_MAX_HEIGHT - scrollY.value
        );
        return { height };
    });

    return (
        <GlobalSearchProvider>
            <AppWrapper>
                <SearchHeader
                    onPress={() =>
                        router.replace({
                            pathname: "/search/[keyword]",
                            params: { keyword },
                        })
                    }
                />
                <View className="my-3 relative">
                    <SearchFilter style={headerStyle}></SearchFilter>
                </View>
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => (
                        <ProductCard
                            className="w-[48%] m-1 -z-10"
                            id={item.id}
                            name={item.name}
                            thumbnail={item.thumbnail}
                            originPrice={item.originPrice}
                            promotionPrice={item.promotionPrice}
                            ratting={item.ratting}
                            rattingCount={item.rattingCount}
                            totalSold={item.totalSold}
                        ></ProductCard>
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    onScroll={(event: any) => {
                        scrollY.value = event.nativeEvent.contentOffset.y;
                    }}
                    scrollEventThrottle={16}
                />
            </AppWrapper>
        </GlobalSearchProvider>
    );
};

export default SearchResults;
