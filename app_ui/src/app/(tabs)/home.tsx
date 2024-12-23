import CategoriesSlide from "@/components/categories/CategoriesSlide";
import Cart from "@/components/header/Cart";
import ProductSearch from "@/components/search/ProductSearch";
import Banner from "@/components/slider/Banner";
import React from "react";
import { View } from "react-native";

type Props = {};

const home = (props: Props) => {
    return (
        <View className="flex-1 bg-white">
            <Banner></Banner>
            <View className="px-4 flex-1 bg-white">
                <View className="flex-row justify-start items-center gap-x-2 bg-transparent -my-6">
                    <ProductSearch></ProductSearch>
                    <Cart></Cart>
                </View>
                <View className="mt-10 flex-1">
                    <CategoriesSlide></CategoriesSlide>
                </View>
            </View>
        </View>
    );
};

export default home;
