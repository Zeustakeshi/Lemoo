import { Gender } from "../enum/user.enum";

export type User = {
    id: string;
    avatar: string;
    displayName: string;
    dateOfBirth: string;
    address: string;
    gender: Gender;
};

export type UserBase = {
    id: string;
    avatar: string;
    name: string;
};
