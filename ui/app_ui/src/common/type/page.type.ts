export type Pageable<T> = {
    totalPages: number;
    totalElements: number;
    size: number;
    content: T[];
    first: boolean;
    last: boolean;
    pageNumber: number;
    empty: boolean;
};

export type Page = {
    last: boolean;
    index: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
};

export type PageRequest = {
    page: number;
    limit: number;
};
