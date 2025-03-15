import { getAllProduct } from "@/api/product.api";
import { ProductResponse } from "@/common/type/product.type";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatMoneyVND } from "@/lib/money.lib";
import { getProductStatusColor, getProductStatusText } from "@/lib/product.lib";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { forwardRef, useEffect } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { useInView } from "react-intersection-observer";

export const Route = createFileRoute("/product/_product/manage")({
    component: RouteComponent,
});

function RouteComponent() {
    const [ref, inView] = useInView();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ["get-notifications"],
            queryFn: async ({ pageParam }) => await getAllProduct(pageParam),
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
        <div className="bg-white p-5  rounded-xl">
            <div className="m-2">
                <h2 className="font-medium text-xl">Quản lý sản phẩm</h2>
            </div>
            <div className="overflow-y-scroll h-[80svh]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sản phẩm</TableHead>
                            <TableHead>Biến thể</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {data &&
                            data?.pages
                                .flatMap(({ content }: any) => content ?? [])
                                .map((product, index, content) => {
                                    const lastIndex = content?.length ?? 1 - 1;
                                    if (index === Math.ceil(lastIndex * 0.8)) {
                                        return (
                                            <ProductRow
                                                key={index}
                                                product={product}
                                            ></ProductRow>
                                        );
                                    }
                                    return (
                                        <ProductRow
                                            key={index}
                                            product={product}
                                            ref={ref}
                                        ></ProductRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

type ProductRowProps = {
    product: ProductResponse;
};

const ProductRow = forwardRef(({ product }: ProductRowProps, ref: any) => {
    return (
        <TableRow ref={ref} key={product.id}>
            <TableCell className="flex justify-start items-center gap-3">
                <div className="aspect-square w-[60px] rounded-xl overflow-hidden">
                    <img
                        src={product.image}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <p className="font-semibold">{product.name}</p>
            </TableCell>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link">Xem biến thể</Button>
                    </DialogTrigger>
                    <DialogContent className="min-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Danh sách biến thể</DialogTitle>
                        </DialogHeader>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tên</TableHead>
                                    <TableHead>Giá</TableHead>
                                    <TableHead>Kho</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {product?.skus?.map((sku) => (
                                    <TableRow key={sku.lemooSku}>
                                        <TableCell className="font-semibold">
                                            {sku.name}
                                        </TableCell>
                                        <TableCell>
                                            {formatMoneyVND(sku.price)}
                                        </TableCell>
                                        <TableCell>{sku.stock}</TableCell>
                                        <TableCell>
                                            {sku.allowSale
                                                ? "Đang bán"
                                                : "Ngừng bán"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                </Dialog>
            </TableCell>
            <TableCell>
                <p
                    className={cn(
                        "font-semibold",
                        getProductStatusColor(product.status)
                    )}
                >
                    {getProductStatusText(product.status)}
                </p>
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <MdOutlineMoreVert></MdOutlineMoreVert>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Xem sản phẩm</DropdownMenuItem>
                        <DropdownMenuItem>Cập nhật sản phẩm</DropdownMenuItem>
                        <DropdownMenuItem>Xóa sản phẩm</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
});
