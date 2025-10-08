export interface SignupBody {
    email: string;
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    admin: false;
    password: string; // Da rimuovere
}