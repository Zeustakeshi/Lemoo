import { cn } from "@/lib/cn";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type SettingGroupProps = {
    children: ReactNode;
};

export const SetttingGroup = ({ children }: SettingGroupProps) => {
    return <View className="w-full my-2">{children}</View>;
};

type SettingGroupHeaderProps = {
    children: ReactNode;
    className?: string;
};

export const SetttingGroupHeader = ({
    children,
    className,
}: SettingGroupHeaderProps) => {
    return (
        <Text
            className={cn(
                "text-sm  text-primary py-2 font-semibold",
                className
            )}
        >
            {children}
        </Text>
    );
};

type SettingGroupContentProps = {
    children: ReactNode;
    className?: string;
};

export const SettingGroupContent = ({
    children,
    className,
}: SettingGroupContentProps) => {
    return <View className={cn("", className)}>{children}</View>;
};

type SettingGroupItemProps = {
    children?: ReactNode;
    className?: string;
    Icon: any;
    iconName: string;
    iconColor?: string;
    settingValue?: string;
    labelClassName?: string;
    onPress?: () => void;
};

export const SettingGroupItem = ({
    children,
    className,
    labelClassName,
    Icon,
    iconName,
    iconColor,
    settingValue,
    onPress,
}: SettingGroupItemProps) => {
    return (
        <Pressable
            onPress={onPress}
            className="px-3  flex-row justify-start items-center gap-4"
        >
            <Icon
                name={iconName}
                size={18}
                color={iconColor || "#475569"}
            ></Icon>

            <View
                className={cn(
                    "flex-1 flex-row justify-between items-center gap-4 py-6 border-b border-b-slate-200",
                    className
                )}
            >
                <Text className={cn(" font-medium ", labelClassName)}>
                    {children}
                </Text>
                <Text className="text-sm text-slate-400">{settingValue}</Text>
            </View>
        </Pressable>
    );
};
