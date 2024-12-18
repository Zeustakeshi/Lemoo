import { cn } from "@/lib/cn";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

type Props = {
    texts: string[];
    animatedTime?: number;
    intervalTime?: number;
    renderMode?: "random" | "sequential";
    className?: string;
};

const AnimatedTyping = ({
    texts,
    animatedTime = 100,
    intervalTime = 2000,
    renderMode = "random",
    className,
    ...props
}: Props) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentText, setCurrentText] = useState("");
    // const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (!Array.isArray(texts) || texts.length === 0) return;

        const updateText = () => {
            if (renderMode === "random") {
                const randomIndex = Math.floor(Math.random() * texts.length);
                setCurrentText(texts[randomIndex]);
            } else if (renderMode === "sequential") {
                // setCurrentIndex((prevIndex) => {
                //     const newIdx = (prevIndex + 1) % texts.length;
                //     console.log({ newIdx });
                //     return newIdx;
                // });
                // setCurrentText(texts[(currentIndex + 1) % texts.length]);
            }
        };

        updateText(); // Set initial text

        const interval = setInterval(() => {
            updateText();
        }, intervalTime);

        return () => clearInterval(interval);
    }, [texts, intervalTime, renderMode]);

    useEffect(() => {
        if (typeof currentText !== "string") return;
        let index = 0;
        const timer = setInterval(() => {
            setDisplayedText(currentText.substring(0, index));
            index++;
            if (index > currentText.length) {
                clearInterval(timer);
            }
        }, animatedTime);

        return () => clearInterval(timer);
    }, [currentText, animatedTime]);

    return (
        <Text className={cn(className)} {...props}>
            {displayedText}
        </Text>
    );
};
export default AnimatedTyping;
