import React, { ChangeEvent, forwardRef } from "react";
import { cn } from "../../lib/utils";

type Props = {
    label?: string;
    labelProps?: React.ComponentProps<"label">;
    error?: any;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
} & React.ComponentProps<"textarea">;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
    ({ className, onChange, ...props }: Props, ref) => {
        const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
            e.target.style.height = "inherit";
            e.target.style.height = e.target.scrollHeight + "px";
            onChange?.(e);
        };

        return (
            <textarea
                name=""
                id=""
                ref={ref}
                className={cn(
                    " custom-scroll  resize-none w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                onChange={handleChangeText}
                rows={1}
                {...props}
            ></textarea>
        );
    }
);

export default TextArea;
