import ContactHeader from "@/components/header/ContactHeader";
import ContactRecommendList from "@/modules/contact/ContactRecommendList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contacts/_contact/recommend")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full h-full">
            <ContactHeader>Gợi ý kết bạn</ContactHeader>
            <div className=" w-full h-full overflow-y-scroll custom-scroll max-h-[calc(100svh-75px)]">
                <ContactRecommendList />
            </div>
        </div>
    );
}
