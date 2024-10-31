import AppWrapper from "@/components/wrapper/AppWrapper";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Text } from "react-native";

type Props = {};

const home = (props: Props) => {
    const { isAuthenticated, user } = useAuth();
    return (
        <AppWrapper>
            <Text>
                {JSON.stringify({
                    isAuthenticated,
                    user,
                })}
            </Text>
        </AppWrapper>
    );
};

export default home;
