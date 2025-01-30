import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

type Props = {
    size?: "sm" | "md" | "lg";
};

function Logo({ size = "md" }: Props) {
    const navigation = useNavigate();

    return (
        <div
            onClick={() => navigation({ to: "/" })}
            className={cn("font-bold  text-primary cursor-pointer", {
                "text-[18px]": size === "sm",
                "text-[20px]": size === "md",
                "text-[24px]": size === "lg",
            })}
        >
            Lemoo
        </div>
    );
}

export default Logo;
