import { User } from "../../utils/files/types";

export interface APIResponse<T> {
    result: boolean;
    info: any;
    data: T;
}

export interface Track {
    title: string;
    size: number;
    length: number;
    path: string;
    _id: string;
    user_id: string;
    user: User;
}