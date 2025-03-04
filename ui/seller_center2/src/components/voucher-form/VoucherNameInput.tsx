import { BaseVoucherSchemaType } from "@/schema/voucher.schema";
import moment from "moment";
import React from "react";
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

const VoucherNameInput = ({}: Props, ref: any) => {
    const form = useFormContext<BaseVoucherSchemaType>();
    return (
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormItem>
                        <FormLabel>Tên khuyến mãi</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={` Mã giảm giá ${moment(new Date()).format("DD-MM-YYYY")}`}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage></FormMessage>
                    </FormItem>
                </FormItem>
            )}
        />
    );
};

export default React.forwardRef(VoucherNameInput);
