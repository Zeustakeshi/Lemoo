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
            </View>

            {/* <Text className="text-3xl font-semibold my-3">
                Xin chào, {user?.displayName}
            </Text> */}

            {/*  */}
            {/* <View className="max-w-full bg-slate-100 h-max rounded-xl p-3">
                <Text className="text-xl font-semibold my-2">Announcement</Text>
                <View className="flex-row gap-x-3">
                    <Text>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Veniam, magni?
                    </Text>
                    <Button size="icon" className="rounded-full size-[40]">
                        <AntDesign name="arrowright" size={15} color="white" />
                    </Button>
                </View>
            </View> */}
            {/*  */}

            {/*  */}
            {/* <ShortList></ShortList> */}
        </View>
    );
};

export default home;
