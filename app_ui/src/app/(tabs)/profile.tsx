import Button from "@/components/ui/Button";
import AppWrapper from "@/components/wrapper/AppWrapper";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Image, Text } from "react-native";

type Props = {};

const profile = (props: Props) => {
    const { user, logout } = useAuth();
    return (
        <AppWrapper>
            {user && (
                <Image
                    source={{ uri: user.avatar }}
                    style={{ width: 60, height: 60 }}
                ></Image>
            )}
            <Text className="text-4xl font-semibold">{user?.displayName}</Text>

            <Button onPress={async () => await logout()} className="my-5">
                <Text className="text-white">Đăng xuất.</Text>
            </Button>
        </AppWrapper>
    );
};

export default profile;
