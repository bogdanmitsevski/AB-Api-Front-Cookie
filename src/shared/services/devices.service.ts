import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { CurrentDeviceResponse, NewDeviceResponse } from "../interfaces/devices";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DevicesService {
    public uuid = '';
    public token = '';


    constructor(private http: HttpClient) {

    }

    addNewDevice(uuid: string): Observable<NewDeviceResponse> {
        return this.http.post<NewDeviceResponse>('api/', null, {
            headers: new HttpHeaders({
                'Device-Token': uuid
            })
        })
            .pipe(
                tap(
                    ({ device: { uuid } }) => {
                        document.cookie = `device-token = ${uuid}; max-age = 10`
                    }
                )
            )
    }

    addOldDevice(token: string): Observable<CurrentDeviceResponse> {
        return this.http.post<CurrentDeviceResponse>('api/', null, {
            headers: new HttpHeaders({
                'Device-Token': token
            })
        })
    }

    checkIfTokenExists() {
        return !!this.getToken();
    }

    getToken() {
        let name_cook = 'device-token' + "=";
        let spl = document.cookie.split(";");
        for (let i = 0; i < spl.length; i++) {
            let c = spl[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(name_cook) == 0) {
                return c.substring(name_cook.length, c.length);
            }
        }
        return null;

    }
}