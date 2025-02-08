import { Link, LinkProps, ReactNode } from "@tanstack/react-router";

type Props = {
    icon: ReactNode;
    children: ReactNode;
} & LinkProps;

const ContactSidebarItem = ({ icon, children, ...props }: Props) => {
    return (
        <Link
            className="flex justify-start items-center gap-5 px-5 py-4 hover:bg-stone-400/10 cursor-pointer transition-all"
            activeOptions={{ exact: true }}
            activeProps={{ className: "!bg-primary/10 " }}
            {...props}
        >
            <span className="[&_svg]:size-[20px]">{icon}</span>
            <span>{children}</span>
        </Link>
    );
};

export default ContactSidebarItem;
