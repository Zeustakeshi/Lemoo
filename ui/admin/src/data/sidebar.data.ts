import { SidebarItemType } from "@/common/type/sidebar.type";
import { LayoutGrid, Store, Ticket } from "lucide-react";

export const sidebarItems: SidebarItemType[] = [
    {
        icon: LayoutGrid,
        title: "Tổng quan",
        url: "#",
    },
    {
        title: "Quản lý cửa hàng",
        url: "#",
        icon: Store,
        items: [
            {
                title: "Danh sách cửa hàng",
                url: "/stores",
            },
            {
                title: "Cửa hàng chờ duyệt",
                url: "/",
            },
        ],
    },
    {
        title: "Quản lý khuyến mãi",
        url: "#",
        icon: Ticket,
        items: [
            {
                title: "Danh sách khuyến mãi",
                url: "/",
            },
            {
                title: "Freeship toàn sàn",
                url: "/",
            },
        ],
    },
];
