import { acceptContactRequest, rejectContactRequest } from "@/api/friend.api";
import { ContactRequest } from "@/common/type/contact.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";

type Props = {
    contactRequest: ContactRequest;
};

const FriendRequestCard = ({ contactRequest }: Props) => {
    const {
        mutateAsync: acceptContactMutate,
        isPending: acceptContactPending,
    } = useMutation({
        mutationKey: ["accept-friend", contactRequest.requestId],
        mutationFn: async () =>
            await acceptContactRequest(contactRequest.requestId),
    });

    const {
        mutateAsync: rejectContactMutate,
        isPending: rejectContactPending,
    } = useMutation({
        mutationKey: ["reject-friend", contactRequest.requestId],
        mutationFn: async () =>
            await rejectContactRequest(contactRequest.requestId),
    });

    const handleAcceptContactRequest = async () => {
        try {
            await acceptContactMutate();
        } catch (error: any) {
            toast.error("Kết bạn thất bại");
        }
    };

    const handleRejectContactRequest = async () => {
        try {
            await rejectContactMutate();
        } catch (error: any) {
            toast.error("Từ chối kết bạn thất bại");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 max-w-[400px]  h-[160px]">
            <div className="flex justify-start items-start gap-2">
                <Avatar className="size-[45px]">
                    <AvatarImage src={contactRequest.avatar}></AvatarImage>
                </Avatar>
                <div>
                    <h4 className="flex-1 line-clamp-2 font-medium">
                        {contactRequest.username}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                        {moment(contactRequest.timestamp).fromNow()}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center gap-4 mt-5">
                <Button
                    disabled={rejectContactPending}
                    onClick={handleRejectContactRequest}
                    variant="secondary"
                    className="w-full"
                >
                    {rejectContactPending ? "Đang xử lý" : "Từ chối"}
                </Button>
                <Button
                    disabled={acceptContactPending}
                    className="w-full"
                    onClick={handleAcceptContactRequest}
                >
                    {acceptContactPending ? "Đang xử lý" : "Đồng ý"}
                </Button>
            </div>
        </div>
    );
};

export default FriendRequestCard;
