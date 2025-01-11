import { cn } from "@/lib/cn";
import React, { ReactNode } from "react";
import { Image, ImageProps, View } from "react-native";

type Props = {
    variant?: "square" | "circle";
    className?: string;
    children: ReactNode;
    size?: number;
    showBorder?: boolean;
};

const Avatar = ({
    children,
    size = 50,
    className,
    variant = "circle",
    showBorder = true,
}: Props) => {
    return (
        <View
            className={cn(
                " overflow-hidden",
                {
                    "rounded-full": variant === "circle",
                    "rounded-md": variant === "square",
                    "p-1 border border-slate-200": showBorder,
                },
                className
            )}
            style={{
                width: size,
                height: size,
            }}
        >
            <View
                className={cn("rounded-full overflow-hidden", {
                    "rounded-full": variant === "circle",
                    "rounded-md": variant === "square",
                })}
            >
                {children}
            </View>
        </View>
    );
};

export const AvatarImage = ({ className, ...props }: ImageProps) => {
    return (
        <Image className={cn("w-full h-full ", className)} {...props}></Image>
    );
};

export default Avatar;
