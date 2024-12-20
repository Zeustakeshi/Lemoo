import React from "react";
import { FlatList, Image, View } from "react-native";

type Props = {};

const ChannelVideoList = (props: Props) => {
    return (
        <View className="mx-auto pb-[50] ">
            <FlatList
                className="gap-4"
                data={new Array(40).fill(0)}
                renderItem={() => (
                    <View className="w-[110px] aspect-[9/16]  rounded-md overflow-hidden m-1">
                        <Image
                            className="w-full h-full object-cover"
                            source={{
                                uri: "https://i.pravatar.cc/150?img=31",
                            }}
                        ></Image>
                    </View>
                )}
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={3}
            ></FlatList>
        </View>
    );
};

export default ChannelVideoList;
