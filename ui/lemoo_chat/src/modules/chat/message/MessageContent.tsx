import { useMessage } from "@/context/MessageContext";
import { cn } from "@/lib/utils";
import moment from "moment";

type Props = {};

const MessageContent = ({}: Props) => {
    const { message } = useMessage();
    return (
        <div
            className={cn("bg-white  p-4 rounded-xl border border-primary ", {
                "bg-primary text-white shadow-md": message.isSelf,
            })}
        >
            <p>{message.text}</p>
            <p
                className={cn("mt-2 text-xs text-muted-foreground", {
                    "text-white": message.isSelf,
                })}
            >
                {moment(message.timestamp).format("hh:mm")}
            </p>
        </div>
    );
};

export default MessageContent;
