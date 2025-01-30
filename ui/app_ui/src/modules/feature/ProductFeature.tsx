import { getProductFeature } from "@/api/product.api";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/cn";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";

type Props = {
    className?: string;
};

const ProductFeature = ({ className }: Props) => {
    const { data } = useQuery({
        queryKey: ["products-feature"],
        queryFn: () => getProductFeature(0, 6),
    });

    return (
        <View className={cn(className)}>
            <Text className="text-xl font-semibold mb-4 px-4 ">
                Sản phẩm nổi bật
            </Text>
            <View className="px-4 flex-row flex-wrap gap-2 justify-center">
                {data?.content?.map((item) => (
                    <ProductCard
                        className="w-[48%]"
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        thumbnail={item.thumbnail}
                        originPrice={item.originPrice}
                        promotionPrice={item.promotionPrice}
                        ratting={item.ratting}
                        rattingCount={item.rattingCount}
                        totalSold={item.totalSold}
                    />
                ))}
            </View>
        </View>
    );
};

export default ProductFeature;
