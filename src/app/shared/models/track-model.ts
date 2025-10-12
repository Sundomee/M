import { User } from "../../utils/files/types";

export interface APIResponse<T> {
    result: boolean;
    info: any;
    data: T;
}

export interface Track {
    title: string;
    size: number;
    duration: number;
    path: string;
    imagePath: string;
    _id: string;
    user_id: string;
    user: User;
    imageId: string;
}

export interface UploadTrackRequestBody {
    title: string;
    size: number;
    description?: string;
    track: FormData;
}