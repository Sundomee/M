export interface APIResponse<T> {
    result: boolean;
    info: any;
    data: Array<T>;
}

export interface Track {
    title: string;
    size: number;
    length: number;
    path: string;
    _id: string;
}