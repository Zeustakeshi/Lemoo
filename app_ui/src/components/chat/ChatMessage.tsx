import React from "react";
import { Text, View } from "react-native";
import Avatar, { AvatarImage } from "../ui/Avatar";
import Button from "../ui/Button";

type Props = {};

const ChatMessage = (props: Props) => {
    return (
        <Button
            variant="link"
            className="my-2 max-w-[100%] flex flex-row gap-x-2 justify-start items-start"
        >
            <Avatar size={40}>
                <AvatarImage
                    source={{ uri: "https://i.pravatar.cc/150?img=31" }}
                ></AvatarImage>
            </Avatar>
            <View className="rounded-md w-[60%] max-w-[90%] overflow-hidden bg-slate-200 p-3">
                <Text className="p-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam ex iste non sed suscipit deleniti perspiciatis
                    debitis velit vel. Dignissimos, veritatis ab officia
                    reprehenderit expedita similique vero perspiciatis, in
                    dolorum provident repellat doloremque sit necessitatibus
                    voluptate nam atque unde illo, id corrupti harum. Doloremque
                    laudantium velit doloribus maxime, minus ea.
                </Text>
                <Text className="text-sm text-slate-500">20:20</Text>
            </View>
        </Button>
    );
};

export default ChatMessage;
