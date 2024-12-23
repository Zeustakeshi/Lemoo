import Button from "@/components/ui/Button";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {};

const CommenTrigger = (props: Props) => {
    return (
        <View className=" z-20">
            <View className=" justify-center items-center flex-1">
                <Button variant="ghost">
                    <MaterialIcons name="comment" size={32} color="white" />
                </Button>
                <Text className="text-white text-sm font-semibold">2</Text>
            </View>
        </View>
    );
};

export default CommenTrigger;
