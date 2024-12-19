import TabIcon from "@/components/ui/TabIcon";
import TabLabel from "@/components/ui/TabLabel";
import {
    Feather,
    FontAwesome5,
    MaterialIcons,
    Octicons,
} from "@expo/vector-icons";
import { Tabs, useSegments } from "expo-router";
import React from "react";
import { View } from "react-native";

type Props = {};

const TabLayout = (props: Props) => {
    const segment = useSegments();

    return (
        <View className="flex-1 bg-white">
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: "#004CFF",
                    tabBarInactiveTintColor: "#94a3b81",
                    tabBarStyle: {
                        height: segment[2] == "videos" ? 0 : 65,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 0,
                        backgroundColor: "#fff",
                        borderColor: "#e2e8f0",
                        shadowColor: "#334155",
                    },
                    animation: "shift",
                    tabBarLabel: (props) => <TabLabel {...props} />,
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        headerTitle: "Trang chủ",
                        tabBarIcon: (props) => (
                            <TabIcon
                                Icon={Octicons}
                                iconName="home"
                                label="Trang chủ"
                                {...props}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="friend"
                    options={{
                        headerTitle: "Bạn bè",
                        tabBarIcon: (props) => (
                            <TabIcon
                                Icon={Feather}
                                iconName="users"
                                label="Bạn bè"
                                {...props}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="shorts"
                    options={{
                        tabBarIcon: (props) => (
                            <TabIcon
                                Icon={FontAwesome5}
                                iconName="fire-alt"
                                label="Bạn bè"
                                {...props}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="chats"
                    options={{
                        headerTitle: "Trò chuyện",
                        tabBarIcon: (props) => (
                            <TabIcon
                                Icon={MaterialIcons}
                                iconName="chat-bubble-outline"
                                label="Trò chuyện"
                                {...props}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        headerTitle: "Cá nhân",
                        tabBarIcon: (props) => (
                            <TabIcon
                                Icon={Feather}
                                iconName="user"
                                label="Cá nhân"
                                {...props}
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
};

export default TabLayout;
