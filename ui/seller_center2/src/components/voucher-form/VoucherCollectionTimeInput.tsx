import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CollectTimeSchemaType } from "@/schema/voucher.schema";
import { useFormContext } from "react-hook-form";
import { FormLabel, FormMessage } from "../ui/form";

type Props = {};

const VoucherCollectionTimeInput = (props: Props) => {
    const form = useFormContext<CollectTimeSchemaType>();
    const [date, setDate] = React.useState<Date>();

    React.useEffect(() => {
        if (!date) return;
        form.clearErrors("collectStartTime");
        form.setValue("collectStartTime", date.toISOString());
    }, [date]);

    return (
        <div className="flex flex-col gap-3">
            <FormLabel>Thời gian thu thập</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <FormMessage>
                {form.getFieldState("collectStartTime").error?.message}
            </FormMessage>
        </div>
    );
};

export default VoucherCollectionTimeInput;
