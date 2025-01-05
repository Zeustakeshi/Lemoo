import { getProductDetail } from "@/api/product.api";
import AppWrapper from "@/components/wrapper/AppWrapper";
import ProductBanner from "@/modules/product/ProductBanner";
import ProductFooter from "@/modules/product/ProductFooter";
import ProductHeader from "@/modules/product/ProductHeader";
import ProductInfomation from "@/modules/product/ProductInfomation";
import { setProduct } from "@/store/product/productDetailSlice";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";

type Props = {};

const ProductDetail = (props: Props) => {
    const { productId } = useLocalSearchParams();

    const { data, isLoading } = useQuery({
        queryKey: ["product-detail", productId],
        queryFn: async () => await getProductDetail(productId as string),
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) dispatch(setProduct(data));
    }, [data]);

    return (
        <AppWrapper className="!px-0 pb-0">
            <ProductHeader></ProductHeader>
            {isLoading && (
                <View className="flex-1 justify-center items-center">
                    <LottieView
                        style={{
                            width: 100,
                            height: 100,
                        }}
                        source={require("@/assets/images/animations/loader2.json")}
                        autoPlay
                        loop
                    />
                </View>
            )}
            {data && (
                <ScrollView className="flex-1  " contentContainerStyle={{}}>
                    <ProductBanner></ProductBanner>
                    <ProductInfomation></ProductInfomation>
                    <View className="h-[2000] bg-orange-400 w-full ">
                        <Text>asdfs</Text>
                    </View>
                </ScrollView>
            )}
            <ProductFooter></ProductFooter>
        </AppWrapper>
    );
};

export default ProductDetail;
