import { ChatRoomType } from "@/common/type/room.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link, LinkOptions } from "@tanstack/react-router";
import moment from "moment";
type Props = {
    room: ChatRoomType;
} & LinkOptions;

const ChatSidebarItem = ({ room, ...props }: Props) => {
    return (
        <Link
            className="flex justify-start items-center gap-2 px-2 py-3 hover:bg-stone-400/10 cursor-pointer transition-all"
            activeOptions={{ exact: true }}
            activeProps={{ className: "!bg-primary/10 " }}
            {...props}
        >
            <Avatar className="size-[45px]">
                <AvatarImage src={room.avatar}></AvatarImage>
            </Avatar>
            <div className="flex flex-col justify-start items-start gap-1">
                <div className="flex justify-between items-center w-full">
                    <p className=" max-w-full line-clamp-1">{room.name}</p>
                    <span className="text-xs text-muted-foreground">
                        {moment(new Date()).format("hh:mm")}
                    </span>
                </div>
                <p className="flex justify-start items-center gap-1 text-sm text-muted-foreground">
                    <span className="flex-shrink-0 ">Minh Hiếu: </span>
                    <span className="line-clamp-1">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Obcaecati ea rem vel aspernatur libero veniam
                        corporis, incidunt sapiente assumenda id mollitia ut
                        adipisci accusamus non quaerat explicabo temporibus
                        molestiae accusantium.
                    </span>
                </p>
            </div>
        </Link>
    );
};

export default ChatSidebarItem;
