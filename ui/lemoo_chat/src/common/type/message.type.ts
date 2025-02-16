import { UserBase } from "./user.type";

export type MessageType = {
    id: string;
    sender?: UserBase;
    isSelf: boolean;
    text: string;
    timestamp: string;
    viewers: string[];
};
