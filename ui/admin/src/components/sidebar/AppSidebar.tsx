import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/data/sidebar.data";
import { selectAuth } from "@/store/auth/auth";
import { useSelector } from "react-redux";
import Logo from "../ui/logo";
import SidebarAccount from "./SidebarAccount";
import SidebarMain from "./SidebarMain";

export function AppSidebar() {
    const { user } = useSelector(selectAuth);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="w-[--radix-dropdown-menu-trigger-width] !flex flex-row justify-center px-3">
                <Logo></Logo>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMain items={sidebarItems}></SidebarMain>
            </SidebarContent>

            {user && (
                <SidebarFooter>
                    <SidebarAccount user={user} />
                </SidebarFooter>
            )}
        </Sidebar>
    );
}
