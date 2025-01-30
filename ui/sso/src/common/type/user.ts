import { Gender } from "../enums/user";

export type User = {
    id: string;
    avatar: string;
    displayName: string;
    dateOfBirth: string;
    address: string;
    gender: Gender;
};
