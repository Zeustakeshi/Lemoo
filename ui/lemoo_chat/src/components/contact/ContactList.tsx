import { getAllContact } from "@/api/friend.api";
import { UserContact } from "@/common/type/contact.type";
import { Pageable } from "@/common/type/page.type";
import {
    InfiniteData,
    QueryObserverResult,
    RefetchOptions,
    useInfiniteQuery,
} from "@tanstack/react-query";
import { ReactNode } from "@tanstack/react-router";

type Props = {
    children: ({
        hasNextPage,
        isFetchingNextPage,
        refetch,
        data,
    }: {
        data: InfiniteData<Pageable<UserContact>, unknown> | undefined;
        hasNextPage: boolean;
        isFetchingNextPage: boolean;
        refetch: (
            options?: RefetchOptions
        ) => Promise<
            QueryObserverResult<
                InfiniteData<Pageable<UserContact>, unknown>,
                Error
            >
        >;
    }) => ReactNode;
};

const ContactList = ({ children }: Props) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ["contact-list"],
            queryFn: async ({ pageParam }) => await getAllContact(pageParam),
            getNextPageParam: (lastPage: any) => {
                if (lastPage.last) return undefined;
                return lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
        });
    return children({
        data,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    });
};

export default ContactList;
