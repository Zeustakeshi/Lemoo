import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import moment from "moment";

type Props = {};

const FriendRequestCard = (props: Props) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 max-w-[400px]  h-[160px]">
            <div className="flex justify-start items-start gap-2">
                <Avatar className="size-[45px]">
                    <AvatarImage src="https://i.pravatar.cc/150?img=31"></AvatarImage>
                </Avatar>
                <div>
                    <h4 className="flex-1 line-clamp-2 font-medium">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea, dicta. Deserunt quos optio doloribus nostrum sunt
                        voluptas fuga exercitationem maxime.
                    </h4>
                    <span className="text-xs text-muted-foreground">
                        {moment(new Date()).toNow()}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center gap-4 mt-5">
                <Button variant="secondary" className="w-full">
                    Từ chối
                </Button>
                <Button className="w-full">Đồng ý</Button>
            </div>
        </div>
    );
};

export default FriendRequestCard;
