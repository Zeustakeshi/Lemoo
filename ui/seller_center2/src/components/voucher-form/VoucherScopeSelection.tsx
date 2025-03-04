import { VoucherScope } from "@/common/enum/voucher.enum";
import { VoucherScopeSchemaType } from "@/schema/voucher.schema";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Props = {};

const VoucherScopeSelection = (props: Props) => {
    const form = useFormContext<VoucherScopeSchemaType>();
    return (
        <FormField
            name="scope"
            control={form.control}
            render={({}) => (
                <FormItem>
                    <FormLabel>Phạm vi áp dụng giảm giá</FormLabel>
                    <FormControl>
                        <RadioGroup
                            value={form.getValues("scope")}
                            onValueChange={(value) =>
                                form.setValue("scope", value as VoucherScope)
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={VoucherScope.ENTIRE_STORE}
                                    id="r1"
                                />
                                <Label htmlFor="r1">Toàn gian hàng</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={VoucherScope.SPECIFIC_PRODUCT}
                                    id="r2"
                                />
                                <Label htmlFor="r2">
                                    Sản phẩm được chọn (danh sách sản phẩm sẽ
                                    được cập nhật sau khi thiết lập điều kiện
                                    giảm giá)
                                </Label>
                            </div>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage></FormMessage>
                </FormItem>
            )}
        />
    );
};

export default VoucherScopeSelection;
