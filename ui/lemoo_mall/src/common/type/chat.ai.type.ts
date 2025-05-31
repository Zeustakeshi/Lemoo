import { MessageType } from "../enum/chat.ai.enum";

export type ChatMessageType = {
    type: MessageType;
    content: string;
};
