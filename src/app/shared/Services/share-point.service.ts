import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Login } from '../dto/login';
import { catchError, map } from 'rxjs/operators';
import { URLs } from './urls';

@Injectable()
export class SharePointService {
    myAppUrl: string = new URLs().APIURL;
    fileUploadUrl: string = new URLs().FILEAPIURL;

    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(public http: HttpClient) {
        this.myAppUrl = new URLs().APIURL;
    }

    upload(file): Observable<any> {
        const formData = new FormData();
        formData.append("file", file, file.name);
        return this.http.post(this.fileUploadUrl, formData)
    }

    errorHandler(error: Response) {
        return throwError(error);
    }
}