import { cn } from "@/lib/utils";
import { ReactNode } from "@tanstack/react-router";

type Props = {
    children?: ReactNode;
    className?: string;
};

const ContactHeader = ({ children, className }: Props) => {
    return (
        <div
            className={cn(
                "bg-white border-b px-5 py-4 font-semibold text-lg h-[72px] flex justify-start items-center",
                className
            )}
        >
            {children}
        </div>
    );
};

export default ContactHeader;
