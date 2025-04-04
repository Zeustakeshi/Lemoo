import { Separator } from "@/components/ui/separator";
import TextArea from "@/components/ui/textarea";
import { useSocket } from "@/context/SocketContext";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { LuClipboardList, LuTicketPercent } from "react-icons/lu";
type Props = {};

const ChatInput = (props: Props) => {
    const [message, setMessage] = useState<string>("");

    const { roomId } = useParams({ strict: false });
    const { client } = useSocket();

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (message.trim() !== "") {
                handleSendMessage();
            }
        }
    };

    const handleSendMessage = () => {
        client?.publish({
            destination: `/chats/${roomId}/messages/send-message`,
            body: JSON.stringify({ message }),
        });

        setMessage("");
    };

    return (
        <div className="bg-white border-t">
            <div className="px-5 py-2 flex justify-start gap-2 items-center">
                <LuTicketPercent></LuTicketPercent>
                <LuClipboardList></LuClipboardList>
            </div>
            <Separator></Separator>
            <div className="flex  justify-between items-end gap-2 py-3 px-4">
                <TextArea
                    autoFocus
                    placeholder="Nhập tin nhắn của bạn"
                    className="focus-visible:ring-0 focus-visible:outline-none border-none outline-none  flex-1 col-span-11 px-0 h-full text-[16px] max-h-[100px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="col-span-1 flex justify-end items-center">
                    <button
                        onClick={handleSendMessage}
                        className="text-primary p-1 [&_svg]:size-[25px]"
                    >
                        <IoSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
