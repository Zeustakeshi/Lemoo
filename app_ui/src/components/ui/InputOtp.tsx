import React, { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Input from "./Input";

type Props = {
    onChange?: (code: string) => void;
    error?: string;
};

const InputOtp = ({ onChange, error }: Props) => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = Array(6)
        .fill(null)
        .map(() => useRef<TextInput>(null));

    const handleChange = (text: string, index: number) => {
        if (text.length > 1) {
            const otpArray = text.split("").slice(0, 6); // Lấy tối đa 6 ký tự

            otpArray.forEach((char, i) => {
                if (inputRefs[i].current) {
                    inputRefs[i].current.setNativeProps({ text: char });
                }
            });
            return;
        }

        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        onChange?.(newOtp.join(""));

        // Chuyển sang ô tiếp theo nếu người dùng đã nhập một ký tự
        if (text && index < 5) {
            inputRefs[index + 1].current?.focus();
        }
    };

    return (
        <View>
            <View className="flex flex-row gap-2">
                {otp.map((_, index) => (
                    <Input
                        maxLength={1}
                        className="rounded-xl text-center p-3"
                        key={index}
                        ref={inputRefs[index]}
                        keyboardType="number-pad"
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === "Backspace" && index > 0) {
                                inputRefs[index - 1].current?.focus();
                            }
                        }}
                    />
                ))}
            </View>
            {error && (
                <Text className="text-sm text-destructive mt-2">{error}</Text>
            )}
        </View>
    );
};

export default InputOtp;
