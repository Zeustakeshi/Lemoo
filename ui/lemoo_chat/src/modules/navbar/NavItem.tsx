import { Link, LinkOptions } from "@tanstack/react-router";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
} & LinkOptions;

const NavItem = ({ children, ...props }: Props) => {
    return (
        <Link
            className="flex justify-center items-center size-[50px] rounded-md hover:bg-blue-700  [&_svg]:size-8 [&_svg]:shrink-0 [&_svg]:text-white transition-all"
            activeProps={{ className: "!bg-blue-700" }}
            activeOptions={{
                exact: false,
            }}
            {...props}
        >
            {children}
        </Link>
    );
};

export default NavItem;
