import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, tap } from "rxjs";
import { ExperimentsResponse } from "../interfaces/experiments";

@Injectable({
    providedIn: 'root'
})

export class ExperimentsService {

    constructor(private http: HttpClient) {

    }

    getExperiments(): Observable<ExperimentsResponse> {
        return this.http.get<ExperimentsResponse>('/api/data');
    }

}