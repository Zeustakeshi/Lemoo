import { Status, Store } from "@/common/type/store.type";
import SidebarRight from "@/components/navigation/SidebarRight";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import SidebarLeft from "../components/navigation/SidebarLeft";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const [store, setStore] = useState<Store | null>(() => {
        const storeString = sessionStorage.getItem("storeInfo");
        if (!storeString) return null;
        return JSON.parse(storeString);
    });

    return (
        <div className="min-h-screen flex bg-gray-50">
            <SidebarLeft></SidebarLeft>
            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </main>
            {store &&
                store.status !== Status.PENDING &&
                store.status !== Status.DELETED &&
                store.status !== Status.NOT_ACTIVE && (
                    <SidebarRight></SidebarRight>
                )}
        </div>
    );
}
