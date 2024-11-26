import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
type Props = {
    children: ReactNode;
};

const Sheet = ({ children }: Props, bottomSheetRef: any) => {
    return (
        <GestureHandlerRootView>
            <BottomSheet ref={bottomSheetRef}>
                <BottomSheetView>{children}</BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

export default forwardRef(Sheet);
