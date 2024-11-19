import Button from "@/components/ui/Button";
import AppWrapper from "@/components/wrapper/AppWrapper";
import { Slot, useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";

type Props = {};

const AuthLayout = (props: Props) => {
    const router = useRouter();

    return (
        <AppWrapper className="pb-12 ">
            <Slot></Slot>
            <Button
                onPress={() => router.back()}
                variant="link"
                className="mt-3"
            >
                <Text className="text-primary">Quay lại</Text>
            </Button>
        </AppWrapper>
    );
};

export default AuthLayout;
