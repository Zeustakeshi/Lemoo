import Header from "@/components/header/Header";
import { cn } from "@/lib/utils";
import ChatRoomList from "../chat/ChatRoomList";

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
            <ChatRoomList></ChatRoomList>
        </div>
    );
};

export default ChatSidebar;
