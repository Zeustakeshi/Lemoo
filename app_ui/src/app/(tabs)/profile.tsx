import MyOrderSection from "@/components/order/MyOrderSection";
import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/cn";
import ProfileHeader from "@/modules/profile/ProfileHeader";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
    Animated,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";

type Props = {};

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const { width } = Dimensions.get("screen");

const profile = (props: Props) => {
    const { user, logout } = useAuth();

    const scrollY = useRef(new Animated.Value(0)).current;

    const opacity = scrollY.interpolate({
        inputRange: [10, 20],
        outputRange: [0, 100],
        extrapolate: "clamp",
    });

    const borderColor = scrollY.interpolate({
        inputRange: [10, 20],
        outputRange: ["transparent", "#e2e8f0"],
        extrapolate: "clamp",
    });

    return (
        <View>
            <AnimatedSafeAreaView
                className={cn(
                    "flex-row absolute items-center justify-between left-0 right-0 z-10 gap-3 bg-transparent px-4 pt-10 pb-2 border"
                )}
                style={{ backgroundColor: "white", borderColor, opacity }}
            >
                <View className="flex-row gap-3">
                    <Avatar size={30} showBorder={false}>
                        <AvatarImage src={user?.avatar}></AvatarImage>
                    </Avatar>
                    <Text className="text-xl font-semibold">
                        {user?.displayName}
                    </Text>
                </View>
                <View>
                    <Button variant="ghost" size="icon">
                        <Ionicons
                            name="settings-outline"
                            size={20}
                            color="black"
                        />
                    </Button>
                </View>
            </AnimatedSafeAreaView>
            <ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false } // useNativeDriver=false vì background không hỗ trợ native driver
                )}
                scrollEventThrottle={20} // call onScroll after 20ms
                showsVerticalScrollIndicator={false}
            >
                <ProfileHeader></ProfileHeader>
                <View
                    style={{ width }}
                    className="p-4 flex-1 bg-white rounded-t-2xl "
                >
                    <MyOrderSection></MyOrderSection>
                    <View className="min-h-[1000]"></View>
                </View>
                <Button onPress={logout}>
                    <Text>Đăng xuất</Text>
                </Button>
            </ScrollView>
        </View>
    );
};

export default profile;
