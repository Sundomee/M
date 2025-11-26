import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { API_HOST, HOST } from "../utils/files/constants";
import { SignupBody } from "../utils/files/types";

@Injectable({providedIn: 'root'})
export class AuthService {

    public readonly user: any;
    private readonly httpClient = inject(HttpClient);

    login() {
        
    }

    async signup(body: SignupBody) {
        return lastValueFrom(this.httpClient.post(`${API_HOST}signup`, body))
    }
}