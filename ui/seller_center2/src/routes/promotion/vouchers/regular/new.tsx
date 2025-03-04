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
import { createFileRoute } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";

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

    const handleSubmit = async (value: RegularVoucherSchemaType) => {
        console.log({ value });
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
                <Button>Submit</Button>
            </form>
        </FormProvider>
    );
}
