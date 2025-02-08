import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

type Props = {};

const ContactItem = (props: Props) => {
    return (
        <div
            onClick={() => alert("oke")}
            className="flex justify-start items-center gap-2 cursor-pointer"
        >
            <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?img=12"></AvatarImage>
            </Avatar>
            <div className=" flex justify-between items-center flex-1 h-full border-b py-3">
                <p className="max-w-[80%] line-clamp-1">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Aspernatur culpa ad accusamus ullam, vero aut? Cupiditate
                    atque voluptatum culpa corporis odio sed animi blanditiis
                    iure magni, quia minus sint voluptate!
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
