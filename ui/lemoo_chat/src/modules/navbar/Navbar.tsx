import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { CircleUser, MessageSquareMore, Settings2 } from "lucide-react";
import NavItem from "./NavItem";

type Props = {};

const Navbar = (props: Props) => {
    const { user } = useAuth();

    return (
        <div className="w-max h-full bg-primary px-2 py-4 shadow-2xl flex flex-col justify-between items-center gap-2">
            <div className="flex flex-col justify-start items-center gap-4">
                <Avatar className="size-[50px]">
                    <AvatarImage src={user?.avatar}></AvatarImage>
                </Avatar>
                <div className="flex flex-col justify-start items-center gap-2">
                    <NavItem to="/">
                        <MessageSquareMore />
                    </NavItem>
                    <NavItem to="/contacts">
                        <CircleUser />
                    </NavItem>
                </div>
            </div>
            <div className="flex flex-col justify-end items-center gap-2">
                <NavItem to="/settings/general">
                    <Settings2 />
                </NavItem>
            </div>
        </div>
    );
};

export default Navbar;
