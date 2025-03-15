import { getAllStoreNotifications } from "@/api/notification.api";
import { NotificationItemResponse } from "@/common/type/notification.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import NotificationItem from "./NotificationItem";

type Props = {};

const NotificationList = (props: Props) => {
    const [ref, inView] = useInView();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ["get-notifications"],
            queryFn: async ({ pageParam }) =>
                await getAllStoreNotifications(pageParam),
            getNextPageParam: (lastPage: any) => {
                if (lastPage.last) return undefined;
                return lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
        });
    useEffect(() => {
        if (!hasNextPage || !inView) return;
        fetchNextPage();
    }, [inView]);

    return (
        <div className="pb-10 px-2 overflow-y-scroll max-h-[80svh]">
            {data &&
                data?.pages
                    .flatMap(({ content }: any) => content ?? [])
                    .map(
                        (
                            notification: NotificationItemResponse,
                            index,
                            content
                        ) => {
                            const lastIndex = content?.length ?? 1 - 1;
                            if (index === Math.ceil(lastIndex * 0.8))
                                return (
                                    <NotificationItem
                                        key={index}
                                        notification={notification}
                                    ></NotificationItem>
                                );
                            return (
                                <NotificationItem
                                    ref={ref}
                                    notification={notification}
                                ></NotificationItem>
                            );
                        }
                    )}
        </div>
    );
};

export default NotificationList;
