import { cn } from "@/lib/utils";
import { ReactNode } from "@tanstack/react-router";

type Props = {
    children?: ReactNode;
    className?: string;
};

const AppWrapper = ({ children, className }: Props) => {
    return <div className={cn("w-full px-4 py-5", className)}>{children}</div>;
};

export default AppWrapper;
