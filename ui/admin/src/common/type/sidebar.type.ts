import { LucideIcon } from "lucide-react";

export type SidebarItemType = {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
};
