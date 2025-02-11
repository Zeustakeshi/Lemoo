import { getContactRequests } from "@/api/friend.api";
import { ContactRequest } from "@/common/type/contact.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import FriendRequestCard from "./FriendRequestCard";

type Props = {};

const FriendRequestList = (props: Props) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ["friend-list"],
            queryFn: async ({ pageParam }) =>
                await getContactRequests(pageParam),
            getNextPageParam: (lastPage: any) => {
                if (lastPage.last) return undefined;
                return lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
        });

    console.log({ data });

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3 p-4">
            {data &&
                data?.pages
                    .flatMap(({ content }: any) => content ?? [])
                    .map((request: ContactRequest, index, content) => {
                        const lastIndex = content.length - 1;
                        if (index === Math.ceil(lastIndex * 0.8))
                            return (
                                <FriendRequestCard
                                    contactRequest={request}
                                    key={index}
                                />
                            );
                        return (
                            <FriendRequestCard
                                contactRequest={request}
                                key={index}
                            />
                        );
                    })}

            {!hasNextPage && status !== "pending" && <p>Hết rồi</p>}
        </div>
    );
};

export default FriendRequestList;
