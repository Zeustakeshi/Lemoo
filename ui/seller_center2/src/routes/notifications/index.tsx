import NotificationList from "@/components/notification/NotificationList";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notifications/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="bg-white h-full rounded-2xl  shadow-xl backdrop-blur-xl p-5">
            <h1 className="text-2xl font-semibold">Trung tâm thông báo</h1>
            <Separator className="my-4" />
            <NotificationList></NotificationList>
        </div>
    );
}
