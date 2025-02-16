import Header from "@/components/header/Header";
import { cn } from "@/lib/utils";
import { Send, Telescope, UserCheck, UsersRound } from "lucide-react";
import ContactSidebarItem from "./ContactSidebarItem";

type Props = {
    className?: string;
};

const ContactSidebar = ({ className }: Props) => {
    return (
        <div className={cn("border-r", className)}>
            <Header></Header>
            <div>
                <ContactSidebarItem
                    to="/contacts/recommend"
                    icon={<Telescope />}
                >
                    Khám phá
                </ContactSidebarItem>
                <ContactSidebarItem to="/contacts" icon={<UsersRound />}>
                    Danh sách bạn bè
                </ContactSidebarItem>
                <ContactSidebarItem to="/contacts/request" icon={<UserCheck />}>
                    Lời mời kết bạn
                </ContactSidebarItem>
                <ContactSidebarItem to="/contacts/sent" icon={<Send />}>
                    Lời mời đã gửi
                </ContactSidebarItem>
            </div>
        </div>
    );
};

export default ContactSidebar;
