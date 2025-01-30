import { getAllStore } from "@/api/store.api";
import TablePagination from "@/components/pagination/TablePagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn, getStoreStatusColor, getStoreStatusText } from "@/lib/utils";
import StoreAction from "@/modules/store-table/StoreAction";
import { useQuery } from "@tanstack/react-query";

import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { z } from "zod";

const storeStatusSchema = z.enum([
    "ACTIVE",
    "PENDING",
    "NOT_ACTIVE",
    "DELETED",
]);

const searchSchema = z.object({
    status: storeStatusSchema.default("PENDING"),
    page: z.number().int().min(1).max(999999).default(1),
});

export const Route = createFileRoute("/_sidebar/stores/_store/")({
    validateSearch: (search) => {
        const parsedSearch = {
            ...search,
            page: search.page ? Number(search.page) : undefined,
        };
        const validatedSearch = searchSchema.safeParse(parsedSearch);

        if (!validatedSearch.success) {
            throw redirect({ search: { status: "PENDING", page: 0 } as any });
        }

        return validatedSearch.data;
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { status, page } = Route.useSearch();
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ["all-store", page, status],
        queryFn: async () => await getAllStore(page - 1),
    });

    if (!data || isLoading) return <div>loading ....</div>;

    console.log({ data });
    return (
        <div className="w-full px-10">
            {/* STORE FILTER */}
            <div className="w-full my-5 flex justify-end">
                <Select
                    onValueChange={(value) => {
                        router.navigate({
                            to: "/stores",
                            search: {
                                page: 0,
                                status: value as any,
                            },
                        });
                    }}
                    defaultValue={status}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Trạng thái cửa hàng" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PENDING">Đang chờ duyệt</SelectItem>
                        <SelectItem value="ACTIVE">Đang hoạt động</SelectItem>
                        <SelectItem value="NOT_ACTIVE">
                            Không hoạt động
                        </SelectItem>
                        <SelectItem value="DELETED">
                            Bị khóa hoạt động
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* TABLE */}
            <Table className="w-full">
                <TableHeader className="bg-slate-100">
                    <TableRow>
                        <TableHead>Mã cửa hàng</TableHead>
                        <TableHead>Trên cửa hàng</TableHead>
                        <TableHead>Loại cửa hàng</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.content.map((store) => (
                        <TableRow key={store.storeId}>
                            <TableCell className="font-medium">
                                {store.storeId}
                            </TableCell>
                            <TableCell>{store.name}</TableCell>
                            <TableCell>{store.type}</TableCell>
                            <TableCell
                                className={cn("font-semibold")}
                                style={{
                                    color: getStoreStatusColor(store.status),
                                }}
                            >
                                {getStoreStatusText(store.status)}
                            </TableCell>

                            {/* TABLE ACTIONS */}
                            <StoreAction store={store}></StoreAction>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* FOOTER */}
            <TablePagination
                minPage={1}
                maxPage={data.totalPages}
                currentPage={data.pageNumber + 1}
                url="/stores"
            ></TablePagination>
        </div>
    );
}
