import ContactHeader from "@/components/header/ContactHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contacts/_contact/request")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full h-full">
            <ContactHeader>Lời mời kết bạn</ContactHeader>
        </div>
    );
}
