import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { APIResponse, Track } from "../shared/models/track-model";
import { HOST } from "../utils/files/constants";

@Injectable({ providedIn: 'root' })
export class TrackService {

    private host = HOST
    private httpClient = inject(HttpClient)

    public async getTracks(): Promise<APIResponse<Track>> {
        return lastValueFrom(this.httpClient.get<APIResponse<Track>>(`${this.host}api/tracks`))
    }

    public async uploadTrack(track: FormData) {
        return lastValueFrom(this.httpClient.post(`${this.host}api/tracks`, track))
    }
}