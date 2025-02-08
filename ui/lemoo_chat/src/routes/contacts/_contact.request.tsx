import ContactHeader from "@/components/header/ContactHeader";
import FriendRequestList from "@/modules/contact/FriendRequestList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contacts/_contact/request")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full h-full">
            <ContactHeader>Lời mời kết bạn</ContactHeader>
            <div className=" w-full h-full overflow-y-scroll custom-scroll max-h-[calc(100svh-75px)]">
                <FriendRequestList></FriendRequestList>
            </div>
        </div>
    );
}
