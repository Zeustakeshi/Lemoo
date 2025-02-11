import { UserContact } from "@/common/type/contact.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

type Props = {
    contact: UserContact;
};

const ContactItem = ({ contact }: Props) => {
    return (
        <div
            onClick={() => alert("oke")}
            className="flex justify-start items-center gap-2 cursor-pointer"
        >
            <Avatar>
                <AvatarImage src={contact.avatar}></AvatarImage>
            </Avatar>
            <div className=" flex justify-between items-center flex-1 h-full border-b py-3">
                <p className="max-w-[80%] line-clamp-1">
                    {contact.displayName}
                </p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" className="space-y-1">
                        <DropdownMenuItem>Nhắn tin</DropdownMenuItem>
                        <DropdownMenuItem className="!bg-destructive/20 !text-destructive">
                            Xóa bạn
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default ContactItem;
