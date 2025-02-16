export type UserContact = {
    id: string;
    avatar: string;
    displayName: string;
};

export type ContactRequest = {
    avatar: string;
    username: string;
    timestamp: string;
    requestId: string;
};
