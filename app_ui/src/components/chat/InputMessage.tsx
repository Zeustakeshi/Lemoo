import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";
import Button from "../ui/Button";

type Props = {};

const InputMessage = (props: Props) => {
    return (
        <View className="justify-start items-center gap-x-2 flex-row py-2 ">
            <View className="flex-1">
                <TextInput
                    className="max-h-[200] border-t border-t-primary"
                    textAlignVertical="top"
                    style={{ maxHeight: 100 }}
                    multiline
                    placeholder="Nhập tin nhắn ...."
                    maxLength={2000}
                ></TextInput>
            </View>
            <View className="flex-row justify-end items-center gap-x-2">
                <Button variant="ghost">
                    <Feather name="image" size={20} color="#004CFF" />
                </Button>
                <Button variant="default">
                    <Ionicons name="send" size={16} color="white" />
                </Button>
            </View>
        </View>
    );
};

export default InputMessage;
