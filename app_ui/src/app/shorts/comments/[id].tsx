import CommentList from "@/components/shorts/Comment/CommentList";
import Button from "@/components/ui/Button";
import AppWrapper from "@/components/wrapper/AppWrapper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

type Props = {};

const CommentScreen = (props: Props) => {
    return (
        <AppWrapper>
            <View className="flex-row justify-start items-center gap-2 pb-3 border-b border-b-slate-200">
                <Button
                    onPress={() => router.back()}
                    variant="link"
                    size="icon"
                >
                    <Ionicons name="chevron-back" size={24} color="black" />
                </Button>
                <Text className="text-xl font-semibold">Bình luận</Text>
            </View>
            <CommentList></CommentList>
        </AppWrapper>
    );
};

export default CommentScreen;
