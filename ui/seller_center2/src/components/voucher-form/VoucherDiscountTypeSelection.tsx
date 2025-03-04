import { DiscountType } from "@/common/enum/voucher.enum";
import { formatMoneyVND } from "@/lib/money.lib";
import { cn } from "@/lib/utils";
import {
    BaseVoucherSchemaType,
    DiscountSchemaType,
} from "@/schema/voucher.schema";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = {};

const VoucherDiscountTypeSelection = (props: Props) => {
    const [discountType, setDiscountType] = useState<DiscountType>(
        DiscountType.MONEY_VALUE
    );
    const form = useFormContext<BaseVoucherSchemaType>();
    useEffect(() => {
        form.setValue("discountType", discountType);
    }, [discountType]);

    return (
        <div>
            <FormLabel>Thiết lập khuyến mãi</FormLabel>

            <div className="flex w-full items-center justify-center gap-2 my-5 ">
                <DiscountMoneyValueCard
                    active={discountType === DiscountType.MONEY_VALUE}
                    onClick={() => setDiscountType(DiscountType.MONEY_VALUE)}
                />
                <DiscountPercentageCard
                    active={discountType === DiscountType.PERCENTAGE}
                    onClick={() => setDiscountType(DiscountType.PERCENTAGE)}
                />
            </div>

            <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Giá trị giảm giá</FormLabel>
                        <FormControl>
                            <Input
                                onChange={(e) =>
                                    form.setValue(
                                        "discountValue",
                                        +e.target.value
                                    )
                                }
                                value={form
                                    .getValues("discountValue")
                                    .toString()}
                            ></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nếu giá trị đơn hàng đạt tới</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                onChange={(e) =>
                                    form.setValue(
                                        "minimumOrderValue",
                                        +e.target.value
                                    )
                                }
                                value={form
                                    .getValues("minimumOrderValue")
                                    ?.toString()}
                            ></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {discountType === DiscountType.PERCENTAGE && (
                <DiscountPercentageForm></DiscountPercentageForm>
            )}
            {discountType === DiscountType.MONEY_VALUE && (
                <DiscountMoneyValueForm></DiscountMoneyValueForm>
            )}
        </div>
    );
};

const DiscountPercentageForm = () => {
    const form = useFormContext<DiscountSchemaType>();
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="maximumDiscountValue"
                render={({}) => (
                    <FormItem>
                        <FormLabel>Giá trị đơn hàng tối đa được giảm</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                onChange={(e) =>
                                    form.setValue(
                                        "maximumDiscountValue",
                                        +e.target.value
                                    )
                                }
                                value={(
                                    form.getValues("maximumDiscountValue") ?? 0
                                ).toString()}
                            ></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

const DiscountMoneyValueForm = () => {
    const form = useFormContext<DiscountSchemaType>();

    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="budget"
                render={({}) => (
                    <FormItem>
                        <FormLabel>Kính phí giảm giá</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                onChange={(e) =>
                                    form.setValue("budget", +e.target.value)
                                }
                                value={(
                                    form.getValues("budget") ?? 0
                                ).toString()}
                            ></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

const DiscountMoneyValueCard = ({
    onClick,
    active,
}: {
    onClick: () => void;
    active: boolean;
}) => {
    const form = useFormContext<BaseVoucherSchemaType>();
    return (
        <div
            onClick={onClick}
            className={cn("flex-1 h-full w-full p-5 rounded-xl border", {
                "border-2 border-primary": active,
            })}
        >
            <h3>Giảm giá cố định</h3>
            <div>
                <p> {formatMoneyVND(form.watch("discountValue") ?? 0)} </p>
                <p>
                    Số tiền tối thiểu:{" "}
                    {formatMoneyVND(form.watch("minimumOrderValue") ?? 0)}
                </p>
            </div>
        </div>
    );
};

const DiscountPercentageCard = ({
    onClick,
    active,
}: {
    onClick: () => void;
    active: boolean;
}) => {
    const form = useFormContext<BaseVoucherSchemaType>();

    return (
        <div
            onClick={onClick}
            className={cn("flex-1 h-full w-full p-5 rounded-xl border", {
                "border-2 border-primary": active,
            })}
        >
            <h3>Giảm giá theo phần trăm</h3>
            <div>
                <p>{form.watch("discountValue")} %</p>
                <p>
                    Số tiền tối thiểu:{" "}
                    {formatMoneyVND(form.watch("minimumOrderValue") ?? 0)}
                </p>
            </div>
        </div>
    );
};

export default VoucherDiscountTypeSelection;
