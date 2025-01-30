import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

const Logo = ({ className }: Props) => {
    return (
        <div className={cn("text-xl font-bold text-primary", className)}>
            Lemoo
        </div>
    );
};

export default Logo;
