import Header from "@/components/header/Header";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

const ContactSidebar = ({ className }: Props) => {
    return (
        <div className={cn("", className)}>
            <Header></Header>{" "}
        </div>
    );
};

export default ContactSidebar;
