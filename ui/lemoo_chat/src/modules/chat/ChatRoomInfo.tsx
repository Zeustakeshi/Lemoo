import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type Props = {};

const ChatRoomInfo = (props: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Avatar className="size-[45px] cursor-pointer">
                    <AvatarImage src="https://i.pravatar.cc/150?img=31"></AvatarImage>
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ChatRoomInfo;
