import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

type Props = {};
const storeId = 1;
const StoreNav = ({}: Props) => {
    return (
        <div className="my-2 flex justify-start gap-1">
            <StoreNavItem to={`/store/${storeId}`}>Tổng quan</StoreNavItem>
            <StoreNavItem to={`/store/${storeId}/products`}>
                Sản phẩm
            </StoreNavItem>
            <StoreNavItem to={`/store/${storeId}/promotions`}>
                Khuyến mãi
            </StoreNavItem>
        </div>
    );
};

type StoreNavItemProps = {
    children: ReactNode;
    to: string;
};

const StoreNavItem = ({ children, to }: StoreNavItemProps) => {
    return (
        <Link
            to={to}
            className={cn(
                "px-4 py-2 bg-opacity-0 hover:text-primary transition-all border-b-2 border-b-transparent hover:border-b-primary"
            )}
            activeOptions={{
                exact: true,
            }}
            activeProps={{
                className: "!border-b-2 !border-b-primary text-primary",
            }}
        >
            <p>{children}</p>
        </Link>
    );
};

export default StoreNav;
