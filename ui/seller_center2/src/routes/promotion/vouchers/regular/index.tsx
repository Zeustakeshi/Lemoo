import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getAllRegularVoucher } from "../../../../api/voucher.api";
import VoucherTable from "../../../../modules/promotion/voucher/RegularVoucherTable";

export const Route = createFileRoute("/promotion/vouchers/regular/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data } = useInfiniteQuery({
        queryKey: ["get-all-voucher", "regular"],
        queryFn: async ({ pageParam }) =>
            await getAllRegularVoucher(pageParam, 10),
        getNextPageParam: (lastPage: any) => {
            if (lastPage.last) return undefined;
            return lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
        refetchOnWindowFocus: false,
    });

    console.log({ data });

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-2">Quản lý mã giảm giá</h1>
            <div className="flex w-full justify-end items-center">
                <button className="px-5 py-3 rounded-md text-white transition-all bg-blue-600 ">
                    Tạo khuyến mãi
                </button>
            </div>
            <h3 className="my-5 text-lg font-semibold">Danh sách khuyến mãi</h3>
            <VoucherTable
                rows={
                    data?.pages.flatMap(
                        ({ content }: any) => content ?? []
                    ) as any
                }
            ></VoucherTable>
        </div>
    );
}
