import { cn } from "@/lib/utils";
import { PeriodTimeSchemaType } from "@/schema/voucher.schema";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger } from "../ui/popover";

import { addDays, format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { PopoverContent } from "@/components/ui/popover";
import React, { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { FormLabel, FormMessage } from "../ui/form";

type Props = {};

const VoucherTimeInput = (props: Props) => {
    const form = useFormContext<PeriodTimeSchemaType>();
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 30),
    });

    useEffect(() => {
        if (!date || !date.from || !date.to) return;
        form.clearErrors("periodStartTime");
        form.clearErrors("periodEndTime");
        form.setValue("periodStartTime", date.from.toISOString());
        form.setValue("periodEndTime", date.to.toISOString());
    }, [date]);

    return (
        <div className="flex flex-col gap-3">
            <FormLabel>Thời gian quy đổi</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
            <FormMessage>
                <p> {form.getFieldState("periodStartTime").error?.message}</p>
                <p> {form.getFieldState("periodEndTime").error?.message}</p>
            </FormMessage>
        </div>
    );
};

export default VoucherTimeInput;
