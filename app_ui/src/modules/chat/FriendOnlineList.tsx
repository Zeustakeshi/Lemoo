import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import React from "react";
import { FlatList } from "react-native";

type Props = {};

const FriendOnlineList = (props: Props) => {
    return (
        <FlatList
            className="my-2 p-2"
            data={new Array(20).fill(0)}
            renderItem={() => (
                <Avatar className="m-1" size={60}>
                    <AvatarImage
                        source={{ uri: "https://i.pravatar.cc/150?img=31" }}
                    ></AvatarImage>
                </Avatar>
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default FriendOnlineList;
