import { sleep } from "@/lib/utils";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
});

type Props = {};

const Splash = ({}: Props) => {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            await sleep(5000);
        };
        prepare().then(() => {
            setAppIsReady(true);
        });
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            SplashScreen.hide();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            onLayout={onLayoutRootView}
        >
            <Text>SplashScreen Demo! 👋</Text>
        </View>
    );
};

export default Splash;
