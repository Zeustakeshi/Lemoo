import { createRegularVoucher } from "@/api/voucher.api";
import { VoucherScope } from "@/common/enum/voucher.enum";
import { Button } from "@/components/ui/button";
import VoucherAvailableInput from "@/components/voucher-form/VoucherAvailableInput";
import VoucherCollectionTimeInput from "@/components/voucher-form/VoucherCollectionTimeInput";
import VoucherDiscountTypeSelection from "@/components/voucher-form/VoucherDiscountTypeSelection";
import VoucherLimitPerUserInput from "@/components/voucher-form/VoucherLimitPerUserInput";
import VoucherNameInput from "@/components/voucher-form/VoucherNameInput";
import VoucherScopeSelection from "@/components/voucher-form/VoucherScopeSelection";
import VoucherTimeInput from "@/components/voucher-form/VoucherTimeInput";
import {
    RegularVoucherSchema,
    RegularVoucherSchemaType,
} from "@/schema/voucher.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const Route = createFileRoute("/promotion/vouchers/regular/new")({
    component: RouteComponent,
});

function RouteComponent() {
    const form = useForm<RegularVoucherSchemaType>({
        resolver: zodResolver(RegularVoucherSchema),
        defaultValues: {
            scope: VoucherScope.ENTIRE_STORE,
            discountValue: 0,
        },
    });

    const { mutateAsync: createVoucherMutation, isPending } = useMutation({
        mutationKey: ["create-voucher", "regular-voucher"],
        mutationFn: async (voucher: RegularVoucherSchemaType) =>
            await createRegularVoucher(voucher),
    });

    const handleSubmit = async (value: RegularVoucherSchemaType) => {
        toast.promise(async () => createVoucherMutation(value), {
            success: "Tạo khuyến mãi thành công",
            error: (error) => {
                console.log(error);
                return `Tạo khuyến mãi thất bại ${error}`;
            },
            loading: "Đang tạo khuyến mãi",
        });
    };

    return (
        <FormProvider {...form}>
            <form
                className="p-5 bg-white shadow-sm rounded-xl space-y-5"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <h1 className="mb-5 text-2xl font-semibold">Tạo khuyến mãi</h1>
                <VoucherNameInput></VoucherNameInput>
                <VoucherTimeInput></VoucherTimeInput>
                <VoucherCollectionTimeInput></VoucherCollectionTimeInput>
                <VoucherScopeSelection></VoucherScopeSelection>
                <VoucherDiscountTypeSelection></VoucherDiscountTypeSelection>
                <VoucherLimitPerUserInput></VoucherLimitPerUserInput>
                <VoucherAvailableInput></VoucherAvailableInput>
                <div className="flex justify-end">
                    <Button disabled={isPending} className="">
                        {isPending ? "Đang tạo khuyến mãi" : "Tạo khuyến mãi"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
