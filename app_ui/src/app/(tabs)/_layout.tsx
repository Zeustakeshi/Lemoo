import TabIcon from "@/components/ui/TabIcon";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
type Props = {};

const TabLayout = (props: Props) => {
    return (
        <View className="flex-1 bg-white">
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#004CFF",
                    tabBarInactiveTintColor: "#94a3b81",
                    tabBarStyle: {
                        backgroundColor: "#fff",
                        shadowOpacity: 0,
                        paddingVertical: 5,
                        alignItems: "center",
                        height: 60,
                        borderWidth: 0,
                        borderColor: "",
                        shadowColor: "#fff",
                    },
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
