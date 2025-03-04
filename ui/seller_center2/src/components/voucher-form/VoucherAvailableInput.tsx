import { TotalAvailableSchemaType } from "@/schema/voucher.schema";
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

const VoucherAvailableInput = (props: Props) => {
    const form = useFormContext<TotalAvailableSchemaType>();
    return (
        <FormField
            control={form.control}
            name="totalAvailable"
            render={({}) => (
                <FormItem>
                    <FormLabel>Số lượt sử dụng cho mỗi khách</FormLabel>
                    <FormControl>
                        <Input
                            type="number"
                            onChange={(e) =>
                                form.setValue("totalAvailable", +e.target.value)
                            }
                            value={form.getValues("totalAvailable")?.toString()}
                        ></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default VoucherAvailableInput;
