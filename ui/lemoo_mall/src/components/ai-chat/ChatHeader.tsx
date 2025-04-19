import { Separator } from "../ui/separator";

type Props = {};

const ChatHeader = (props: Props) => {
    return (
        <div>
            <h3 className="font-semibold text-primary text-sm"> Lemoo AI</h3>
            <p className="text-muted-foreground text-xs">
                Nhận trợ giúp tích hợp công nghệ AI
            </p>
            <Separator className="my-3"></Separator>
        </div>
    );
};

export default ChatHeader;
