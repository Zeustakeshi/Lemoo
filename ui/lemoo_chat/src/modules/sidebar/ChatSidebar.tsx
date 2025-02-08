import Header from "@/components/header/Header";
import { cn } from "@/lib/utils";
import ChatSidebarItem from "./ChatSidebarItem";

type Props = {
    className?: string;
};

const ChatSidebar = ({ className }: Props) => {
    return (
        <div
            className={cn(
                "flex flex-col justify-start items-center h-full border-r",
                className
            )}
        >
            <Header></Header>
            <div className="flex-1  w-full overflow-y-scroll custom-scroll max-h-[calc(100svh-75px)]">
                {Array.from({ length: 40 }).map((_, index) => (
                    <ChatSidebarItem
                        to="/rooms/$roomId"
                        params={{ roomId: `room-${index + 1}` }}
                        key={index}
                    ></ChatSidebarItem>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
