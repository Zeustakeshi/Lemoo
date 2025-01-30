import { getCategories } from "@/api/category.api";
import SceenHeaderBack from "@/components/ui/SceenHeaderBack";
import AppWrapper from "@/components/wrapper/AppWrapper";
import CategorySidebar from "@/modules/categories/CategorySidebar";
import { setCategories } from "@/store/category/categorySlice";
import { useQuery } from "@tanstack/react-query";
import { Slot } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";

type Props = {};

const CategoryLayout = (props: Props) => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ["get-categories"],
        queryFn: async () => await getCategories(0, 20),
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (!categories?.content) return;
        dispatch(setCategories(categories.content));
    }, [categories]);

    return (
        <AppWrapper className="!px-0">
            <SceenHeaderBack>Danh mục sản phẩm</SceenHeaderBack>
            {isLoading && (
                <View className="flex-1 justify-center items-center">
                    <LottieView
                        style={{
                            width: 100,
                            height: 100,
                        }}
                        source={require("../../assets/images/animations/loader2.json")}
                        autoPlay
                        loop
                    />
                </View>
            )}

            {!isLoading && categories && categories.content && (
                <View className="flex-1 flex-row">
                    <CategorySidebar></CategorySidebar>
                    <Slot></Slot>
                </View>
            )}
        </AppWrapper>
    );
};

export default CategoryLayout;
