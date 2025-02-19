import { sendContactRequest } from "@/api/friend.api";
import { UserContact } from "@/common/type/contact.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
    contact: UserContact;
};

const ContactRecommendCard = ({ contact }: Props) => {
    const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
    const {
        mutateAsync: friendRequestMutate,
        isPending: friendRequestPending,
    } = useMutation({
        mutationKey: ["send-friend-request", contact.id],
        mutationFn: async () => await sendContactRequest(contact.id),
    });

    const handleSendContactRequest = async () => {
        if (isRequestSent) return;
        try {
            await friendRequestMutate();
            setIsRequestSent(true);
        } catch (error: any) {
            setIsRequestSent(false);
            toast.error(error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 max-w-[400px]  h-[160px] flex flex-col justify-between">
            <div className="flex justify-start items-start gap-2">
                <Avatar className="size-[45px]">
                    <AvatarImage src={contact.avatar}></AvatarImage>
                </Avatar>
                <div>
                    <h4 className="flex-1 line-clamp-2 font-medium">
                        {contact.displayName}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                        {moment(new Date()).toNow()}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center gap-4 mt-5">
                <Button
                    onClick={handleSendContactRequest}
                    disabled={friendRequestPending || isRequestSent}
                    className="w-full"
                    variant={isRequestSent ? "secondary" : "default"}
                >
                    {friendRequestPending
                        ? "Đang gửi"
                        : isRequestSent
                          ? "Lời mời kết bạn đã được gửi"
                          : "Gửi lời mời kết bạn"}
                </Button>
            </div>
        </div>
    );
};

export default ContactRecommendCard;
