import { LimitSchemaType } from "@/schema/voucher.schema";
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

const VoucherLimitPerUserInput = (props: Props) => {
    const form = useFormContext<LimitSchemaType>();
    return (
        <FormField
            control={form.control}
            name="limit"
            render={({}) => (
                <FormItem>
                    <FormLabel>Số lượt sử dụng cho mỗi khách</FormLabel>
                    <FormControl>
                        <Input
                            type="number"
                            onChange={(e) =>
                                form.setValue("limit", +e.target.value)
                            }
                            value={form.getValues("limit")?.toString()}
                        ></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default VoucherLimitPerUserInput;
