import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { APIResponse, Track, UploadTrackRequestBody } from "../shared/models/track-model";
import { HOST } from "../utils/files/constants";

@Injectable({ providedIn: 'root' })
export class TrackService {

    private host = HOST
    private httpClient = inject(HttpClient)

    private _currentTrack: Track | null = null

    public async getTracks(): Promise<APIResponse<Track[]>> {
        return lastValueFrom(this.httpClient.get<APIResponse<Track[]>>(`${this.host}/tracks`))
    }

    public async getTrackById(track_id: string): Promise<APIResponse<Track>> {
        return lastValueFrom(this.httpClient.get<APIResponse<Track>>(`${this.host}/track/${track_id}`))
    }

    public async uploadTrack(track: FormData) {
        return lastValueFrom(this.httpClient.post(`${this.host}/tracks`, track))
    }

    public set setCurrentTrack(track: Track) {
        this._currentTrack = track;
    }
    
    
    public get currentTrack(): Track | null {
        return this._currentTrack;
    }
}