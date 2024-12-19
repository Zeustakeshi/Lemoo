import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {};

const CommentItem = (props: Props) => {
    return (
        <View className="flex flex-row gap-x-2 justify-start items-start mb-4">
            <Avatar size={40}>
                <AvatarImage
                    source={{ uri: "https://i.pravatar.cc/150?img=31" }}
                ></AvatarImage>
            </Avatar>
            <View>
                <View className="flex flex-row justify-start items-center gap-x-3">
                    <Text className="text-sm font-medium">@minhhieu</Text>
                    <Text className="text-sm  text-muded">20 phút trước</Text>
                </View>
                <Text className="my-2 max-w-[90%]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Text>
                <View className="flex flex-row justify-start items-center gap-x-4">
                    <Button variant="ghost" size="icon">
                        <AntDesign name="like2" size={18} color="black" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <AntDesign name="dislike2" size={18} color="black" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <AntDesign name="message1" size={18} color="black" />
                    </Button>
                    <Button variant="link" size="icon">
                        <Text className="font-semibold text-primary">
                            2 phản hồi
                        </Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default CommentItem;
