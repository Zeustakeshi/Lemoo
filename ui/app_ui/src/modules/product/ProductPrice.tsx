import { formatMoneyVND } from "@/lib/utils";
import { RootState } from "@/store/store";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

type Props = {};

const ProductPrice = (props: Props) => {
    const { activeSku } = useSelector(
        (state: RootState) => state.productDetail
    );

    return (
        <View>
            <Text className="text-xl font-semibold text-primary">
                {formatMoneyVND(activeSku?.originPrice ?? 0)}
            </Text>
        </View>
    );
};

export default ProductPrice;
