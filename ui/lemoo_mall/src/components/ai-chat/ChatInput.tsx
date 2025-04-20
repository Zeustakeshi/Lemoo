import { askAi } from "@/api/ai.chat.api";
import { cn } from "@/lib/utils";
import { addChatMessage } from "@/store/chat_ai/chatAiSlice";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Separator } from "../ui/separator";
import TextArea from "../ui/textarea";

type Props = {};

const ChatInput = (props: Props) => {
    const [message, setMessage] = useState<string>("");
    const dispatch = useDispatch();

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (message.trim() !== "") {
                handleSendMessage();
            }
        }
    };

    const handleSendMessage = async () => {
        try {
            dispatch(
                addChatMessage({
                    actor: "user",
                    message,
                })
            );
            setMessage("");

            const data = await askAi(message);
            dispatch(
                addChatMessage({
                    actor: "ai",
                    message: data,
                })
            );
        } catch (error: any) {
            dispatch(
                addChatMessage({
                    actor: "ai",
                    message: "Đã có lỗi xảy ra vui lòng thử lại sau",
                })
            );
        }
    };

    return (
        <div className="bg-white border-t">
            <Separator></Separator>
            <div className="flex  justify-between items-end gap-2 py-3 px-4">
                <TextArea
                    autoFocus
                    placeholder="Nhập tin nhắn của bạn"
                    className="focus-visible:ring-0 focus-visible:outline-none border-none outline-none  flex-1 col-span-11 px-0 h-full text-[16px] max-h-[200px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="col-span-1 flex justify-end items-center">
                    <button
                        onClick={handleSendMessage}
                        className={cn(
                            "[&_svg]:size-[22px] size-[30px] rounded-full flex justify-center items-center",
                            {
                                "bg-primary text-white": !!message.trim(),
                                "bg-slate-200 text-muted-foreground":
                                    !message.trim(),
                            }
                        )}
                    >
                        <ArrowUp />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
