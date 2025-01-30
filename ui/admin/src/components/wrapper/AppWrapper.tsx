import { cn } from "@/lib/utils";
import { ReactNode } from "@tanstack/react-router";

type Props = {
    children?: ReactNode;
    className?: string;
};

const AppWrapper = ({ children, className }: Props) => {
    return (
        <div className={cn("max-w-screen-2xl mx-auto px-4 py-2", className)}>
            {children}
        </div>
    );
};

export default AppWrapper;
