import { getCategories } from "@/api/category.api";
import { CategoryResponse } from "@/common/type/categories";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

type Props = {};

const CategoriesSlide = (props: Props) => {
    const { data: categories } = useQuery({
        queryKey: ["get-categories"],
        queryFn: async () => await getCategories(0, 10),
    });

    return (
        <View className="">
            <View className="flex-row justify-between items-center gap-3 my-3">
                <Text className="text-xl font-semibold">Dạnh mục</Text>
                <Link href="/categories/">
                    <Text className="text-primary">Xem tất cả </Text>{" "}
                </Link>
            </View>
            <FlatList
                data={categories?.content ?? []}
                keyExtractor={(category) => category.id}
                renderItem={({ item }) => <CategoryItem category={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

type CateGoryItemProps = {
    category: CategoryResponse;
};

const CategoryItem = ({ category }: CateGoryItemProps) => {
    return (
        <View className="mx-3 my-3">
            <View className="size-[50]  rounded-full overflow-hidden">
                <Image
                    resizeMode="cover"
                    className="w-full h-full"
                    source={{
                        uri: "https://api.multiavatar.com/Binx Bond.png",
                    }}
                ></Image>
            </View>
            <Text className="mt-2 text-xs text-center font-medium line-clamp-3 max-w-[60]">
                {category.name}
            </Text>
        </View>
    );
};

export default CategoriesSlide;
