import { createContext, ReactNode, useContext } from "react";
import { View } from "react-native";

export interface BottomSheetContext {}

const BottomSheetContext = createContext<BottomSheetContext | null>(null);

export function BottomSheetProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <BottomSheetContext.Provider value={{}}>
            <BottomSheet>{children}</BottomSheet>
        </BottomSheetContext.Provider>
    );
}

type Props = {
    children: ReactNode;
};
export const BottomSheet = ({ children }: Props) => {
    return (
        <View className="absolute bottom-0 z-20 h-[200] bg-white border-t shadow-2xl shadow-slate-500 border-t-slate-100 rounded-xl w-full p-3">
            <View className="mx-auto">
                <View className="w-[50] min-h-[5]  rounded-full bg-slate-200"></View>
            </View>
            {children}
        </View>
    );
};

export function useBottomSheet() {
    const context = useContext(BottomSheetContext);
    if (!context) {
        throw new Error(
            "useBottomSheet must be used within an BottomSheetProvider"
        );
    }
    return context;
}
