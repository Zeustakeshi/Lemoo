import { Store } from "@/common/type/store.type";
import { useSocket } from "@/context/SocketContext";
import { getSessionStorageValue } from "@/lib/storage";
import { useRouter } from "@tanstack/react-router";
import { BellRing } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
type Props = {};

const NotificationButton = (props: Props) => {
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

    const router = useRouter();
    const { client } = useSocket();

    useEffect(() => {
        const store = getSessionStorageValue<Store>("storeInfo");

        if (!client || !store || !client.connected) return;

        const subscription = client.subscribe(
            `/topic/notifications/${store.id}`,
            (message) => {
                setHasUnreadNotifications(true);
            }
        );
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [client, client?.connected]);

    return (
        <Button
            onClick={() => {
                setHasUnreadNotifications(false);
                router.navigate({ to: "/notifications" });
            }}
            className="!aspect-square w-10 min-h-10 !p-0"
        >
            {hasUnreadNotifications && (
                <span className="top-1 right-1 absolute  rounded-full w-[14px] aspect-square bg-red-500 "></span>
            )}
            <BellRing className="h-8 w-8" />
        </Button>
    );
};

export default NotificationButton;
