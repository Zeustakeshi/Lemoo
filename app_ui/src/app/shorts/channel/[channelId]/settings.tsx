import SceenHeaderBack from "@/components/ui/SceenHeaderBack";
import {
    SettingGroupContent,
    SettingGroupItem,
    SetttingGroup,
    SetttingGroupHeader,
} from "@/components/ui/Setttings";

import AppWrapper from "@/components/wrapper/AppWrapper";
import { RootState } from "@/store/store";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

type Props = {};

const setting = (props: Props) => {
    const { channel } = useSelector((state: RootState) => state.channel);

    if (!channel) router.back();

    return (
        <AppWrapper>
            <SceenHeaderBack>
                <Text className="text-xl font-semibold">Cài đặt </Text>
            </SceenHeaderBack>

            <SetttingGroup>
                <SetttingGroupHeader>Cài đặt video</SetttingGroupHeader>
                <SettingGroupContent>
                    <SettingGroupItem
                        onPress={() => {
                            router.push({
                                pathname:
                                    "/shorts/channel/[channelId]/new-video",
                                params: { channelId: channel?.id as string },
                            });
                        }}
                        Icon={Feather}
                        iconName="video"
                    >
                        Tạo video ngắn
                    </SettingGroupItem>
                    <SettingGroupItem
                        Icon={MaterialIcons}
                        iconName="movie-edit"
                    >
                        Quản lý video
                    </SettingGroupItem>
                </SettingGroupContent>
            </SetttingGroup>

            <SetttingGroup>
                <SetttingGroupHeader>Thông tin kênh</SetttingGroupHeader>
                <SettingGroupContent>
                    <SettingGroupItem
                        Icon={AntDesign}
                        iconName="user"
                        settingValue={channel?.name}
                    >
                        Tên kênh
                    </SettingGroupItem>
                    <SettingGroupItem Icon={AntDesign} iconName="picture">
                        Ảnh đại điện
                    </SettingGroupItem>
                    <SettingGroupItem Icon={AntDesign} iconName="picture">
                        Ảnh bìa kênh
                    </SettingGroupItem>
                    <SettingGroupItem
                        Icon={Feather}
                        iconName="trash-2"
                        iconColor="#e11d48"
                        labelClassName="text-rose-600"
                    >
                        Xóa kênh
                    </SettingGroupItem>
                </SettingGroupContent>
            </SetttingGroup>
        </AppWrapper>
    );
};

export default setting;
