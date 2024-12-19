import { createContext, ReactNode, useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    PanResponder,
    Platform,
    StyleSheet,
    View,
} from "react-native";

export interface BottomSheetContext {}

const BottomSheetContext = createContext<BottomSheetContext | null>(null);

const { height, width } = Dimensions.get("window");
const BOTTOM_SHEET_MAX_HEIGHT = height * 0.9;
const BOTTOM_SHEET_MIN_HEIGHT = 0;
const MAX_UPWARD_TRANSLATE_Y =
    BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
};

const DraggableBottomSheet = ({
    open = false,
    onOpenChange,
    children,
}: Props) => {
    const animatedValue = useRef(new Animated.Value(1)).current;
    const lastGestureDy = useRef(0);

    useEffect(() => {
        // Open or close the bottom sheet based on the `open` prop
        if (open) {
            springAnimation("up");
        } else {
            springAnimation("down");
        }
        onOpenChange?.(open);
    }, [open]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                animatedValue.setOffset(lastGestureDy.current);
            },
            onPanResponderMove: (e, gesture) => {
                animatedValue.setValue(gesture.dy);
            },
            onPanResponderRelease: (e, gesture) => {
                animatedValue.flattenOffset();
                lastGestureDy.current += gesture.dy;

                if (gesture.dy > 0) {
                    // dragging down
                    if (gesture.dy <= DRAG_THRESHOLD) {
                        springAnimation("up");
                    } else {
                        springAnimation("down");
                    }
                } else {
                    // dragging up
                    if (gesture.dy >= -DRAG_THRESHOLD) {
                        springAnimation("down");
                    } else {
                        springAnimation("up");
                    }
                }
            },
        })
    ).current;

    const springAnimation = (direction: any) => {
        lastGestureDy.current =
            direction === "down"
                ? MAX_DOWNWARD_TRANSLATE_Y
                : MAX_UPWARD_TRANSLATE_Y;
        Animated.spring(animatedValue, {
            toValue: lastGestureDy.current,
            useNativeDriver: true,
        }).start(() => {
            // Khi animation kết thúc, nếu bottom sheet đang đóng, gọi onClose
            if (
                direction === "down" &&
                lastGestureDy.current === MAX_DOWNWARD_TRANSLATE_Y
            ) {
                console.log("close");
                console.log({
                    curr: lastGestureDy.current,
                    alo: MAX_DOWNWARD_TRANSLATE_Y,
                });
            }
        });
    };

    const bottomSheetAnimation = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [
                        MAX_UPWARD_TRANSLATE_Y,
                        MAX_DOWNWARD_TRANSLATE_Y,
                    ],
                    outputRange: [
                        MAX_UPWARD_TRANSLATE_Y,
                        MAX_DOWNWARD_TRANSLATE_Y,
                    ],
                    extrapolate: "clamp",
                }),
            },
        ],
    };

    return (
        <View style={[styles.container]}>
            <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
                <View
                    style={styles.draggableArea}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.dragHandle} />
                </View>
                {children}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomSheet: {
        position: "absolute",
        width: "100%",
        zIndex: 40,
        height: BOTTOM_SHEET_MAX_HEIGHT,
        bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: "#a8bed2",
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
            },
        }),
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    draggableArea: {
        width: 132,
        height: 32,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    dragHandle: {
        width: 100,
        height: 6,
        backgroundColor: "#d3d3d3",
        borderRadius: 10,
    },
});

export default DraggableBottomSheet;
