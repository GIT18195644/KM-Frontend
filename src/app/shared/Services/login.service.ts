import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Login } from '../dto/login';
import { catchError, map } from 'rxjs/operators';
import { URLs } from './urls';

@Injectable()
export class LoginService {
    myAppUrl: string = new URLs().APIURL;

    public userResponse: any;
    public logout_message: any;
    public userID: any;

    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    
    constructor(public http: HttpClient) {
        this.myAppUrl = new URLs().APIURL;
    }

    userAuthentication(model: Login) {
        this.userID = model.UserID;
        return this.http.post(this.myAppUrl + 'Account/login', model, this.httpOptions)
            .pipe(
                map(res => this.userResponse = res),
                catchError(this.errorHandler)
            );
    }

    logout() {
        return this.http.get(this.myAppUrl + 'Account/logout')
            .pipe(map((result: Response) =>
                this.logout_message = result.json()),
                catchError(this.errorHandler)
            );
    }
    
    errorHandler(error: Response) {
        return throwError(error);
    }
}