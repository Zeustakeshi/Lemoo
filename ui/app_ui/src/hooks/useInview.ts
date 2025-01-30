import { useCallback, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

const useInView = (ref: any, offset = 0) => {
    const { height: windowHeight } = useWindowDimensions();
    const [isInView, setIsInView] = useState(false);

    const checkIfInView = useCallback(() => {
        if (!ref.current) return;
        ref.current.measure(
            (
                x: number,
                y: number,
                width: number,
                height: number,
                pageX: number,
                pageY: number
            ) => {
                const inView =
                    pageY + height > 0 + offset &&
                    pageY < windowHeight - offset;
                setIsInView(inView);
            }
        );
    }, [ref, windowHeight, offset]);

    useEffect(() => {
        checkIfInView(); // Initial check
    }, [checkIfInView]);

    return isInView;
};

export default useInView;
