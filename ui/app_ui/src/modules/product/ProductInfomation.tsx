import { RootState } from "@/store/store";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import ProductPrice from "./ProductPrice";
import ProductReaction from "./ProductReaction";

type Props = {};

const ProductInfomation = (props: Props) => {
    const { product } = useSelector((state: RootState) => state.productDetail);

    return (
        <View className="my-3 px-4 gap-3">
            <ProductPrice></ProductPrice>
            <Text numberOfLines={5} className="font-semibold">
                {product?.name}
            </Text>
            <View className="flex-row justify-between items-center gap-3">
                <View className="flex-1 flex-row justify-start items-center gap-3 ">
                    <View className="flex justify-start flex-row items-center gap-1">
                        <AntDesign name="star" size={14} color="#eab308" />
                        <Text className="text-xs">
                            {product?.ratting} ({product?.rattingCount})
                        </Text>
                    </View>
                    <Text className="text-muded">|</Text>
                    <Text className="text-xs">{product?.totalSold} đã bán</Text>
                </View>
                <ProductReaction></ProductReaction>
            </View>
        </View>
    );
};

export default ProductInfomation;
