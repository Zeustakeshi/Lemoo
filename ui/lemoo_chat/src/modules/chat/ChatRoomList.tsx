import { getAllChatRoom } from "@/api/chat.api";
import { ChatRoomType } from "@/common/type/room.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import ChatSidebarItem from "../sidebar/ChatSidebarItem";

type Props = {};

const ChatRoomList = (props: Props) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ["chat-rooms"],
            queryFn: async ({ pageParam }) => await getAllChatRoom(pageParam),
            getNextPageParam: (lastPage: any) => {
                if (lastPage.last) return undefined;
                return lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
        });

    return (
        <div className="flex-1  w-full overflow-y-scroll custom-scroll max-h-[calc(100svh-75px)]">
            {data &&
                data?.pages
                    .flatMap(({ content }: any) => content ?? [])
                    .map((room: ChatRoomType, index, content) => {
                        const lastIndex = content.length - 1;
                        if (index === Math.ceil(lastIndex * 0.8))
                            return (
                                <ChatSidebarItem
                                    to="/rooms/$roomId"
                                    room={room}
                                    params={{ roomId: room.id }}
                                    key={index}
                                ></ChatSidebarItem>
                            );
                        return (
                            <ChatSidebarItem
                                to="/rooms/$roomId"
                                room={room}
                                params={{ roomId: room.id }}
                                key={index}
                            ></ChatSidebarItem>
                        );
                    })}

            {!hasNextPage && status !== "pending" && <p>Hết rồi</p>}
        </div>
    );
};

export default ChatRoomList;
