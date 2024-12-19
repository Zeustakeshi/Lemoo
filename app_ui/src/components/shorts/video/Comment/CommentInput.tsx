import Button from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

type Props = {};

const CommentInput = (props: Props) => {
    const [showInput, setShowInput] = useState<boolean>(true);
    return (
        <View className="justify-start items-center gap-x-2 flex-row py-2  border-t border-t-primary">
            <Pressable
                onPress={() => setShowInput(!showInput)}
                className="flex-1"
            >
                <TextInput
                    className="max-h-[200]"
                    textAlignVertical="top"
                    style={{ maxHeight: 100 }}
                    multiline
                    placeholder="Nhập bình luận ...."
                    maxLength={2000}
                ></TextInput>
            </Pressable>
            <View className="flex-row justify-end items-center gap-x-2">
                <Button variant="default">
                    <Ionicons name="send" size={16} color="white" />
                </Button>
            </View>
        </View>
    );
};

export default CommentInput;
