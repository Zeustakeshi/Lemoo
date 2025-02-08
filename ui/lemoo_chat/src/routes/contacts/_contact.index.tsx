import ContactHeader from "@/components/header/ContactHeader";
import ContactList from "@/modules/contact/ContactList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contacts/_contact/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full h-full">
            <ContactHeader>Danh sách bạn bè</ContactHeader>
            <div className="p-3 w-full h-full overflow-y-scroll custom-scroll max-h-[calc(100svh-75px)]">
                <ContactList></ContactList>
            </div>
        </div>
    );
}
