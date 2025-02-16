import { getAllMessages } from "@/api/chat.api";
import { useChatRoom } from "@/context/ChatRoomContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Message from "./Message";
import RealtimeMessageList from "./RealtimeMessageList";

type Props = {};

const MessageList = ({}: Props) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { ref, inView } = useInView();
    const { room } = useChatRoom();
    const firstFetch = useRef<boolean>(true);

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: [`chat-messages-${room.id}`, room.id],
            queryFn: async ({ pageParam }) =>
                await getAllMessages(room.id, pageParam, 10),
            getNextPageParam: (lastPage: any) => {
                if (lastPage.last) return undefined;
                return lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
            enabled: !!room,
            refetchOnWindowFocus: false,
        });

    useEffect(() => {
        firstFetch.current = true;
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop =
                messagesEndRef.current.scrollHeight;
        }
    }, [room.id]);

    useEffect(() => {
        if (isFetchingNextPage || inView) firstFetch.current = false;
    }, [inView, isFetchingNextPage]);

    useEffect(() => {
        if (!hasNextPage || !inView || firstFetch.current) return;
        fetchNextPage();
    }, [inView, data, firstFetch.current]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = firstFetch.current
                ? messagesEndRef.current.scrollHeight
                : messagesEndRef.current.scrollHeight * 0.4;
        }
    }, [data, firstFetch]);

    return (
        <div
            ref={messagesEndRef}
            className=" w-full h-full overflow-y-scroll overflow-x-hidden custom-scroll px-5 py-2"
        >
            {isFetching && (
                <div className="w-full flex justify-center items-center">
                    <span className="animate-spin size-[30px] rounded-full border-[3px] border-primary border-t-transparent"></span>
                </div>
            )}
            {data?.pages
                .flatMap(({ content }: any) => content ?? [])
                .reverse()
                .map((message, index) => (
                    <Message
                        key={index}
                        message={message}
                        ref={index === 3 ? ref : undefined}
                    ></Message>
                ))}
            <RealtimeMessageList></RealtimeMessageList>
        </div>
    );
};

export default MessageList;
