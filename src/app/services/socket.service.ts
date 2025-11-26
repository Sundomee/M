import { Injectable, OnInit } from "@angular/core";
import { io, Socket } from 'socket.io-client'
import { HOST } from "../utils/files/constants";

@Injectable({ providedIn: 'root' })
export class SocketService {
    private socket: Socket | null = null;

    /** @throws if no socket */
    public get getSocket(): Socket {
        if (!this.socket) {
            throw new Error('no socket')
        }
        return this.socket;
    }
    
    connect() {
        this.socket = io(HOST);
    }

    emit(event: string, data: unknown) {
        this.socket.emit(event, data)
    }

}