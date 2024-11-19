import { cn } from "@/lib/cn";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = {
    className?: string;
    error?: string;
} & TextInputProps;

const Input = ({ className, error, ...props }: Props, ref: any) => {
    return (
        <View>
            <TextInput
                className={cn(
                    "border border-transparent p-5 py-4 rounded-full bg-slate-50 caret-primary  placeholder:text-muded",
                    {
                        " border-destructive": error,
                    },
                    className
                )}
                {...props}
                ref={ref}
            ></TextInput>
            {error && (
                <Text className="text-sm px-5 text-destructive">{error}</Text>
            )}
        </View>
    );
};

export default React.forwardRef(Input);
