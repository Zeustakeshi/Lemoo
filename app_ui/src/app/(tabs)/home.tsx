import HeaderProfile from "@/components/header/HeaderProfile";
import ShortList from "@/components/shorts/ShortList";
import Button from "@/components/ui/Button";
import AppWrapper from "@/components/wrapper/AppWrapper";
import { useAuth } from "@/context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {};

const home = (props: Props) => {
    const { isAuthenticated, user } = useAuth();
    return (
        <AppWrapper>
            <HeaderProfile></HeaderProfile>
            <Text className="text-3xl font-semibold my-3">
                Xin chào, {user?.displayName}
            </Text>

            {/*  */}
            <View className="max-w-full bg-slate-100 h-max rounded-xl p-3">
                <Text className="text-xl font-semibold my-2">Announcement</Text>
                <View className="flex-row gap-x-3">
                    <Text>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Veniam, magni?
                    </Text>
                    <Button size="icon" className="rounded-full size-[40]">
                        <AntDesign name="arrowright" size={15} color="white" />
                    </Button>
                </View>
            </View>
            {/*  */}

            {/*  */}
            <ShortList></ShortList>
        </AppWrapper>
    );
};

export default home;
