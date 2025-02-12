import { ChatRoomDetailType } from "@/common/type/room.type";
import ChatRoomInfo from "@/modules/chat/ChatRoomInfo";

type Props = {
    room: ChatRoomDetailType;
};

const ChatHeader = ({ room }: Props) => {
    return (
        <div className="bg-white border-b px-5 py-3 h-[72px] flex justify-start items-start gap-3">
            <ChatRoomInfo room={room}></ChatRoomInfo>
            <div className="flex flex-col justify-start items-start w-full select-none">
                <h3 className="line-clamp-1 max-w-[80%] text-lg font-medium">
                    {room.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {room.totalMembers} thành viên
                </p>
            </div>
        </div>
    );
};

export default ChatHeader;
