import { getVideoComments } from "@/api/shorts.api";
import { Pageable } from "@/common/type/page.type";
import { CommentResponse } from "@/common/type/shorts.type";
import {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
    QueryObserverResult,
    RefetchOptions,
    useInfiniteQuery,
} from "@tanstack/react-query";
import { createContext, useContext } from "react";

export interface ShortsCommentContext {
    videoId: string;
    comments: InfiniteData<Pageable<CommentResponse>, unknown> | undefined;
    fetchNextPage: (
        options?: FetchNextPageOptions
    ) => Promise<
        InfiniteQueryObserverResult<
            InfiniteData<Pageable<CommentResponse>, unknown>,
            Error
        >
    >;
    hasNextPage: boolean;
    isLoading: boolean;
    refetch: (
        options?: RefetchOptions
    ) => Promise<
        QueryObserverResult<
            InfiniteData<Pageable<CommentResponse>, unknown>,
            Error
        >
    >;
    isRefetching: boolean;
}

const ShortsCommentContext = createContext<ShortsCommentContext | null>(null);

export function ShortsCommentProvider({
    children,
    videoId,
}: {
    children: React.ReactNode;
    videoId: string;
}) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        refetch,
        isRefetching,
    } = useInfiniteQuery({
        queryKey: [`video-comments-${videoId}`],
        queryFn: async ({ pageParam }) =>
            await getVideoComments(videoId, pageParam),
        getNextPageParam: (lastPage: any) => {
            if (lastPage.last) return undefined;
            return lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
        gcTime: 0,
    });

    return (
        <ShortsCommentContext.Provider
            value={{
                videoId,
                comments: data,
                fetchNextPage,
                hasNextPage,
                isLoading,
                refetch,
                isRefetching,
            }}
        >
            {children}
        </ShortsCommentContext.Provider>
    );
}

export function useShortsComment() {
    const context = useContext(ShortsCommentContext);
    if (!context) {
        throw new Error(
            "useShortsComment must be used within a ShortsCommentProvider"
        );
    }
    return context;
}
