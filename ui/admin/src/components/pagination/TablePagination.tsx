import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearch } from "@tanstack/react-router";

type Props = {
    minPage: number;
    maxPage: number;
    currentPage: number;
    url: string;
};

const TablePagination = ({ minPage, maxPage, currentPage, url }: Props) => {
    const searchParams = useSearch({
        strict: false,
    });
    const router = useRouter();

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                {currentPage > minPage && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                router.navigate({
                                    to: url,
                                    search: {
                                        ...(searchParams as any),
                                        page: currentPage - 1,
                                    },
                                });
                            }}
                        />
                    </PaginationItem>
                )}
                {currentPage > minPage && (
                    <PaginationItem
                        onClick={() => {
                            router.navigate({
                                to: url,
                                search: {
                                    ...(searchParams as any),
                                    page: currentPage - 1,
                                },
                            });
                        }}
                    >
                        <PaginationLink href="#">
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationLink isActive href="#">
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>

                {currentPage < maxPage - 1 && (
                    <>
                        <PaginationItem
                            onClick={() => {
                                router.navigate({
                                    to: url,
                                    search: {
                                        ...(searchParams as any),
                                        page: currentPage + 1,
                                    },
                                });
                            }}
                        >
                            <PaginationLink href="#">
                                {currentPage + 1}
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}

                {currentPage < maxPage && (
                    <PaginationItem
                        onClick={() => {
                            router.navigate({
                                to: url,
                                search: {
                                    ...(searchParams as any),
                                    page: maxPage,
                                },
                            });
                        }}
                    >
                        <PaginationLink href="#">{maxPage}</PaginationLink>
                    </PaginationItem>
                )}
                {currentPage < maxPage && (
                    <PaginationItem
                        onClick={() => {
                            router.navigate({
                                to: url,
                                search: {
                                    ...(searchParams as any),
                                    page: currentPage + 1,
                                },
                            });
                        }}
                    >
                        <PaginationNext href="#" />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default TablePagination;
