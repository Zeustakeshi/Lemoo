import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import { cn } from "@/lib/cn";
import { setActiveCategory } from "@/store/category/categorySlice";
import { RootState } from "@/store/store";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const CategorySidebar = ({}: Props) => {
    const { categories, activeCategory } = useSelector(
        (state: RootState) => state.category
    );

    const dispatch = useDispatch();

    return (
        <FlatList
            data={categories}
            renderItem={({ item }) => (
                <Pressable
                    onPress={() => {
                        router.replace({
                            pathname: "/categories/[categoryId]",
                            params: {
                                categoryId: item.id,
                            },
                        });
                        dispatch(setActiveCategory(item));
                    }}
                    className={cn(
                        "aspect-square border-b border-b-slate-100 justify-center items-center py-2 px-1",
                        { "bg-slate-200": item.id === activeCategory?.id }
                    )}
                >
                    <Avatar size={40} variant="square">
                        <AvatarImage source={{ uri: item.image }}></AvatarImage>
                    </Avatar>
                    <Text
                        className={cn(
                            "w-full line-clamp-5 text-xs text-slate-600 mt-1  text-center",
                            {
                                "font-semibold": item.id === activeCategory?.id,
                            }
                        )}
                    >
                        {item.name}
                    </Text>
                </Pressable>
            )}
            keyExtractor={(item) => item.id}
            className=" max-w-[80] border-r border-r-slate-200 "
            showsVerticalScrollIndicator={false}
        />
    );
};

export default CategorySidebar;
