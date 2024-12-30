import { getCategories } from "@/api/category.api";
import { CategoryResponse } from "@/common/type/categories";
import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import { RootState } from "@/store/store";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

type Props = {};

const { width } = Dimensions.get("screen");

const Categories = (props: Props) => {
    const { categoryId } = useLocalSearchParams();

    const { activeCategory } = useSelector(
        (state: RootState) => state.category
    );

    const { data: categories, isLoading } = useQuery({
        queryKey: ["get-categories", `parent-${categoryId}`],
        queryFn: async () => await getCategories(0, 20, categoryId as string),
    });

    return (
        <FlatList
            className="flex-1 "
            data={categories?.content || []}
            contentContainerClassName="justify-center"
            renderItem={({ item }) => <CategoryItem category={item} />}
            numColumns={3}
            keyExtractor={(item) => item.id}
            ListFooterComponent={() => (
                <View className="flex-1 justify-center items-center">
                    {isLoading && (
                        <LottieView
                            style={{
                                width: 100,
                                height: 100,
                            }}
                            source={require("../../assets/images/animations/loader2.json")}
                            autoPlay
                            loop
                        />
                    )}
                </View>
            )}
            ListHeaderComponent={() => (
                <Pressable className="px-2 py-3 flex-row items-center  ">
                    <Text className="flex-1 text-lg font-semibold">
                        {activeCategory?.name}
                    </Text>
                    <AntDesign name="right" size={18} color="#94a3b8" />
                </Pressable>
            )}
        />
    );
};

type CategoryItemProps = {
    category: CategoryResponse;
};

const CategoryItem = ({ category }: CategoryItemProps) => {
    return (
        <View className="m-1 min-h-[100] flex-1 justify-center items-center">
            <Avatar variant="square" size={80}>
                <AvatarImage source={{ uri: category.image }}></AvatarImage>
            </Avatar>
            <Text className="text-xs text-center mt-1">{category.name}</Text>
        </View>
    );
};

export default Categories;
