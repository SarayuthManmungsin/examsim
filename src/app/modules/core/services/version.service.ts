import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '@environment';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class VersionService {


    constructor(public http: HttpClient) {
    }

    public version(): Observable<string> {
        return this.http.get(environment.basePath + 'version', {
            responseType: 'text'
        });
    }
}
